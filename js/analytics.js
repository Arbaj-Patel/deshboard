// Analytics Section Charts
document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Load JSON data
    const response = await fetch("../data.json")
    const data = await response.json()

    // Update analytics cards
    updateAnalyticsCards(data.analytics)

    // Initialize Analytics Charts
    initAnalyticsLineChart(data.analytics.traffic || [1000, 1200, 1300, 1400, 1500, 1600])
    initAnalyticsPieChart(data.analytics.demographics || [40, 35, 15, 10])
  } catch (error) {
    console.error("Error loading data:", error)
  }
})

function updateAnalyticsCards(analyticsData) {
  if (!analyticsData) return

  const trafficCard = document.querySelector(".main-cards .card:nth-child(1) h1")
  const usersCard = document.querySelector(".main-cards .card:nth-child(2) h1")
  const bounceCard = document.querySelector(".main-cards .card:nth-child(3) h1")
  const durationCard = document.querySelector(".main-cards .card:nth-child(4) h1")

  if (trafficCard) trafficCard.textContent = analyticsData.monthlyTraffic.toLocaleString()
  if (usersCard) usersCard.textContent = analyticsData.activeUsers.toLocaleString()
  if (bounceCard) bounceCard.textContent = analyticsData.bounceRate + "%"

  // Format session duration as minutes and seconds
  const minutes = Math.floor(analyticsData.sessionDuration / 60)
  const seconds = analyticsData.sessionDuration % 60
  if (durationCard) durationCard.textContent = `${minutes}m ${seconds}s`
}

function initAnalyticsLineChart(trafficData) {
  const chartElement = document.getElementById("analytics-line-chart")
  if (!chartElement) return

  // Check if chart instance already exists and destroy it
  if (window.analyticsLineChart) {
    window.analyticsLineChart.destroy()
  }

  window.analyticsLineChart = new Chart(chartElement, {
    type: "line",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "Monthly Traffic",
          data: trafficData,
          borderColor: "#36a2eb",
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          fill: true,
          tension: 0.4,
          pointBackgroundColor: "#36a2eb",
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

function initAnalyticsPieChart(demographicsData) {
  const chartElement = document.getElementById("analytics-pie-chart")
  if (!chartElement) return

  // Check if chart instance already exists and destroy it
  if (window.analyticsPieChart) {
    window.analyticsPieChart.destroy()
  }

  window.analyticsPieChart = new Chart(chartElement, {
    type: "pie",
    data: {
      labels: ["18-24", "25-34", "35-44", "45+"],
      datasets: [
        {
          label: "User Demographics",
          data: demographicsData,
          backgroundColor: ["#ff6384", "#36a2eb", "#ffcd56", "#4bc0c0"],
          borderWidth: 1,
          borderColor: "#263043",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
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

