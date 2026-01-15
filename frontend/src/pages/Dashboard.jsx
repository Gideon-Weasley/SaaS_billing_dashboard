import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getUsageSummary } from "../api/api";

export default function Dashboard() {
  const { user } = useAuth();
  const [usage, setUsage] = useState(null);

  useEffect(() => {
    if (user) {
      getUsageSummary(user.user_id).then(setUsage);
    }
  }, [user]);

  return (
    <div>
      <h2>Dashboard</h2>
      {usage && <p>Total usage: {usage.total_units}</p>}
    </div>
  );
}
