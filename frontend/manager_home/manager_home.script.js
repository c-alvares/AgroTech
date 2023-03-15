let h1 = document.querySelector('#buttons4 p');
let h2 = document.querySelector('#buttons4 p:nth-child(2)');

h1.addEventListener('click', () => {
    window.location.href = './control_panel/register_page.html'
})
  
h2.addEventListener('click', () => {
    window.location.href = '../dashboard/dashboard.html'
})