let userInput = document.querySelector("#userInput");
let passwordInput = document.querySelector("#passwordInput");
let loginBtn = document.querySelector("#loginBtn");

function login() {
    let send = {
      username: userInput.value,
      password: passwordInput.value,
    };
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    options.body = JSON.stringify(send);

    fetch("http://localhost:3000/acessar", options)
        .then((response) => {
            if(response.status != 200) {
                if(response.status == 404) {
                    alert("Usuário ou senha incorretos")
                } else {
                    alert("Erro interno, tente novamente")
                }
            }else {
            return response.json()
            }
        })        
        .then((resp) => {
            localStorage.setItem('user', JSON.stringify(resp))
            if(resp.management != 0){
                window.location.href = '../manager_home/manager_home.html'
            }else {
                window.location.href = '../user_home/user_home.html'
            }
        })
        .catch((err) => console.error(err));
}