import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Paper,
  Typography,
  Grid,
  CircularProgress,
} from '@mui/material';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Optimization = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const handleOptimize = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/optimize', {
        method: 'POST',
      });
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error optimizing production:', error);
    } finally {
      setLoading(false);
    }
  };

  const chartData = results
    ? {
        labels: results.machineUtilization.map((m) => m.name),
        datasets: [
          {
            label: 'Machine Utilization (%)',
            data: results.machineUtilization.map((m) => m.utilization),
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
        ],
      }
    : null;

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Optimized Machine Utilization',
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h4">Production Optimization</Typography>
        <Button
          variant="contained"
          onClick={handleOptimize}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Optimize Production'}
        </Button>
      </Box>

      {results && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h6">Total Production</Typography>
              <Typography variant="h3">
                {results.totalProduction.toLocaleString()} units
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h6">Average Utilization</Typography>
              <Typography variant="h3">
                {results.averageUtilization.toFixed(1)}%
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h6">Total Profit</Typography>
              <Typography variant="h3">
                ${results.totalProfit.toLocaleString()}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Bar data={chartData} options={chartOptions} />
            </Paper>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Optimization; 