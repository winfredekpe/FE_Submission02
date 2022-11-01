import { getCookie, refreshToken, logout } from "../../../lib/index.js";

let bestseller = document.getElementById("bestseller");
let logoutbtn = document.getElementById("logout");
let chartToggle = document.getElementById("charttoggle");
let toggleLabel = document.getElementById("togglelabel");
let labelLeft = document.getElementById("labelleft");

// globals
let currentChart;

// endpoints
let dashboardUrl = "https://freddy.codesubmit.io/dashboard";

// adding eventlisteners
document.addEventListener("DOMContentLoaded", async () => {
  checkAuth();
  refreshToken();
  let resp = await getDashboardData();
  let { bestsellers, sales_over_time_week, sales_over_time_year } =
    resp?.dashboard;

  renderChart(sales_over_time_week, sales_over_time_year);
  renderBestsellers(bestsellers);
});
logoutbtn.addEventListener("click", () => {
  logout("/index.html");
});
chartToggle.addEventListener("change", handleChartToggle);

// callbacks
async function getDashboardData() {
  let token = getCookie("usrtkn");
  let res = await fetch(dashboardUrl, {
    headers: {
      "content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    method: "GET",
  });
  let resp = await res.json();
  return resp;
}

// checks authentication before allowing the user to the dashboard
function checkAuth() {
  if (
    Boolean(getCookie("usrtkn")) === false &&
    Boolean(getCookie("usrrfsh")) === false
  ) {
    return logout("/index.html");
  }
}

async function handleChartToggle() {
  let status = chartToggle.checked;
  let resp = await getDashboardData();
  let { bestsellers, sales_over_time_week, sales_over_time_year } =
    resp?.dashboard;

  // destroying old chart
  currentChart.destroy();
  if (status) {
    toggleLabel.textContent = "See Weekly Revenue";
    labelLeft.textContent = "Revenue ( Last 12 Months )";
    renderChart(sales_over_time_week, sales_over_time_year, "yearly");
  }
  if (!status) {
    toggleLabel.textContent = "See Yearly Revenue";
    labelLeft.textContent = "Revenue ( Last 7 days )";
    renderChart(sales_over_time_week, sales_over_time_year, "weekly");
  }
}

// renderers
function renderChart(weekly, yearly, type = "weekly") {
  yearly = Object.values(yearly);
  weekly = Object.values(weekly);

  let yearlyData = {
    labels: [
      "This month",
      "last month",
      "month3",
      "month4",
      "month5",
      "month6",
      "month7",
      "month8",
      "month9",
      "month10",
      "month11",
      "month12",
    ],
    datasets: [
      {
        label: "Revenue Genrated Monthly",
        data: yearly?.map((item) => {
          return item?.total;
        }),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  let weeklyData = {
    labels: ["today", "yesterday", "day3", "day4", "day5", "day6", "day7"],
    datasets: [
      {
        label: "Revenue Genrated Daily",
        data: weekly?.map((item) => {
          return item?.total;
        }),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const ctx = document.getElementById("myChart").getContext("2d");
  const myChart = new Chart(ctx, {
    type: "bar",
    data: type === "weekly" ? weeklyData : yearlyData,
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  // needs to be destroyed before new one can be assigned the the canvas
  currentChart = myChart;
}

function RenderCards(data) {}

function renderBestsellers(data) {
  data.map((item) => {
    let {
      units,
      revenue,
      product: { name, image },
    } = item;

    let tr = document.createElement("tr");

    let td1 = document.createElement("td");
    td1.textContent = name.slice(0, 20);

    let td2 = document.createElement("td");
    td2.textContent = units;

    let td3 = document.createElement("td");
    td3.textContent = "$" + revenue;

    let img = document.createElement("img");
    img.src = image;
    img.width = "70";

    let td4 = document.createElement("td").appendChild(img);

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);

    bestseller.appendChild(tr);
  });

  let td4 = document.createElement("td");
}
