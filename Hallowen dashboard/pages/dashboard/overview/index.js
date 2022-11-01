import { getCookie, refreshToken } from "../../../lib/index.js";

let bestseller = document.getElementById("bestseller");

// endpoints
let dashboardUrl = "https://freddy.codesubmit.io/dashboard";

// adding eventlisteners
document.addEventListener("DOMContentLoaded", () => {
  refreshToken();
  getDashboardData();
});

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
  let { bestsellers, sales_over_time_week, sales_over_time_year } =
    resp?.dashboard;

  renderChart(sales_over_time_week, sales_over_time_year);
  renderBestsellers(bestsellers);
}

// renderers

function renderChart(weekly, yearly) {
  const ctx = document.getElementById("myChart").getContext("2d");
  const myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [
        {
          label: "# of Votes",
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

function RebderCards(data) {}

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
    td3.textContent = revenue;

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
