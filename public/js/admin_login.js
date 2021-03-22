async function loginaFormHandler(event) {
    event.preventDefault();
  
    const email = document.querySelector('.loginAdminEmail').value.trim();
    const password = document.querySelector('.loginAdminPw').value.trim();
    
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
        document.location.replace('/admin/orders/'); //IT will replace with ADmin - Laundromat's Orders.
        //---------------REPLACED 'api/orders' with 'admin/orders'-----------------
      } else {
        alert(response.statusText);
      }
    }
  }
  document.querySelector('.login-form').addEventListener('submit', loginaFormHandler);
  
  
  