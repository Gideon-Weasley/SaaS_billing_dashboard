import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Filler
} from "chart.js";
import "./MonthlyUsageChart.css";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Filler
);

export default function MonthlyUsageChart({ data }) {
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "40px", color: "var(--text-light)" }}>
        No data available
      </div>
    );
  }

  const maxValue = Math.max(...data.map(d => Number(d.units))) * 1.2;

  return (
    <div className="chart-container">
      <h3 style={{ margin: "0 0 20px 0", color: "var(--text-dark)" }}>
        📊 Monthly Usage
      </h3>
      <Bar
        data={{
          labels: data.map(d => d.label),
          datasets: [
            {
              label: "Units Used",
              data: data.map(d => Number(d.units)),
              backgroundColor: "rgba(37, 99, 235, 0.8)",
              borderColor: "#2563eb",
              borderRadius: 8,
              barThickness: 40,
              maxBarThickness: 50,
              borderSkipped: false,
              hoverBackgroundColor: "rgba(37, 99, 235, 1)",
            }
          ]
        }}
        options={{
          responsive: true,
          maintainAspectRatio: true,
          indexAxis: 'x',
          plugins: {
            legend: {
              display: true,
              position: 'top',
              labels: {
                boxWidth: 12,
                padding: 15,
                font: {
                  size: 12,
                  weight: 500
                },
                color: 'var(--text-light)'
              }
            },
            tooltip: {
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              titleColor: '#fff',
              bodyColor: '#fff',
              padding: 12,
              titleFont: { size: 13, weight: 'bold' },
              bodyFont: { size: 12 },
              borderColor: 'rgba(255, 255, 255, 0.2)',
              borderWidth: 1,
              displayColors: false,
              callbacks: {
                label: (ctx) => `${ctx.raw} units`
              }
            }
          },
          scales: {
            x: {
              grid: {
                display: false,
                drawBorder: false
              },
              ticks: {
                color: 'var(--text-light)',
                font: {
                  size: 11
                }
              }
            },
            y: {
              beginAtZero: true,
              max: maxValue,
              grid: {
                color: 'rgba(0, 0, 0, 0.05)',
                drawBorder: false
              },
              ticks: {
                color: 'var(--text-light)',
                font: {
                  size: 11
                },
                stepSize: Math.ceil(maxValue / 5)
              }
            }
          }
        }}
        height={300}
      />
    </div>
  );
}
