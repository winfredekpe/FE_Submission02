import { getCookie } from "../../../lib/index.js";

// endpoints
let dashboardUrl = "https://freddy.codesubmit.io/dashboard";

// adding eventlisteners
document.addEventListener("DOMContentLoaded", getDashboardData);

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
}

function renderBestsellers(data) {}
