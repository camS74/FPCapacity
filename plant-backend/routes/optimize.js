const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, '..', 'db', 'plant.db'));

// Optimize production schedule
router.post('/', async (req, res) => {
  const { machineIds } = req.body;

  try {
    // Get machines data
    const machines = await new Promise((resolve, reject) => {
      const placeholders = machineIds.map(() => '?').join(',');
      db.all(`SELECT * FROM machines WHERE id IN (${placeholders})`, machineIds, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });

    // Get processes for these machines
    const processes = await new Promise((resolve, reject) => {
      const placeholders = machineIds.map(() => '?').join(',');
      db.all(`SELECT * FROM processes WHERE machineId IN (${placeholders})`, machineIds, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });

    // Get products for these processes
    const productIds = [...new Set(processes.map(p => p.productId))];
    const products = await new Promise((resolve, reject) => {
      const placeholders = productIds.map(() => '?').join(',');
      db.all(`SELECT * FROM products WHERE id IN (${placeholders})`, productIds, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });

    // Calculate optimization results
    const totalProduction = calculateTotalProduction(processes, products);
    const averageUtilization = calculateAverageUtilization(machines, processes);
    const estimatedTime = calculateEstimatedTime(processes);
    const timeline = generateTimeline(processes, machines);

    res.json({
      totalProduction,
      averageUtilization,
      estimatedTime,
      timeline,
    });
  } catch (error) {
    console.error('Optimization error:', error);
    res.status(500).json({ error: 'Failed to optimize production schedule' });
  }
});

function calculateTotalProduction(processes, products) {
  return processes.reduce((total, process) => {
    const product = products.find(p => p.id === process.productId);
    return total + (product ? 1 : 0);
  }, 0);
}

function calculateAverageUtilization(machines, processes) {
  const machineUtilizations = machines.map(machine => {
    const machineProcesses = processes.filter(p => p.machineId === machine.id);
    const totalDuration = machineProcesses.reduce((sum, p) => sum + p.duration, 0);
    return (totalDuration / (24 * 60)) * 100; // Assuming 24-hour day
  });

  return machineUtilizations.reduce((sum, util) => sum + util, 0) / machines.length;
}

function calculateEstimatedTime(processes) {
  const totalDuration = processes.reduce((sum, p) => sum + p.duration, 0);
  return Math.ceil(totalDuration / 60); // Convert minutes to hours
}

function generateTimeline(processes, machines) {
  const timeline = [];
  let currentTime = 0;
  const machineSchedules = {};

  // Initialize machine schedules
  machines.forEach(machine => {
    machineSchedules[machine.id] = [];
  });

  // Sort processes by duration (shortest first)
  const sortedProcesses = [...processes].sort((a, b) => a.duration - b.duration);

  // Schedule processes
  sortedProcesses.forEach(process => {
    const machineSchedule = machineSchedules[process.machineId];
    const startTime = machineSchedule.length > 0
      ? machineSchedule[machineSchedule.length - 1].endTime
      : 0;

    machineSchedule.push({
      processId: process.id,
      startTime,
      endTime: startTime + process.duration,
    });

    currentTime = Math.max(currentTime, startTime + process.duration);
  });

  // Generate timeline data points
  for (let time = 0; time <= currentTime; time += 60) { // 1-hour intervals
    const production = processes.filter(p => {
      const schedule = machineSchedules[p.machineId].find(s => s.processId === p.id);
      return schedule && time >= schedule.startTime && time < schedule.endTime;
    }).length;

    const utilization = (production / machines.length) * 100;

    timeline.push({
      time: Math.floor(time / 60), // Convert to hours
      production,
      utilization,
    });
  }

  return timeline;
}

module.exports = router;