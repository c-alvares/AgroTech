const objBT = {
    bearerToken: "Bearer " + JSON.parse(localStorage.getItem("user")).token,
  };

  const driverRegister = {
    vehicleInput: document.querySelector("#vehicleInput"),
    licenceInput: document.querySelector("#licenceInput"),
  };
  
  const driverUpdate = {
    vehicleIdInput: document.querySelector("#vehicleIdInput"),
    typeUpInput: document.querySelector("#typeUpInput"),
  };
  
  const inputAvailabilityUpdate = {
    availableVehicleIdInput: document.querySelector("#availableVehicleIdInput"),
    availabilityVehicleInput: document.querySelector("#availabilityVehicleInput"),
  };