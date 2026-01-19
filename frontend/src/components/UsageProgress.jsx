import "./UsageProgress.css";

export default function UsageProgress({ used, limit }) {
  const percent = Math.round((used / limit) * 100);
  const color = percent <= 50 ? "#22c55e" : percent <= 80 ? "#f59e0b" : "#ef4444";

  return (
    <div className="usage-progress">
      <div className="usage-header">
        <h3>Usage Progress</h3>
        <span className="usage-badge" style={{ backgroundColor: color + "20", color }}>{percent}%</span>
      </div>
      
      <div className="progress-stats">
        <div className="stat">
          <span className="stat-label">Used</span>
          <span className="stat-value">{used}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Limit</span>
          <span className="stat-value">{limit}</span>
        </div>
      </div>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ 
            width: `${percent}%`,
            background: color
          }}
        />
      </div>

      <div className="progress-info">
        <p className="info-text">
          {percent <= 50 && "✓ You're within your usage limit"}
          {percent > 50 && percent <= 80 && "⚠ You're approaching your limit"}
          {percent > 80 && "🔴 You're close to your limit"}
        </p>
      </div>
    </div>
  );
}
