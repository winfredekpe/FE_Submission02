let username = document.querySelector("#username");
let password = document.querySelector("#password");
let submit = document.querySelector("#submit");
let error = document.querySelector("#error");

// endpoints
let loginUrl = "https://freddy.codesubmit.io/login";

async function login(e) {
  if (!username.value) {
    return setErrorMessage("please provide a username");
  }
  if (!password.value) {
    return setErrorMessage("please provide a  password");
  }

  if (username.value && password.value) {
    setErrorMessage("");
    // make request to api ansd log user in
    // { username: "freddy", password: "ElmStreet2019" }

    let res = fetch(loginUrl, {
      headers: {
        "content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
    })
      .then((dt) => {
        return dt.json();
      })
      .then((dt) => {
        console.log(dt);
        let { access_token, refresh_token } = dt;
      });
    // let dt = await res.json();
    // console.log(dt);
  }
}

// util functions
function setErrorMessage(message) {
  error.textContent = message;
}

function refreshToken() {
  fetch(loginUrl, {
    headers: {
      "content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      username: username.value,
      password: password.value,
    }),
  })
    .then((dt) => {
      return dt.json();
    })
    .then((dt) => {
      console.log(dt);
      let { access_token, refresh_token } = dt;
      setCookie(usrtkn, access_token);
      setCookie(usrrfsh, refreshToken);
    });

  // cron to refresh token every 5 min
  // setInterval(() => {refreshToken()}, 5 * 60 * 1000);

  // got to dashboard overview
}

function refreshToken() {
  let token = getCookies(usrrfsh);
  fetch(loginUrl, {
    headers: {
      "content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      username: username.value,
      password: password.value,
    }),
  })
    .then((dt) => {
      return dt.json();
    })
    .then((dt) => {
      console.log(dt);
      let { access_token, refresh_token } = dt;
      // setCookie(usrtkn, access_token);
      // setCookie(usrrfsh, refreshToken);
      goTo("../dashboard/overview/index.html");
    });
}

function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    let date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookies(name) {
  var cookieArr = document.cookie.split(";");
  for (var i = 0; i < cookieArr.length; i++) {
    var cookiePair = cookieArr[i].split("=");
    if (name === cookiePair[0].trim()) {
      return decodeURIComponent(cookiePair[1]);
    }
  }
  return null;
}

function goTo(href) {
  // work with the body of the document the script is in
  let body = document.getElementsByTagName("body");
  let url = document.createElement("a");
  url.setAttribute("href", href);
  url.style.visibility = "none";
  body.appendChild(url);
  url.click();
  console.log(url);
}
