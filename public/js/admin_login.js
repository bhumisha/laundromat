async function loginFormHandler(event) {
    event.preventDefault();
  
    const email = document.querySelector('#loginAdminEmail').value.trim();
    const password = document.querySelector('#loginAdminPw').value.trim();
    debugger;
    if (email && password) {
      const response = await fetch('/api/admin/login', {
        method: 'post',
        body: JSON.stringify({
            email,
            password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) {
        document.location.replace('/api/orders/'); //IT will replace with ADmin - Laundromat's Orders.
      } else {
        alert(response.statusText);
      }
    }
  }
  document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
  
  
  