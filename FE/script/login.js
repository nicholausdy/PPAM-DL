const login = async () => {
  let usernameElem = document.getElementById("username");
  let passwordElem = document.getElementById("password");
  let response = await fetch(`http://52.76.55.94:3000/api/v1/login`, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({
      username: usernameElem.value,
      password: passwordElem.value,
    }),
  });
  const resp = await response.json();
  console.log(usernameElem.value);
  console.log(passwordElem.value);
  window.localStorage.setItem("username", usernameElem.value);
  window.localStorage.setItem("password", passwordElem.value);
  console.log(resp);
  console.log(resp.Token);
  if (resp.Status == "Success") {
    window.localStorage.setItem("token", resp.Token);
    console.log(localStorage.getItem("token"));
    let urlPart1 = window.location.href.split("/");
    window.location =
      urlPart1.splice(0, urlPart1.length - 1).join("/") + "/pilihan.html";
  } else {
    alert("Invalid Login");
  }
};

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then((reg) => console.log("service worker registered"))
    .catch((err) => console.log("service worker not registered", err));
}
