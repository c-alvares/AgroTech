const objBT = {
  bearerToken: "Bearer " + JSON.parse(localStorage.getItem("user")).token,
};

const inputsRegister = {
  nameInput: document.querySelector("#nameInput"),
  usernameInput: document.querySelector("#usernameInput"),
  passwordInput: document.querySelector("#passwordInput"),
};
const inputsUpdate = {
  idInput: document.querySelector(".idInput"),
  updateUsernameInput: document.querySelector("#updateUsernameInput"),
  updatePasswordInput: document.querySelector("#updatePasswordInput"),
};

function registerUser() {
  let send = {
    name: inputsRegister.nameInput.value,
    username: inputsRegister.usernameInput.value,
    password: inputsRegister.passwordInput.value,
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: objBT.bearerToken,
    },
  };
  options.body = JSON.stringify(send);

  fetch("http://localhost:3000/cadastrarusuario", options)
    .then((response) => {
      if (response.status != 201) {
        if(response.status == 404) {
          alert("Sessão expirada. Acesse novamente")
        }else {
          console.log(response.status);
          alert("Erro ao cadastrar usuário. Tente novamente!");
        }
      } else {
        return response.json();
      }
    })
    .then((resp) => {
      alert("Usuário cadastrado com sucesso!");
      window.location.reload();
    })
    .catch((err) => console.error(err));
}

function updateUser() {
  let send = {
    username: inputsUpdate.updateUsernameInput.value,
    password: inputsUpdate.updatePasswordInput.value,
  };

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: objBT.bearerToken,
    },
  };
  options.body = JSON.stringify(send);

  fetch("http://localhost:3000/atualizarsenha/" + inputsUpdate.idInput.value, options)
    .then((response) => {
      if (response.status != 200) {
        if(response.status == 404) {
          alert("Sessão expirada. Acesse novamente")
        }else {
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
