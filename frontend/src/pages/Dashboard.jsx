import { useEffect, useState } from "react";
import { getUsageSummary } from "../api/api";
import UsageCard from "../components/UsageCard";

function Dashboard() {
  const [usage, setUsage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getUsageSummary()
      .then(setUsage)
      .catch((err) => {
        console.error("Failed to load usage:", err);
        setError(err.message);
      });
  }, []);

  return (
    <div className="page">
      <h2>Usage Dashboard</h2>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {usage ? <UsageCard usage={usage} /> : <p>Loading...</p>}
    </div>
  );
}

export default Dashboard;
