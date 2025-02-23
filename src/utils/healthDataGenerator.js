export const generateHealthData = () => {
  return {
    heartRate: Math.floor(Math.random() * (100 - 60) + 60),
    bloodPressureSystolic: Math.floor(Math.random() * (140 - 110) + 110),
    bloodPressureDiastolic: Math.floor(Math.random() * (90 - 70) + 70),
    temperature: Number((Math.random() * (99.5 - 97.5) + 97.5).toFixed(1)),
    glucoseLevel: Math.floor(Math.random() * (140 - 80) + 80),
    oxygenLevel: Math.floor(Math.random() * (100 - 95) + 95)
  };
};

export const generateTimeSeriesData = () => {
  const times = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'];
  return times.map(time => ({
    time,
    heartRate: Math.floor(Math.random() * (100 - 60) + 60),
    bloodPressure: Math.floor(Math.random() * (140 - 110) + 110),
    glucose: Math.floor(Math.random() * (140 - 80) + 80)
  }));
};