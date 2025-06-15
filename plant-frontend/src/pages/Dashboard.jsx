import { useState, useEffect } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Box,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip as ChartTooltip,
  Legend as ChartLegend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ChartTooltip,
  ChartLegend
);

function Dashboard() {
  const [stats, setStats] = useState({
    totalMachines: 0,
    totalProducts: 0,
    totalProcesses: 0,
    machineUtilization: [],
  });

  const [machineData, setMachineData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [machinesRes, productsRes, processesRes] = await Promise.all([
          axios.get('http://localhost:3000/api/machines'),
          axios.get('http://localhost:3000/api/products'),
          axios.get('http://localhost:3000/api/processes'),
        ]);

        setStats({
          totalMachines: machinesRes.data.length,
          totalProducts: productsRes.data.length,
          totalProcesses: processesRes.data.length,
          machineUtilization: machinesRes.data.map(m => ({
            name: m.name,
            utilization: Math.random() * 100, // Replace with actual utilization data
          })),
        });

        setMachineData(machinesRes.data.map(machine => ({
          name: machine.name,
          utilization: machine.utilization || 0,
          efficiency: machine.efficiency || 0,
        })));
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();
  }, []);

  const calculateUtilization = (machines) => {
    if (!machines.length) return 0;
    const totalUtilization = machines.reduce((sum, machine) => sum + (machine.utilization || 0), 0);
    return (totalUtilization / machines.length).toFixed(1);
  };

  const StatCard = ({ title, value, unit = '' }) => (
    <Card>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h4" component="div">
          {value}{unit}
        </Typography>
      </CardContent>
    </Card>
  );

  const chartData = {
    labels: stats.machineUtilization.map(m => m.name),
    datasets: [
      {
        label: 'Machine Utilization (%)',
        data: stats.machineUtilization.map(m => m.utilization),
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Machine Utilization',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Total Machines" value={stats.totalMachines} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Total Products" value={stats.totalProducts} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Total Processes" value={stats.totalProcesses} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">Average Utilization</Typography>
            <Typography variant="h3">{calculateUtilization(machineData)}%</Typography>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Bar data={chartData} options={chartOptions} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard; 