const registerOperationObj = {
    opDescriptionInput: document.querySelector("#opDescriptionInput"),
    opDriverIDInput: document.querySelector("#opDriverIDInput"),
    opAutomobileIDInput: document.querySelector("#opAutomobileIDInput"),
};
  
const updateOperationObj = {
    operationIDInput: document.querySelector("#operationIDInput"),
    operationDescriptionInput: document.querySelector("#operationDescriptionInput"),

};
  
const finishOperationObj = {
    finishOperationIdInput: document.querySelector("#finishOperationIdInput"),
    operationDriverIDEndInput: document.querySelector("#operationDriverIDEndInput"),
    operationVehicleIDEndInput: document.querySelector("#operationVehicleIDEndInput")
};
  
const deleteOperationObj = { 
    delOperationIdInput: document.querySelector("#delOperationIdInput"),
    operationDriverIDDelInput: document.querySelector("#operationDriverIDDelInput"),
    operationVehicleIDDelInput: document.querySelector("#operationVehicleIDDelInput"),
};

function registerOperation() {
    window.event.preventDefault()

    let send = {
      description: registerOperationObj.opDescriptionInput.value,
      driver_id: Number(registerOperationObj.opDriverIDInput.value),
      vehicle_id: Number(registerOperationObj.opAutomobileIDInput.value),
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: objBT.bearerToken,
      },
    };
    options.body = JSON.stringify(send);
  
    fetch("http://localhost:3000/criaroperacao", options)
      .then((response) => {
        if (response.status != 201) {
          if (response.status == 401) {
            alert("Sessão expirada. Acesse novamente");
            window.location.reload();
          } else {
            alert("Erro ao cadastrar operação. Tente novamente!");
            window.location.reload();
          }
        } else {
          return response.json();
        }
      })
      .then((resp) => {
        alert("Operação cadastrada com sucesso!");
        window.location.reload();
      })
      .catch((err) => console.error(err));
}
