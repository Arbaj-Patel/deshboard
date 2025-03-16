document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Load JSON data
    const response = await fetch("../data.json")
    const data = await response.json()
    const dashboard = data.dashboard

    // Initialize Charts
    initBarChart(dashboard)
    initPieChart(dashboard)
    initViewershipChart(dashboard)
    initEngagementChart(dashboard)
    initCompletionGauge(dashboard)
    initRevenueChart(dashboard)
    initSourcesChart(dashboard)
    initRatings(dashboard)

    // Update main cards
    updateMainCards(dashboard.cards)
    

    // Sidebar Toggle
    window.openSidebar = () => document.getElementById("sidebar").classList.add("sidebar-responsive")
    window.closeSidebar = () => document.getElementById("sidebar").classList.remove("sidebar-responsive")
  } catch (error) {
    console.error("Error loading data:", error)
  }
})

// Update main cards with data
function updateMainCards(cardsData) {
  // Format numbers for display
  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M"
    } else if (num >= 1000) {
      return (num / 1000).toFixed(0) + "k"
    }
    return num
  }

  // Update dashboard cards if on dashboard page
  if (
    window.location.pathname.includes("index.html") ||
    window.location.pathname === "/" ||
    window.location.pathname.endsWith("/")
  ) {
    const coursesCard = document.querySelector(".main-cards .card:nth-child(1) h1")
    const viewersCard = document.querySelector(".main-cards .card:nth-child(2) h1")
    const studentsCard = document.querySelector(".main-cards .card:nth-child(3) h1")
    const revenueCard = document.querySelector(".main-cards .card:nth-child(4) h1")

    if (coursesCard) coursesCard.textContent = cardsData.courses + "+"
    if (viewersCard) viewersCard.textContent = formatNumber(cardsData.viewers)
    if (studentsCard) studentsCard.textContent = formatNumber(cardsData.students)
    if (revenueCard) revenueCard.textContent = "₹" + formatNumber(cardsData.revenue)
  }
}

// Chart Initialization Functions
function initBarChart(dashboard) {
  const chartElement = document.getElementById("bar-chart")
  if (!chartElement) return

  // Check if chart instance already exists and destroy it
  if (window.barChart) {
    window.barChart.destroy()
  }

  window.barChart = new Chart(chartElement, {
    type: "bar",
    data: {
      labels: dashboard.courses.labels,
      datasets: [
        {
          label: "Students Enrolled",
          data: dashboard.courses.enrollments,
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"],
        },
      ],
    },
    options: { responsive: true, maintainAspectRatio: false },
  })
}

function initPieChart(dashboard) {
  const chartElement = document.getElementById("pie-chart")
  if (!chartElement) return

  // Check if chart instance already exists and destroy it
  if (window.pieChart) {
    window.pieChart.destroy()
  }

  window.pieChart = new Chart(chartElement, {
    type: "pie",
    data: {
      labels: dashboard.courses.labels,
      datasets: [
        {
          data: dashboard.courses.popularity,
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"],
        },
      ],
    },
    options: { responsive: true, maintainAspectRatio: false },
  })
}

function initViewershipChart(dashboard) {
  const chartElement = document.getElementById("viewership-chart")
  if (!chartElement) return

  // Check if chart instance already exists and destroy it
  if (window.viewershipChart) {
    window.viewershipChart.destroy()
  }

  window.viewershipChart = new Chart(chartElement, {
    type: "line",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [
        {
          label: "Monthly Viewers",
          data: dashboard.analytics.viewership,
          borderColor: "#4BC0C0",
          tension: 0.3,
          fill: {
            target: "origin",
            above: "rgba(75, 192, 192, 0.2)",
          },
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

function initEngagementChart(dashboard) {
  const chartElement = document.getElementById("engagement-chart")
  if (!chartElement) return

  // Check if chart instance already exists and destroy it
  if (window.engagementChart) {
    window.engagementChart.destroy()
  }

  window.engagementChart = new Chart(chartElement, {
    type: "doughnut",
    data: {
      labels: ["Likes", "Comments", "Shares", "Saves", "Downloads"],
      datasets: [
        {
          data: dashboard.analytics.engagement,
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
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

function initCompletionGauge(dashboard) {
  const chartElement = document.getElementById("completion-gauge")
  if (!chartElement) return

  // Check if chart instance already exists and destroy it
  if (window.completionGauge) {
    window.completionGauge.destroy()
  }

  window.completionGauge = new Chart(chartElement, {
    type: "doughnut",
    data: {
      labels: ["Completed", "Remaining"],
      datasets: [
        {
          data: [dashboard.courses.completion_rate, 100 - dashboard.courses.completion_rate],
          backgroundColor: ["#4BC0C0", "#263043"],
          circumference: 180,
          rotation: 270,
        },
      ],
    },
    options: {
      cutout: "70%",
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  })

  const gaugeValue = document.getElementById("gauge-value")
  if (gaugeValue) {
    gaugeValue.textContent = `${dashboard.courses.completion_rate}%`
  }
}

function initRevenueChart(dashboard) {
  const chartElement = document.getElementById("revenue-chart")
  if (!chartElement) return

  // Check if chart instance already exists and destroy it
  if (window.revenueChart) {
    window.revenueChart.destroy()
  }

  window.revenueChart = new Chart(chartElement, {
    type: "line",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [
        {
          label: "Monthly Revenue (₹)",
          data: dashboard.analytics.revenue,
          borderColor: "#4BC0C0",
          tension: 0.3,
          fill: {
            target: "origin",
            above: "rgba(75, 192, 192, 0.2)",
          },
          pointBackgroundColor: "#4BC0C0",
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
          ticks: {
            color: "rgba(255, 255, 255, 0.7)",
            callback: (value) => "₹" + value / 1000 + "k",
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

function initSourcesChart(dashboard) {
  const chartElement = document.getElementById("sources-chart")
  if (!chartElement) return

  // Check if chart instance already exists and destroy it
  if (window.sourcesChart) {
    window.sourcesChart.destroy()
  }

  window.sourcesChart = new Chart(chartElement, {
    type: "bar",
    data: {
      labels: dashboard.analytics.sources,
      datasets: [
        {
          label: "Users",
          data: dashboard.analytics.source_users,
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"],
        },
      ],
    },
    options: {
      indexAxis: "y",
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          ticks: {
            color: "rgba(255, 255, 255, 0.7)",
          },
          grid: {
            display: false,
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

function initRatings(dashboard) {
  const ratings = dashboard.courses.ratings
  if (!ratings) return

  const total = Object.values(ratings).reduce((a, b) => a + b, 0)

  document.querySelectorAll(".rating-row").forEach((row, index) => {
    const stars = 5 - index
    const count = ratings[stars]
    const percentage = ((count / total) * 100).toFixed(0)

    row.querySelector(".rating-fill").style.width = `${percentage}%`
    row.querySelector(".rating-count").textContent = count.toLocaleString()
  })
}

