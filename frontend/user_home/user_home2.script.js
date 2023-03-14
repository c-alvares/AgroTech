let p1 = document.querySelector('#buttons1 p');
let p2 = document.querySelector('#buttons1 p:nth-child(2)');
let p3 = document.querySelector('#buttons2 p');
let p4 = document.querySelector('#buttons2 p:nth-child(2)');
let p5 = document.querySelector('#buttons3 p');
let p6 = document.querySelector('#buttons3 p:nth-child(2)');

let close1 = document.querySelector('#close1');
let close2 = document.querySelector('#close2');
let close3 = document.querySelector('#close3');
let close4 = document.querySelector('#close4');
let close5 = document.querySelector('#close5');
let close6 = document.querySelector('#close6');

let t1 = document.querySelector('.t1');
let t2 = document.querySelector('.t2');
let t3 = document.querySelector('.t3');
let t4 = document.querySelector('.t4');
let t5 = document.querySelector('.t5');
let t6 = document.querySelector('.t6');


p1.addEventListener('click', () => {
  t1.classList.remove('model')
})

p2.addEventListener('click', () => {
  t2.classList.remove('model')
})

p3.addEventListener('click', () => {
  t3.classList.remove('model')
})

p4.addEventListener('click', () => {
  t4.classList.remove('model')
})

p5.addEventListener('click', () => {
  t5.classList.remove('model')
})

p6.addEventListener('click', () => {
  t6.classList.remove('model')
})


close1.addEventListener('click', () => {
  t1.classList.add('model')
})

close2.addEventListener('click', () => {
  t2.classList.add('model')
})

close3.addEventListener('click', () => {
  t3.classList.add('model')
})

close4.addEventListener('click', () => {
  t4.classList.add('model')
})

close5.addEventListener('click', () => {
  t5.classList.add('model')
})

close6.addEventListener('click', () => {
  t6.classList.add('model')
})