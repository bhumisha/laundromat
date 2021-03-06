async function loginFormHandler(event) {
  event.preventDefault();


  let email = document.querySelector('.loginEmail').value.trim();
  let password = document.querySelector('.loginPw').value.trim();
  if (!email) {
    email = document.querySelector('.loginEmail2').value.trim();
    password = document.querySelector('.loginPw2').value.trim();
  }
  if (email && password) {
    const response = await fetch('api/cust/login', {
      method: 'post',
      body: JSON.stringify({
        email,
        password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      document.location.replace('/cust/'); //IT will replace with ADmin - Laundromat's Orders.
    } else {
      alert(response.statusText);
    }
  }
}

document.querySelector('.loginForm').addEventListener('submit', loginFormHandler);
document.querySelector('.loginForm2').addEventListener('submit', loginFormHandler);