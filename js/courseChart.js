// Courses Section Charts
document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Load JSON data
    const response = await fetch("../data.json")
    const data = await response.json()

    // Update course cards
    updateCourseCards(data.courses)

    // Initialize Course Charts
    initCoursesBarChart(data.courses.enrollment || [1200, 900, 800, 600, 300, 200])
    initCoursesPieChart(data.courses.completion || [60, 30, 10])
  } catch (error) {
    console.error("Error loading data:", error)
  }
})

function updateCourseCards(coursesData) {
  if (!coursesData) return

  const totalCard = document.querySelector(".main-cards .card:nth-child(1) h1")
  const activeCard = document.querySelector(".main-cards .card:nth-child(2) h1")
  const upcomingCard = document.querySelector(".main-cards .card:nth-child(3) h1")

  if (totalCard) totalCard.textContent = coursesData.totalCourses
  if (activeCard) activeCard.textContent = coursesData.activeCourses
  if (upcomingCard) upcomingCard.textContent = coursesData.upcomingCourses
}

function initCoursesBarChart(enrollmentData) {
  const chartElement = document.getElementById("courses-bar-chart")
  if (!chartElement) return

  // Check if chart instance already exists and destroy it
  if (window.coursesBarChart) {
    window.coursesBarChart.destroy()
  }

  window.coursesBarChart = new Chart(chartElement, {
    type: "bar",
    data: {
      labels: ["Python", "JavaScript", "Java", "C++", "Golang", "SQL"],
      datasets: [
        {
          label: "Students Enrolled",
          data: enrollmentData,
          backgroundColor: "rgba(255, 99, 132, 0.7)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
          borderRadius: 5,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: "#fff",
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: "rgba(255, 255, 255, 0.7)",
          },
          grid: {
            color: "rgba(255, 255, 255, 0.1)",
          },
        },
        x: {
          ticks: {
            color: "rgba(255, 255, 255, 0.7)",
          },
          grid: {
            color: "rgba(255, 255, 255, 0.1)",
          },
        },
      },
    },
  })
}

function initCoursesPieChart(completionData) {
  const chartElement = document.getElementById("courses-pie-chart")
  if (!chartElement) return

  // Check if chart instance already exists and destroy it
  if (window.coursesPieChart) {
    window.coursesPieChart.destroy()
  }

  window.coursesPieChart = new Chart(chartElement, {
    type: "pie",
    data: {
      labels: ["Completed", "In Progress", "Not Started"],
      datasets: [
        {
          label: "Course Completion Rate",
          data: completionData,
          backgroundColor: ["#4bc0c0", "#36a2eb", "#ff6384"],
          borderWidth: 1,
          borderColor: "#263043",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 2000,
        easing: "easeOutBounce",
      },
      plugins: {
        legend: {
          position: "right",
          labels: {
            color: "#fff",
            padding: 15,
          },
        },
      },
    },
  })
}

