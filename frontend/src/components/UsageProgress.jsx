import "./UsageProgress.css";

export default function UsageProgress({ used, limit }) {
  const percent = Math.round((used / limit) * 100);

  return (
    <div>
      <p>Usage: {percent}%</p>
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
