async function loginFormHandler(event) {
    event.preventDefault();
  
    const email = document.querySelector('#loginEmail').value.trim();
    const password = document.querySelector('#loginPw').value.trim();
    debugger;
    if (email && password) {
      const response = await fetch('api/cust/login', {
        method: 'post',
        body: JSON.stringify({
            email,
            password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) {
        document.location.replace('/api/orders/custOrders'); //IT will replace with ADmin - Laundromat's Orders.
      } else {
        alert(response.statusText);
      }
    }
  }
  document.querySelector('#loginForm').addEventListener('submit', loginFormHandler);
  
  
  