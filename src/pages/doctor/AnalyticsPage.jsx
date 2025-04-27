import { useState, useEffect } from "react";
import { generateTimeSeriesData } from "../../utils/healthDataGenerator";
import StatsCards from "../../components/analytics/StatsCards";
import VitalSignsTrends from "../../components/analytics/VitalSignsTrends";
import PatientStatusDistribution from "../../components/analytics/PatientStatusDistribution";
import MonthlyAdmissions from "../../components/analytics/MonthlyAdmissions";

const AnalyticsPage = () => {
  const [timeRange, setTimeRange] = useState("week");
  const [vitalTrends, setVitalTrends] = useState(generateTimeSeriesData());

  useEffect(() => {
    // Simulate data updates
    const interval = setInterval(() => {
      setVitalTrends(generateTimeSeriesData());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="border rounded-lg px-4 py-2"
        >
          <option value="day">Last 24 Hours</option>
          <option value="week">Last Week</option>
          <option value="month">Last Month</option>
        </select>
      </div>

      <StatsCards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <VitalSignsTrends data={vitalTrends} />
        <PatientStatusDistribution />
        <MonthlyAdmissions />
      </div>
    </div>
  );
};

export default AnalyticsPage;
