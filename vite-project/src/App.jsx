

import React from 'react';
import './App.css';
import BotStatisticsChart from './components/BotStatisticsChart'; // Make sure this path is correct

function App() {
  const chartData = {
    labels: Array.from({ length: 40 }, (_, i) => `03:${20 + i}`), // Labels from 03:30 to 03:59
    datasets: [
      {
        label: 'Human',
        // Data fluctuates between 50 and 100
        data: Array.from({ length: 30 }, (_, i) => Math.random() * 80 + 80),
        borderColor: 'blue',
        backgroundColor: 'rgba(0, 0, 255, 0.1)',
        fill: true,
        borderWidth: 4,
        tension: 0.8,
      },
      {
        label: 'Good Bot',
        // Data is above 0 with small fluctuations
        data: Array.from({ length: 30 }, () => Math.random() * 20 + 10),
        borderColor: 'green',
        backgroundColor: 'rgba(0, 255, 0, 0.1)',
        fill: true,
        borderWidth: 4,
        tension: 0.3, // Slightly less smooth than the human line
      },
      {
        label: 'Bad Bot',
        // Data is mainly at 0 with occasional small increases
        data: Array.from({ length: 30 }, () => Math.random() > 0.9 ? Math.random() * 20 : 0),
        borderColor: 'orange',
        backgroundColor: 'rgba(255, 165, 0, 0.1)',
        fill: true,
        borderWidth: 4,
        tension: 0.8, // Nearly straight lines with slight curves when there is activity
      },
      // The 'Uncategorized' dataset can remain as it was if it's still relevant
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: 100,
        ticks: {
          callback: function(value) {
            return value + '%'; // Add percentage sign
          },
          stepSize: 50,
          max: 100,
        },
      },
      x: {
        stacked: true,
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';

            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y + '%';
            }
            return label;
          }
        }
      },
      legend: {
        display: true,
        position: 'bottom',
      },
    },
    maintainAspectRatio: false,
    elements: {
      line: {
        borderWidth: 3,
      },
      point: {
        radius: 3,
      },
    },
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Bot Activity Statistics</h1>
      </header>
      <div className="chart-container">
        <BotStatisticsChart data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}

export default App;
