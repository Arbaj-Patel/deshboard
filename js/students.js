// Students Section Charts
const studentsBarChartCtx = document
  .getElementById("students-bar-chart")
  .getContext("2d");
new Chart(studentsBarChartCtx, {
  type: "bar",
  data: {
    labels: ["North", "South", "East", "West"],
    datasets: [
      {
        label: "Students by Region",
        data: [500, 300, 400, 200],
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
  },
});

const studentsLineChartCtx = document
  .getElementById("students-line-chart")
  .getContext("2d");
new Chart(studentsLineChartCtx, {
  type: "line",
  data: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Student Engagement",
        data: [65, 59, 80, 81, 56, 55],
        borderColor: "#ff6384",
        fill: false,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
  },
});
