const objBT = {
    bearerToken: "Bearer " + JSON.parse(localStorage.getItem("user")).token,
  };

  const driverRegister = {
    driverInput: document.querySelector("#driverInput"),
    licenceInput: document.querySelector("#licenceInput")
  };
  
  const driverUpdate = {
    driverIdInput: document.querySelector("#driverIdInput"),
    driverUpInput: document.querySelector("#driverUpInput"),
    licenceUpInput: document.querySelector("#licenceUpInput"),
  };
  
  const inputAvailabilityUpdate = {
    availableDriverIdInput: document.querySelector("#availableDriverIdInput"),
    availabilityInput: document.querySelector("#availabilityInput"),
  };