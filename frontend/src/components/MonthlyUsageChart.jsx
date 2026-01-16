import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

export default function MonthlyUsageChart({ data }) {
  if (!Array.isArray(data) || data.length === 0) return null;

  return (
    <div style={{ maxWidth: "900px" }}>
      <Bar
        data={{
          labels: data.map(d => d.label),
          datasets: [
            {
              label: "Units Used",
              data: data.map(d => Number(d.units)),
              backgroundColor: "#2563eb",
              borderRadius: 6,
              barThickness: 40,      // 👈 fixes huge bars
              maxBarThickness: 50
            }
          ]
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              callbacks: {
                label: (ctx) => `${ctx.raw} units`
              }
            }
          },
          scales: {
            x: {
              grid: {
                display: false
              }
            },
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1
              }
            }
          }
        }}
        height={300}   // 👈 prevents vertical stretching
      />
    </div>
  );
}
