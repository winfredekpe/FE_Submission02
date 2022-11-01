import { getCookie, refreshToken } from "../../../lib/index.js";

let bestseller = document.getElementById("orders");
let search = document.getElementById("searchbox");
let prev = document.getElementById("prev");
let next = document.getElementById("next");
let current = document.getElementById("current");
let all = document.getElementById("all");

// endpoints
let dashboardUrl = "https://freddy.codesubmit.io/orders";
let searchUrl = "https://freddy.codesubmit.io/orders?q=";
let paginationUrl = "https://freddy.codesubmit.io/orders?page=";

// adding eventlisteners
document.addEventListener("DOMContentLoaded", () => {
  refreshToken();
  getDashboardData();
});
search.addEventListener("change", handleSearch);
next.addEventListener("click", handlePagination);
prev.addEventListener("click", handlePagination);

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
  let { orders, page, total } = resp;
  renderOrders(orders);
  setPagination(page, total);
}

// renderers
function renderOrders(orders, clearOldOrders = false) {
  if (clearOldOrders) {
    bestseller.innerHTML = "";
  }

  orders.map((order) => {
    let {
      status,
      total,
      created_at,
      product: { name, image },
    } = order;

    let tr = document.createElement("tr");

    let td1 = document.createElement("td");
    td1.textContent = name.slice(0, 20);

    let td2 = document.createElement("td");
    td2.textContent = created_at;

    let td3 = document.createElement("td");
    td3.textContent = total;

    // color for status
    let td4 = document.createElement("td");
    td3.textContent = status;
    switch (status) {
      case "processing":
        td3.style.color = "red";
        break;
      case "delivered":
        td3.style.color = "green";
        break;
      case "shipped":
        td3.style.color = "black";
        break;
    }

    let img = document.createElement("img");
    img.src = image;
    img.width = "70";

    let td5 = document.createElement("td").appendChild(img);

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);

    bestseller.appendChild(tr);
  });
}

async function handleSearch(e) {
  let query = e.target.value;

  console.log(query);

  let token = getCookie("usrtkn");
  let res = await fetch(searchUrl + query, {
    headers: {
      "content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    method: "GET",
  });

  let resp = await res.json();
  let { orders, page, total } = resp;
  renderOrders(orders, true);
  setPagination(page, total);
}

async function handlePagination(e) {
  let num = Number(current.textContent);
  let btn = e.target.textContent;

  switch (btn) {
    case "next":
      num > 0 && num++;
      break;
    case "prev":
      num > 1 && num--;
      break;
  }

  let token = getCookie("usrtkn");
  let res = await fetch(paginationUrl + num, {
    headers: {
      "content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    method: "GET",
  });

  let resp = await res.json();
  let { orders, page, total } = resp;
  renderOrders(orders, true);
  setPagination(page, total);
}

function setPagination(currentnum, allnum) {
  current.textContent = currentnum;
  all.textContent = allnum;
}
