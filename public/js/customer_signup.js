async function signUpFormHandler(event) {
    event.preventDefault();
  
    const email = document.querySelector('#signUpEmail').value.trim();
    const password = document.querySelector('#signUpPw').value.trim();
    const street_address = document.querySelector('#signUpStreetAdd').value.trim();
    const city = document.querySelector('#signUpCity').value.trim();
    const state = document.querySelector('#signUpState').value.trim();
    const zipcode = document.querySelector('#signUpZip').value.trim();
    
    if (email && password) {
      const response = await fetch('/api/cust/', {
        method: 'post',
        body: JSON.stringify({
            email,
            password,
            street_address,
            city,
            state,
            zipcode
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) {
        document.location.replace('/api/orders/'); //IT will display - Customers's Orders.
      } else {
        alert(response.statusText);
      }
    }
  }
  document.querySelector('#signUpForm').addEventListener('submit', signUpFormHandler);
  
  
  