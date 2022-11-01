import { getCookie, refreshToken } from "../../../lib/index.js";

let bestseller = document.getElementById("bestseller");

// endpoints
let dashboardUrl = "https://freddy.codesubmit.io/orders";

// "https://freddy.codesubmit.io/orders?page=1&q=search_term"

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

  console.log(resp);

  // let { bestsellers, sales_over_time_week, sales_over_time_year } =
  //   resp?.dashboard;

  renderOrders();
}

// renderers
function renderOrders(orders) {}
