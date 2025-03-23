import { Activity, TrendingUp, Users, Clock } from "lucide-react";

const StatsCards = () => {
  const statsCards = [
    {
      title: "Total Patients",
      value: "248",
      change: "+12%",
      icon: Users,
      color: "blue",
    },
    {
      title: "Avg. Heart Rate",
      value: "82 BPM",
      change: "-3%",
      icon: Activity,
      color: "red",
    },
    {
      title: "Recovery Rate",
      value: "85%",
      change: "+5%",
      icon: TrendingUp,
      color: "green",
    },
    {
      title: "Avg. Stay Duration",
      value: "4.2 days",
      change: "-8%",
      icon: Clock,
      color: "purple",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsCards.map((stat, index) => (
        <div key={index} className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-4">
            <div className={`p-3 bg-${stat.color}-100 rounded-lg`}>
              <stat.icon className={`text-${stat.color}-600`} size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.title}</p>
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-bold text-gray-900">
                  {stat.value}
                </h3>
                <span
                  className={`text-sm ${
                    stat.change.startsWith("+")
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {stat.change}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
