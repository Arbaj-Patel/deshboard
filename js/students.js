// Students Section Charts
document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Load JSON data
    const response = await fetch("../data.json")
    const data = await response.json()

    // Update student cards
    updateStudentCards(data.students)

    // Initialize Student Charts
    initStudentsBarChart(data.students.region || [500, 300, 400, 200])
    initStudentsLineChart(data.students.engagement || [65, 59, 80, 81, 56, 55])
  } catch (error) {
    console.error("Error loading data:", error)
  }
})

function updateStudentCards(studentsData) {
  if (!studentsData) return

  const totalCard = document.querySelector(".main-cards .card:nth-child(1) h1")
  const activeCard = document.querySelector(".main-cards .card:nth-child(2) h1")
  const newCard = document.querySelector(".main-cards .card:nth-child(3) h1")
  const engagementCard = document.querySelector(".main-cards .card:nth-child(4) h1")

  if (totalCard) totalCard.textContent = studentsData.totalStudents.toLocaleString()
  if (activeCard) activeCard.textContent = studentsData.activeStudents.toLocaleString()
  if (newCard) newCard.textContent = studentsData.newStudents
  if (engagementCard) engagementCard.textContent = studentsData.studentEngagement + "%"
}

function initStudentsBarChart(regionData) {
  const chartElement = document.getElementById("students-bar-chart")
  if (!chartElement) return

  // Check if chart instance already exists and destroy it
  if (window.studentsBarChart) {
    window.studentsBarChart.destroy()
  }

  window.studentsBarChart = new Chart(chartElement, {
    type: "bar",
    data: {
      labels: ["North", "South", "East", "West"],
      datasets: [
        {
          label: "Students by Region",
          data: regionData,
          backgroundColor: [
            "rgba(54, 162, 235, 0.7)",
            "rgba(255, 206, 86, 0.7)",
            "rgba(75, 192, 192, 0.7)",
            "rgba(153, 102, 255, 0.7)",
          ],
          borderColor: [
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
          ],
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
          display: false,
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

function initStudentsLineChart(engagementData) {
  const chartElement = document.getElementById("students-line-chart")
  if (!chartElement) return

  // Check if chart instance already exists and destroy it
  if (window.studentsLineChart) {
    window.studentsLineChart.destroy()
  }

  window.studentsLineChart = new Chart(chartElement, {
    type: "line",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "Student Engagement",
          data: engagementData,
          borderColor: "#ff6384",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          fill: true,
          tension: 0.4,
          pointBackgroundColor: "#ff6384",
          pointRadius: 5,
          pointHoverRadius: 7,
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
          max: 100,
          ticks: {
            color: "rgba(255, 255, 255, 0.7)",
            callback: (value) => value + "%",
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

