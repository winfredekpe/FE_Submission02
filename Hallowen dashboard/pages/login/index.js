import {
  refreshToken,
  setErrorMessage,
  setCookie,
  goTo,
} from "../../lib/index.js";

let username = document.querySelector("#username");
let password = document.querySelector("#password");
let submit = document.querySelector("#submit");
let error = document.querySelector("#error");

// adding event listeners
submit.addEventListener("click", login);

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
    let res = await fetch(loginUrl, {
      headers: {
        "content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
    });
    let resp = await res.json();
    let { access_token, refresh_token, msg } = resp;
    if (msg) {
      return setErrorMessage(msg);
    }

    setCookie("usrtkn", access_token);
    setCookie("usrrfsh", refresh_token, 30);

    refreshToken();

    // cron to refresh token every 14 minutes since the access_token expires in 15 minutes
    setInterval(() => {
      refreshToken();
    }, 14 * 60 * 1000);

    // redirect to dashboard overview
    goTo("pages/dashboard/overview/index.html");
  }
}
