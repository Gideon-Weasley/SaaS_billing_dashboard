function UsageCard({ usage }) {
  return (
    <div className="card">
      <p>Total Units Used: {usage.total_units}</p>
      <p>Usage Percentage: {usage.usage_percent}%</p>
    </div>
  );
}

export default UsageCard;
