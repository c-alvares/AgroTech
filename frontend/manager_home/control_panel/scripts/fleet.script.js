const vehicleRegister = {
  vehicleInput: document.querySelector("#vehicleInput"),
  plateInput: document.querySelector("#plateInput"),
};

const vehicleUpdate = {
  vehicleIdInput: document.querySelector("#vehicleIdInput"),
  typeUpInput: document.querySelector("#typeUpInput"),
};

const InputAutoAvailabilityUpdate = {
  availableVehicleIdInput: document.querySelector("#availableVehicleIdInput"),
  availabilityVehicleInput: document.querySelector("#availabilityVehicleInput"),
};

const inputDeleteAuto = { delAutoIdInput: document.querySelector("#delAutoIdInput") };


function registerVehicle() {
  window.event.preventDefault()

  let send = {
    type: vehicleRegister.vehicleInput.value,
    plate: vehicleRegister.plateInput.value,
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: objBT.bearerToken,
    },
  };
  options.body = JSON.stringify(send);

  fetch("http://localhost:3000/cadastrarveiculo", options)
    .then((response) => {
      if (response.status != 201) {
        if (response.status == 401) {
          alert("Sessão expirada. Acesse novamente");
          window.location.reload();
        } else {
          alert("Erro ao cadastrar veículo. Tente novamente!");
          window.location.reload();
        }
      } else {
        return response.json();
      }
    })
    .then((resp) => {
      alert("Veículo cadastrado com sucesso!");
      window.location.reload();
    })
    .catch((err) => console.error(err));
}


function updateVehicle() {
  window.event.preventDefault()

  let send = {
    type: vehicleUpdate.typeUpInput.value,
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
    "http://localhost:3000/atualizartipo/" + vehicleUpdate.vehicleIdInput.value,
    options
  )
    .then((response) => {
      if (response.status != 200) {
        if (response.status == 401) {
          alert("Sessão expirada. Acesse novamente");
          window.location.reload();
        } else {
          alert("Erro ao atualizar tipo de veículo. Tente novamente!");
          window.location.reload();
        }
      } else {
        return response.json();
      }
    })
    .then((resp) => {
      alert("Tipo de veículo atualizado com sucesso!");
      window.location.reload();
    })
    .catch((err) => console.error(err));
}


function updateVehicleAvailability() {
  window.event.preventDefault()
  
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: objBT.bearerToken,
    },
    body: `{ "availability": ${InputAutoAvailabilityUpdate.availabilityVehicleInput.value}}`,
  };

  fetch("http://localhost:3000/alterardisponibilidadeveiculo/" + InputAutoAvailabilityUpdate.availableVehicleIdInput.value, options)
    .then((response) => {
      if (response.status != 200) {
        if (response.status == 401) {
          alert("Sessão expirada. Acesse novamente");
          window.location.reload();
        } else {
          alert("Erro ao alterar disponibilidade. Tente novamente!");
          window.location.reload();
        }
      } else {
        return response.json();
      }
    })
    .then((resp) => {
      alert("Disponibilidade do veículo atualizada com sucesso!");
      window.location.reload();
    })
    .catch((err) => console.error(err));
}


function deleteAuto() {
  window.event.preventDefault()
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: objBT.bearerToken
    },
  };
  
  fetch('http://localhost:3000/excluirveiculo/' + inputDeleteAuto.delAutoIdInput.value, options)
  .then((response) => {
    if (response.status != 200) {
      if (response.status == 401) {
        alert("Sessão expirada. Acesse novamente");
        window.location.reload();
      } else {
        alert("Erro ao excluir veículo. Tente novamente!");
        window.location.reload();
      }
    } else {
      return response.json();
    }
  })
  .then((resp) => {
    alert("Veículo excluído com sucesso!");
    window.location.reload();
  })
  .catch((err) => console.error(err));
}