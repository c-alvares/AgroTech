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
    cost: Number(maintainRegister.priceInput.value),
    vehicle_id: Number(maintainRegister.automobileIDInput.value),
  };
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


function updateMaintenance() {
  window.event.preventDefault()

  let send = {
    description: maintainUpdate.mainDescriptionInput.value,
    cost: Number(maintainUpdate.costInput.value)
  };

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: objBT.bearerToken,
    },
  };
  options.body = JSON.stringify(send);

  fetch(
    "http://localhost:3000/atualizartipomanutencao/" + maintainUpdate.maintIDInput.value,
    options
  )
    .then((response) => {
      if (response.status != 200) {
        if (response.status == 401) {
          alert("Sessão expirada. Acesse novamente");
          window.location.reload();
        } else {
          alert("Erro ao atualizar manutenção. Tente novamente!");
          window.location.reload();
        }
      } else {
        return response.json();
      }
    })
    .then((resp) => {
      alert("Manutenção atualizado com sucesso!");
      window.location.reload();
    })
    .catch((err) => console.error(err));
}


function finishMaintenance() {
  window.event.preventDefault()
  
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: objBT.bearerToken,
    },
  };

  fetch("http://localhost:3000/finalizarmanutencao/" + (InputFinishMaintain.MaintainIDInput.value + "/" ) + InputFinishMaintain.autoIDInput.value, options)
    .then((response) => {
      console.log("http://localhost:3000/finalizarmanutencao/" + (InputFinishMaintain.MaintainIDInput.value + "/" ) + InputFinishMaintain.autoIDInput.value)
      if (response.status != 200) {
        if (response.status == 401) {
          alert("Sessão expirada. Acesse novamente");
          window.location.reload();
        } else {
          alert("Erro ao finalizar manutenção. Tente novamente!");
          window.location.reload();
        }
      } else {
        return response.json();
      }
    })
    .then((resp) => {
      alert("Manutenção finalizada com sucesso!");
      window.location.reload();
    })
    .catch((err) => console.error(err));
}