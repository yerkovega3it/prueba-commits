function useDashboardData() {
  const peopleOnSite = 985;
  const maxCapacity = 1200;
  const occupancyPercentage = Math.round((peopleOnSite / maxCapacity) * 100);
  const entryPerHour = 55;
  const exitPerHour = 12;

  // ISP data
  const ispPercentage = 84.9;
  const ispGoal = 95;

  return {
    peopleOnSite,
    maxCapacity,
    occupancyPercentage,
    entryPerHour,
    exitPerHour,
    ispPercentage,
    ispGoal,
  };
}

export default useDashboardData;
