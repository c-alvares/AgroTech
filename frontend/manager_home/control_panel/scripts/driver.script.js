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

  function registerDriver() {
    window.event.preventDefault()
  
    let send = {
      name: driverRegister.driverInput.value,
      licence: driverRegister.licenceInput.value,
    };
  
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: objBT.bearerToken,
      },
    };
    options.body = JSON.stringify(send);
  
    fetch("http://localhost:3000/cadastrarmotorista", options)
      .then((response) => {
        if (response.status != 201) {
          if (response.status == 401) {
            alert("Sessão expirada. Acesse novamente");
          } else {
            console.log(response.status);
            alert("Erro ao cadastrar motorista. Tente novamente!");
          }
        } else {
          return response.json();
        }
      })
      .then((resp) => {
        alert("Motorista cadastrado com sucesso!");
        window.location.reload();
      })
      .catch((err) => console.error(err));
  }
  
  function updateDriver() {
    window.event.preventDefault()
  
    let send = {
      name: driverUpdate.driverUpInput.value,
      licence: driverUpdate.licenceUpInput.value,
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
      "http://localhost:3000/atualizardados/" + driverUpdate.driverIdInput.value,
      options
    )
      .then((response) => {
        if (response.status != 200) {
          if (response.status == 401) {
            alert("Sessão expirada. Acesse novamente");
          } else {
            console.log(response.status);
            alert("Erro ao atualizar dados. Tente novamente!");
          }
        } else {
          return response.json();
        }
      })
      .then((resp) => {
        alert("Dados cadastrais atualizados com sucesso!");
        window.location.reload();
      })
      .catch((err) => console.error(err));
  }

function updateAvailability() {
  window.event.preventDefault()
  
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: objBT.bearerToken,
      },
      body: `{ "availability": ${inputAvailabilityUpdate.availabilityInput.value}}`,
    };
  
    fetch("http://localhost:3000/alterardisponibilidade/" + inputAvailabilityUpdate.availableDriverIdInput.value, options)
      .then((response) => {
        if (response.status != 200) {
          if (response.status == 401) {
            alert("Sessão expirada. Acesse novamente");
          } else {
            alert("Erro ao alterar disponibilidade. Tente novamente!");
          }
        } else {
          return response.json();
        }
      })
      .then((resp) => {
        alert("Disponibilidade atualizada com sucesso!");
        window.location.reload();
      })
      .catch((err) => console.error(err));
}
    