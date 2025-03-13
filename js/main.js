document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Load JSON data
    const response = await fetch("data.json");
    const data = await response.json();
    const dashboard = data.dashboard;



    // Initialize Charts
    initBarChart(dashboard);
    initPieChart(dashboard);
    initViewershipChart(dashboard);
    initEngagementChart(dashboard);
    initCompletionGauge(dashboard);
    initRevenueChart(dashboard);
    initSourcesChart(dashboard);
    initRatings(dashboard);

    // Sidebar Toggle
    window.openSidebar = () =>
      document.getElementById("sidebar").classList.add("sidebar-responsive");
    window.closeSidebar = () =>
      document.getElementById("sidebar").classList.remove("sidebar-responsive");

    
  } catch (error) {
    console.error("Error loading data:", error);
    //alert("Failed to load dashboard data");
  }
});

// Chart Initialization Functions
function initBarChart(dashboard) {
  new Chart(document.getElementById("bar-chart"), {
    type: "bar",
    data: {
      labels: dashboard.courses.labels,
      datasets: [
        {
          label: "Students Enrolled",
          data: dashboard.courses.enrollments,
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
            "#FF9F40",
          ],
        },
      ],
    },
    options: { responsive: true, maintainAspectRatio: false },
  });
}

function initPieChart(dashboard) {
  new Chart(document.getElementById("pie-chart"), {
    type: "pie",
    data: {
      labels: dashboard.courses.labels,
      datasets: [
        {
          data: dashboard.courses.popularity,
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
            "#FF9F40",
          ],
        },
      ],
    },
  });
}

function initViewershipChart(dashboard) {
  new Chart(document.getElementById("viewership-chart"), {
    type: "line",
    data: {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          label: "Monthly Viewers",
          data: dashboard.analytics.viewership,
          borderColor: "#4BC0C0",
          tension: 0.3,
        },
      ],
    },
  });
}

function initEngagementChart(dashboard) {
  new Chart(document.getElementById("engagement-chart"), {
    type: "doughnut",
    data: {
      labels: ["Likes", "Comments", "Shares", "Saves", "Downloads"],
      datasets: [
        {
          data: dashboard.analytics.engagement,
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
          ],
        },
      ],
    },
  });
}

function initCompletionGauge(dashboard) {
  new Chart(document.getElementById("completion-gauge"), {
    type: "doughnut",
    data: {
      labels: ["Completed", "Remaining"],
      datasets: [
        {
          data: [
            dashboard.courses.completion_rate,
            100 - dashboard.courses.completion_rate,
          ],
          backgroundColor: ["#4BC0C0", "#263043"],
          circumference: 180,
          rotation: 270,
        },
      ],
    },
    options: { cutout: "70%" },
  });
  document.getElementById(
    "gauge-value"
  ).textContent = `${dashboard.courses.completion_rate}%`;
}

function initRevenueChart(dashboard) {
  new Chart(document.getElementById("revenue-chart"), {
    type: "line",
    data: {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          label: "Monthly Revenue (₹)",
          data: dashboard.analytics.revenue,
          borderColor: "#4BC0C0",
          tension: 0.3,
        },
      ],
    },
  });
}

function initSourcesChart(dashboard) {
  new Chart(document.getElementById("sources-chart"), {
    type: "bar",
    data: {
      labels: dashboard.analytics.sources,
      datasets: [
        {
          label: "Users",
          data: dashboard.analytics.source_users,
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
            "#FF9F40",
          ],
        },
      ],
    },
    options: { indexAxis: "y" },
  });
}

function initRatings(dashboard) {
  const ratings = dashboard.courses.ratings;
  const total = Object.values(ratings).reduce((a, b) => a + b, 0);

  document.querySelectorAll(".rating-row").forEach((row, index) => {
    const stars = 5 - index;
    const count = ratings[stars];
    const percentage = ((count / total) * 100).toFixed(0);

    row.querySelector(".rating-fill").style.width = `${percentage}%`;
    row.querySelector(".rating-count").textContent = count.toLocaleString();
  });
}

