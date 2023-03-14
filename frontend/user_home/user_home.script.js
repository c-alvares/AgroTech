let driversTable = document.querySelector('#driversTable');
let driverRow = document.querySelector('.driverRow');

let fleetTable = document.querySelector('#fleetTable');
let fleetRow = document.querySelector('.fleetRow');

let maintenanceTable = document.querySelector('#maintenanceTable');
let maintenanceRow = document.querySelector('.maintenanceRow');

let inCourseMaintenanceTable = document.querySelector('#inCourseMaintenanceTable');
let inCourseMaintenanceRow = document.querySelector('.inCourseMaintenanceRow');

let allOperationTable = document.querySelector('#allOperationTable');
let allOperationRow = document.querySelector('.allOperationRow');

let operationTable = document.querySelector('#operationTable');
let operationRow = document.querySelector('.operationRow');

const optionsDriver = {method: 'GET'};

fetch('http://localhost:3000/listarmotoristas', optionsDriver)
  .then(response => response.json())
  .then(resp => {
    resp.forEach(driver => {
        let showDriver = driverRow.cloneNode(true)
        // console.log(driver)
        if(driver.availability == true) {
          showDriver.classList.remove('model')
          showDriver.querySelector('#driverIdOutput').innerHTML = driver.id
          showDriver.querySelector('#nameOutput').innerHTML = driver.name
          showDriver.querySelector('#licenceOutput').innerHTML = driver.licence
          showDriver.querySelector('#driverAvailabilityOutput').innerHTML = `<img src="https://cdn-icons-png.flaticon.com/512/190/190411.png" alt="">`
        }else {
          showDriver.classList.remove('model')
          showDriver.querySelector('#driverIdOutput').innerHTML = driver.id
          showDriver.querySelector('#nameOutput').innerHTML = driver.name
          showDriver.querySelector('#licenceOutput').innerHTML = driver.licence
          showDriver.querySelector('#driverAvailabilityOutput').innerHTML = `<img src="https://cdn-icons-png.flaticon.com/512/6711/6711656.png" alt="">`
        }

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
        if(fleet.availability == true) {
          showFleet.classList.remove('model')
          showFleet.querySelector('#vehicleIdOutput').innerHTML = fleet.id
          showFleet.querySelector('#tipoOutput').innerHTML = fleet.type
          showFleet.querySelector('#plateOutput').innerHTML = fleet.plate
          showFleet.querySelector('#vehicleAvailabilityOutput').innerHTML = `<img src="https://cdn-icons-png.flaticon.com/512/190/190411.png" alt="">`
        }else {
          showFleet.classList.remove('model')
          showFleet.querySelector('#vehicleIdOutput').innerHTML = fleet.id
          showFleet.querySelector('#tipoOutput').innerHTML = fleet.type
          showFleet.querySelector('#plateOutput').innerHTML = fleet.plate
          showFleet.querySelector('#vehicleAvailabilityOutput').innerHTML = `<img src="https://cdn-icons-png.flaticon.com/512/6711/6711656.png" alt="">`
        }
        

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
          // console.log(maintenance)
          if(maintenance.checkout == null) {
            showMaintenance.classList.remove('model')
            showMaintenance.querySelector('#maintenanceIdOutput').innerHTML = maintenance.id
            showMaintenance.querySelector('#checkinOutput').innerHTML = maintenance.checkin.toLocaleString('pt-BR', { timeZone: 'GMT-3' }).split('T')[0]
            showMaintenance.querySelector('#checkoutOutput').innerHTML = maintenance.checkout
            showMaintenance.querySelector('#descriptionOutput').innerHTML = maintenance.description
            showMaintenance.querySelector('#costOutput').innerHTML = maintenance.cost
            showMaintenance.querySelector('#mainVehicleIdOutput').innerHTML = maintenance.vehicle.id
            showMaintenance.querySelector('#mainVehicleTypeOutput').innerHTML = maintenance.vehicle.type
            showMaintenance.querySelector('#mainVehiclePlateOutput').innerHTML = maintenance.vehicle.plate
    
            maintenanceTable.appendChild(showMaintenance)
          }else {
            showMaintenance.classList.remove('model')
            showMaintenance.querySelector('#maintenanceIdOutput').innerHTML = maintenance.id
            showMaintenance.querySelector('#checkinOutput').innerHTML = maintenance.checkin.toLocaleString('pt-BR', { timeZone: 'GMT-3' }).split('T')[0]
            showMaintenance.querySelector('#checkoutOutput').innerHTML = maintenance.checkout.toLocaleString('pt-BR', { timeZone: 'GMT-3' }).split('T')[0]
            showMaintenance.querySelector('#descriptionOutput').innerHTML = maintenance.description
            showMaintenance.querySelector('#costOutput').innerHTML = maintenance.cost
            showMaintenance.querySelector('#mainVehicleIdOutput').innerHTML = maintenance.vehicle.id
            showMaintenance.querySelector('#mainVehicleTypeOutput').innerHTML = maintenance.vehicle.type
            showMaintenance.querySelector('#mainVehiclePlateOutput').innerHTML = maintenance.vehicle.plate
    
            maintenanceTable.appendChild(showMaintenance)
          }
  
      })
    })
    .catch(err => console.error(err));



    const optionsInCourseMaintenance = {method: 'GET'};

    fetch('http://localhost:3000/buscarmanutencoesemcurso', optionsInCourseMaintenance)
      .then(response => response.json())
      .then(resp => {
        resp.forEach(maintenanceInCourse => {
            let showMaintenanceInCourse = inCourseMaintenanceRow.cloneNode(true)
            console.log(maintenanceInCourse)
            showMaintenanceInCourse.classList.remove('model')
            showMaintenanceInCourse.querySelector('#inCourseMaintenanceIdOutput').innerHTML = maintenanceInCourse.id
            showMaintenanceInCourse.querySelector('#inCMaincheckinOutput').innerHTML = maintenanceInCourse.checkin.toLocaleString('pt-BR', { timeZone: 'GMT-3' }).split('T')[0]
            showMaintenanceInCourse.querySelector('#inCMaindescriptionOutput').innerHTML = maintenanceInCourse.description
            showMaintenanceInCourse.querySelector('#inCMaincostOutput').innerHTML = maintenanceInCourse.cost
            showMaintenanceInCourse.querySelector('#inCMainVehicleIdOutput').innerHTML = maintenanceInCourse.vehicle.id
            showMaintenanceInCourse.querySelector('#inCMainVehicleTypeOutput').innerHTML = maintenanceInCourse.vehicle.type
            showMaintenanceInCourse.querySelector('#inCMainVehiclePlateOutput').innerHTML = maintenanceInCourse.vehicle.plate
    
            inCourseMaintenanceTable.appendChild(showMaintenanceInCourse)
    
        })
      })
      .catch(err => console.error(err));

    const optionsAllOperation = {method: 'GET'};

    fetch('http://localhost:3000/listaroperacoes', optionsAllOperation)
      .then(response => response.json())
      .then(resp => {
        resp.forEach(op => {
            let showAllOperation = allOperationRow.cloneNode(true)
            // console.log(op)
            if( op.arrival == null) {
              showAllOperation.classList.remove('model')
              showAllOperation.querySelector('#operationIdOutput').innerHTML = op.id
              showAllOperation.querySelector('#departureOutput').innerHTML = op.departure.toLocaleString('pt-BR', { timeZone: 'GMT-3' }).split('T')[0]
              showAllOperation.querySelector('#arrivalOutput').innerHTML = op.arrival
              showAllOperation.querySelector('#opDescriptionOutput').innerHTML = op.description
              showAllOperation.querySelector('#opDriverIdOutput').innerHTML = op.driver.id
              showAllOperation.querySelector('#opDriverNameOutput').innerHTML = op.driver.name
              showAllOperation.querySelector('#opDriverLicenceOutput').innerHTML = op.driver.licence
              showAllOperation.querySelector('#opVehicleIdOutput').innerHTML = op.vehicle.id
              showAllOperation.querySelector('#opVehicleTypeOutput').innerHTML = op.vehicle.type
              showAllOperation.querySelector('#opVehiclePlateOutput').innerHTML = op.vehicle.plate
      
              allOperationTable.appendChild(showAllOperation)
            }else {
              showAllOperation.classList.remove('model')
              showAllOperation.querySelector('#operationIdOutput').innerHTML = op.id
              showAllOperation.querySelector('#departureOutput').innerHTML = op.departure.toLocaleString('pt-BR', { timeZone: 'GMT-3' }).split('T')[0]
              showAllOperation.querySelector('#arrivalOutput').innerHTML = op.arrival.toLocaleString('pt-BR', { timeZone: 'GMT-3' }).split('T')[0]
              showAllOperation.querySelector('#opDescriptionOutput').innerHTML = op.description
              showAllOperation.querySelector('#opDriverIdOutput').innerHTML = op.driver.id
              showAllOperation.querySelector('#opDriverNameOutput').innerHTML = op.driver.name
              showAllOperation.querySelector('#opDriverLicenceOutput').innerHTML = op.driver.licence
              showAllOperation.querySelector('#opVehicleIdOutput').innerHTML = op.vehicle.id
              showAllOperation.querySelector('#opVehicleTypeOutput').innerHTML = op.vehicle.type
              showAllOperation.querySelector('#opVehiclePlateOutput').innerHTML = op.vehicle.plate

              allOperationTable.appendChild(showAllOperation)
            }
        })
      })
      .catch(err => console.error(err));



    const optionsOperation = {method: 'GET'};

    fetch('http://localhost:3000/buscaroperacoesemcurso', optionsOperation)
      .then(response => response.json())
      .then(resp => {
        resp.forEach(operation => {
            let showOperation = operationRow.cloneNode(true)
            // console.log(operation)
            showOperation.classList.remove('model')
            showOperation.querySelector('#operationIdOutput').innerHTML = operation.id
            showOperation.querySelector('#departureOutput').innerHTML = operation.departure.toLocaleString('pt-BR', { timeZone: 'GMT-3' }).split('T')[0]
            showOperation.querySelector('#opDescriptionOutput').innerHTML = operation.description
            showOperation.querySelector('#opDriverIdOutput').innerHTML = operation.driver.id
            showOperation.querySelector('#opDriverNameOutput').innerHTML = operation.driver.name
            showOperation.querySelector('#opDriverLicenceOutput').innerHTML = operation.driver.licence
            showOperation.querySelector('#opVehicleIdOutput').innerHTML = operation.vehicle.id
            showOperation.querySelector('#opVehicleTypeOutput').innerHTML = operation.vehicle.type
            showOperation.querySelector('#opVehiclePlateOutput').innerHTML = operation.vehicle.plate
    
            operationTable.appendChild(showOperation)
    
        })
      })
      .catch(err => console.error(err));