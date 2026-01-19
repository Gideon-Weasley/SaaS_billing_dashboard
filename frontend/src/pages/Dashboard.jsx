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
  const [loading, setLoading] = useState(true);

  // initial load
  useEffect(() => {
    setLoading(true);
    Promise.all([
      getMonthlyUsage(user.user_id).then((data) => {
        console.log("MONTHLY DATA:", data);
        setMonthlyData(data);
      }),
      getUsageSummary(user.user_id).then((data) => {
        console.log("USAGE SUMMARY:", data);
        setTotalUsed(data.total_used);
        setPlanLimit(data.plan_limit);
      }),
    ]).finally(() => setLoading(false));
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
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "700", margin: "0 0 8px 0" }}>
          Dashboard
        </h1>
        <p style={{ color: "var(--text-light)", margin: 0 }}>
          Welcome back, {user?.email}
        </p>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "40px", color: "var(--text-light)" }}>
          Loading your usage data...
        </div>
      ) : (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "20px",
              marginBottom: "40px",
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

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr",
              gap: "24px",
              alignItems: "start",
            }}
          >
            <div style={{ background: "white", padding: "24px", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", border: "1px solid #e2e8f0" }}>
              <MonthlyUsageChart data={monthlyData} />
            </div>

            <div style={{ background: "white", padding: "24px", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", border: "1px solid #e2e8f0" }}>
              <UsageProgress used={totalUsed} limit={planLimit} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
