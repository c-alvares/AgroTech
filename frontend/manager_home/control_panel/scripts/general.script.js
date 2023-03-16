const objBT = {
  bearerToken: "Bearer " + JSON.parse(localStorage.getItem("user")).token,
};

let h1 = document.querySelector("#buttons4 p:nth-child(2)");

h1.addEventListener("click", () => {
    window.location.href = "../dashboard/dashboard.html";
  });