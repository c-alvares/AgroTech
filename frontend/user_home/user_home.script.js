let driversTable = document.querySelector('#driversTable');
let driverRow = document.querySelector('.driverRow');

let fleetTable = document.querySelector('#fleetTable');
let fleetRow = document.querySelector('.fleetRow');

let maintenanceTable = document.querySelector('#maintenanceTable');
let maintenanceRow = document.querySelector('.maintenanceRow');

const optionsDriver = {method: 'GET'};

fetch('http://localhost:3000/listarmotoristas', optionsDriver)
  .then(response => response.json())
  .then(resp => {
    resp.forEach(driver => {
        let showDriver = driverRow.cloneNode(true)
        // console.log(driver)
        showDriver.classList.remove('model')
        showDriver.querySelector('#driverIdOutput').innerHTML = driver.id
        showDriver.querySelector('#nameOutput').innerHTML = driver.name
        showDriver.querySelector('#licenceOutput').innerHTML = driver.licence
        showDriver.querySelector('#driverAvailabilityOutput').innerHTML = driver.availability

        driversTable.appendChild(showDriver)

    })
  })
  .catch(err => console.error(err));


  const optionsFleet = {method: 'GET'};

fetch('http://localhost:3000/listarfrota', optionsFleet)
  .then(response => response.json())
  .then(resp => {
    resp.forEach(fleet => {
        let showFleet = fleetRow.cloneNode(true)
        // console.log(fleet)
        showFleet.classList.remove('model')
        showFleet.querySelector('#vehicleIdOutput').innerHTML = fleet.id
        showFleet.querySelector('#tipoOutput').innerHTML = fleet.type
        showFleet.querySelector('#plateOutput').innerHTML = fleet.plate
        showFleet.querySelector('#vehicleAvailabilityOutput').innerHTML = fleet.availability

        fleetTable.appendChild(showFleet)

    })
  })
  .catch(err => console.error(err));


  const optionsMaintenance = {method: 'GET'};

  fetch('http://localhost:3000/listarmanutencoes', optionsMaintenance)
    .then(response => response.json())
    .then(resp => {
      resp.forEach(maintenance => {
          let showMaintenance = maintenanceRow.cloneNode(true)
          console.log(maintenance)
          showMaintenance.classList.remove('model')
          showMaintenance.querySelector('#maintenanceIdOutput').innerHTML = maintenance.id
          showMaintenance.querySelector('#checkinOutput').innerHTML = maintenance.checkin
          showMaintenance.querySelector('#checkoutOutput').innerHTML = maintenance.checkout
          showMaintenance.querySelector('#descriptionOutput').innerHTML = maintenance.description
          showMaintenance.querySelector('#costOutput').innerHTML = maintenance.cost
          showMaintenance.querySelector('#mainVehicleIdOutput').innerHTML = maintenance.vehicle.id
          showMaintenance.querySelector('#mainVehicleTypeOutput').innerHTML = maintenance.vehicle.type
          showMaintenance.querySelector('#mainVehiclePlateOutput').innerHTML = maintenance.vehicle.plate
  
          maintenanceTable.appendChild(showMaintenance)
  
      })
    })
    .catch(err => console.error(err));