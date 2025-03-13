// Courses Section Charts
const coursesBarChartCtx = document
  .getElementById("courses-bar-chart")
  .getContext("2d");
new Chart(coursesBarChartCtx, {
  type: "bar",
  data: {
    labels: ["Python", "JavaScript", "Java", "C++", "Golang", "SQL"],
    datasets: [
      {
        label: "Students Enrolled",
        data: [1200, 900, 800, 600, 300, 200],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
  },
});

const coursesPieChartCtx = document
  .getElementById("courses-pie-chart")
  .getContext("2d");
new Chart(coursesPieChartCtx, {
  type: "pie",
  data: {
    labels: ["Completed", "In Progress", "Not Started"],
    datasets: [
      {
        label: "Course Completion Rate",
        data: [60, 30, 10],
        backgroundColor: ["#4bc0c0", "#36a2eb", "#ff6384"],
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 2000,
      easing: "linear",
    }
  },
});