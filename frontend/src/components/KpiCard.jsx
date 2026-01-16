import "./KpiCard.css";

export default function KpiCard({ title, value, color }) {
  return (
    <div className="kpi-card">
      <p>{title}</p>
      <h2 style={{ color }}>{value}</h2>
    </div>
  );
}
