const objBT = {
  bearerToken: "Bearer " + JSON.parse(localStorage.getItem("user")).token,
};

let b1 = document.querySelector('#buttons1 p');
let b2 = document.querySelector('#buttons1 p:nth-child(2)');
let b3 = document.querySelector('#buttons2 p');
let b4 = document.querySelector('#buttons2 p:nth-child(2)');
let b5 = document.querySelector('#buttons3 p');

let h1 = document.querySelector("#buttons3 p:nth-child(2)");

let close1 = document.querySelector('#closeForm1');
let close2 = document.querySelector('#closeForm2');
let close3 = document.querySelector('#closeForm3');
let close4 = document.querySelector('#closeForm4');
let close5 = document.querySelector('#closeForm5');

let f1 = document.querySelector('.f1');
let f2 = document.querySelector('.f2');
let f3 = document.querySelector('.f3');
let f4 = document.querySelector('.f4');
let f5 = document.querySelector('.f5');


h1.addEventListener("click", () => {
    window.location.href = "../dashboard/dashboard.html";
  });


b1.addEventListener('click', () => {
  f2.classList.remove('model')
})

b2.addEventListener('click', () => {
  f3.classList.remove('model')
})

b3.addEventListener('click', () => {
  f4.classList.remove('model')
})

b4.addEventListener('click', () => {
  f5.classList.remove('model')
})

b5.addEventListener('click', () => {
  f1.classList.remove('model')
})


close1.addEventListener('click', () => {
  f1.classList.add('model')
})

close2.addEventListener('click', () => {
  f2.classList.add('model')
})

close3.addEventListener('click', () => {
  f3.classList.add('model')
})

close4.addEventListener('click', () => {
  f4.classList.add('model')
})

close5.addEventListener('click', () => {
  f5.classList.add('model')
})