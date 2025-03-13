// Analytics Section Charts
const analyticsLineChartCtx = document
  .getElementById("analytics-line-chart")
  .getContext("2d");
new Chart(analyticsLineChartCtx, {
  type: "line",
  data: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Monthly Traffic",
        data: [1000, 1200, 1300, 1400, 1500, 1600],
        borderColor: "#36a2eb",
        fill: false,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
  },
});

const analyticsPieChartCtx = document
  .getElementById("analytics-pie-chart")
  .getContext("2d");
new Chart(analyticsPieChartCtx, {
  type: "pie",
  data: {
    labels: ["18-24", "25-34", "35-44", "45+"],
    datasets: [
      {
        label: "User Demographics",
        data: [40, 35, 15, 10],
        backgroundColor: ["#ff6384", "#36a2eb", "#ffcd56", "#4bc0c0"],
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
  },
});