import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getMonthlyUsage, getUsageSummary } from "../api/api";
import MonthlyUsageChart from "../components/MonthlyUsageChart";
import UsageProgress from "../components/UsageProgress";
import KpiCard from "../components/KpiCard";
import useUsageSocket from "../hooks/useUsageSocket";

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) {
  return null;
}

  const [monthlyData, setMonthlyData] = useState([]);
  const [totalUsed, setTotalUsed] = useState(0);
  const [planLimit, setPlanLimit] = useState(0);

  // initial load
useEffect(() => {
  getMonthlyUsage(user.user_id).then((data) => {
    console.log("MONTHLY DATA:", data);
    setMonthlyData(data);
  });

  getUsageSummary(user.user_id).then((data) => {
    console.log("USAGE SUMMARY:", data);
    setTotalUsed(data.total_used);
    setPlanLimit(data.plan_limit);
  });
}, [user]);


  // live updates via websocket
  useUsageSocket((data) => {
  if (!user) return;

  if (data.user_id === user.user_id) {
    setTotalUsed(data.total_used);
  }
});

  const usedPercent =
    planLimit > 0
      ? Math.round((totalUsed / planLimit) * 100)
      : 0;

  return (
    <div style={{ padding: "24px" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "20px",
        }}
      >
        <KpiCard title="Total Usage" value={totalUsed} color="#2563eb" />
        <KpiCard title="Used %" value={`${usedPercent}%`} color="#22c55e" />
        <KpiCard
          title="Remaining"
          value={planLimit - totalUsed}
          color="#f59e0b"
        />
        <KpiCard title="Plan Limit" value={planLimit} color="#ef4444" />
      </div>

      <div style={{ marginTop: "40px" }}>
        <MonthlyUsageChart data={monthlyData} />
      </div>

      <div style={{ marginTop: "20px", width: "400px" }}>
        <UsageProgress used={totalUsed} limit={planLimit} />
      </div>
    </div>
  );
}
