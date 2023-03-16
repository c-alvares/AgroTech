const maintainRegister = {
    maintenanceDescriptionInput: document.querySelector("#maintenanceDescriptionInput"),
    priceInput: document.querySelector("#priceInput"),
    automobileIDInput: document.querySelector("#automobileIDInput"),
  };
  
const maintainUpdate = {
    maintIDInput: document.querySelector("#maintIDInput"),
    mainDescriptionInput: document.querySelector("#mainDescriptionInput"),
    costInput: document.querySelector("#costInput"),
  };
  
const InputFinishMaintain = {
    MaintainIDInput: document.querySelector("#MaintainIDInput"),
    autoIDInput: document.querySelector("#autoIDInput"),
  };
  
const inputDeleteMaintain = { delMaintainIdInput: document.querySelector("#delMaintainIdInput") };


function registerMaintenance() {
  window.event.preventDefault()

  let send = {
    description: maintainRegister.maintenanceDescriptionInput.value,
    cost: maintainRegister.priceInput.value,
    vehicle_id: maintainRegister.automobileIDInput.value,
  };
console.log(send)
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: objBT.bearerToken,
    },
  };
  options.body = JSON.stringify(send);

  fetch("http://localhost:3000/cadastrarmanutencao", options)
    .then((response) => {
      if (response.status != 201) {
        if (response.status == 401) {
          alert("Sessão expirada. Acesse novamente");
          window.location.reload();
        } else {
          alert("Erro ao cadastrar manutenção. Tente novamente!");
          window.location.reload();
        }
      } else {
        return response.json();
      }
    })
    .then((resp) => {
      alert("Manutenção cadastrada com sucesso!");
      window.location.reload();
    })
    .catch((err) => console.error(err));
}