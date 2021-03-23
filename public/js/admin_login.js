async function loginaFormHandler(event) {
  event.preventDefault();

  let email = document.querySelector('.loginAdminEmail').value.trim();
  let password = document.querySelector('.loginAdminPw').value.trim();

  if (!email) {
    email = document.querySelector('.loginAdminEmailM').value.trim();
    password = document.querySelector('.loginAdminPwM').value.trim();
  }

  if (email && password) {
    const response = await fetch('/api/admin/login', {
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
      document.location.replace('/admin/orders/'); //IT will replace with ADmin - Laundromat's Orders.
      //---------------REPLACED 'api/orders' with 'admin/orders'-----------------
    } else {
      alert(response.statusText);
    }
  }
}
document.querySelector('.login-form').addEventListener('submit', loginaFormHandler);
document.querySelector('.login-formM').addEventListener('submit', loginaFormHandler);