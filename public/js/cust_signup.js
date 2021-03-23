async function signUpFormHandler(event) {
  event.preventDefault();

  let email = document.querySelector('.signUpEmail').value.trim();
  let password = document.querySelector('.signUpPw').value.trim();
  let street_address = document.querySelector('.signUpStreetAdd').value.trim();
  let city = document.querySelector('.signUpCity').value.trim();
  let state = document.querySelector('.signUpState').value.trim();
  let zipcode = document.querySelector('.signUpZip').value.trim();

  if (!email) {
    email = document.querySelector('.signUpEmailM').value.trim();
    password = document.querySelector('.signUpPwM').value.trim();
    street_address = document.querySelector('.signUpStreetAddM').value.trim();
    city = document.querySelector('.signUpCityM').value.trim();
    state = document.querySelector('.signUpStateM').value.trim();
    zipcode = document.querySelector('.signUpZipM').value.trim();
  }

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
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      document.location.replace('/cust'); //IT will display - Customers's Orders.
    } else {
      alert(response.statusText);
    }
  }
}
document.querySelector('.signUpForm').addEventListener('submit', signUpFormHandler);
document.querySelector('.signUpFormM').addEventListener('submit', signUpFormHandler);