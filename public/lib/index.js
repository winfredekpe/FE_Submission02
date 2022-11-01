// endpoints
let newTokenUrl = "https://freddy.codesubmit.io/refresh";

// util functions
export function setErrorMessage(message) {
  error.textContent = message;
}

export function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    let date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = date.toUTCString();
  }

  document.cookie =
    name +
    "=" +
    value +
    ";path=/" +
    // ";domain=" +
    ";expires=" +
    expires;
}

export function getCookie(name) {
  let cookieArr = document.cookie.split(";");
  for (let i = 0; i < cookieArr.length; i++) {
    let cookiePair = cookieArr[i].split("=");
    if (name === cookiePair[0].trim()) {
      return decodeURIComponent(cookiePair[1]);
    }
  }
  return null;
}

export function goTo(href) {
  // work with the body of the document the script is in
  let body = document.getElementById("body");
  let url = document.createElement("a");
  url.setAttribute("href", href);
  url.style.visibility = "none";
  body.appendChild(url);
  url.click();
  console.log(url);
}

export async function refreshToken() {
  let token = getCookie("usrrfsh");
  let res = await fetch(newTokenUrl, {
    headers: {
      "content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    method: "POST",
  });
  let resp = await res.json();
  let { access_token } = resp;
  if (access_token) {
    setCookie("usrtkn", access_token);
  }
}

export function logout(url) {
  ["usrtkn", "usrrfsh"].forEach((cookie) => {
    if (getCookie(cookie)) {
      setCookie("usrtkn", "", 0);
      setCookie("usrrfsh", "", 0);
    }
  });
  goTo(url);
}
