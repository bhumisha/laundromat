async function createOrderFormHandler(event) {
  event.preventDefault();

  const order_status = "Pending";
  const order_date = document.querySelector('#srvcDate').value.trim();
  const order_type = document.querySelector('#serviceSelect').value
  const bags = document.querySelector('#bagCount').value
  const comments = document.querySelector('#comment').value

  const response = await fetch(`/api/orders/`, {
    method: 'POST',
    body: JSON.stringify({
      order_date,
      order_type,
      bags,
      order_status,
      comments
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    document.location.replace('/cust/');
  } else {
    alert(response.statusText);
  }
}


async function updateCustAddressFormHandler(event) {
  event.preventDefault();

  let street_address = document.querySelector('#streetAdd').value.trim();
  let city = document.querySelector('#city').value.trim();
  let state = document.querySelector('#state').value.trim();
  let zipcode = document.querySelector('#zip').value.trim();


  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];
  

  const response = await fetch(`/api/cust/`, {
  method: 'put',
  body: JSON.stringify({
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

document.querySelector('.updateAddressForm').addEventListener('submit', updateCustAddressFormHandler);


document.querySelector('.createOrderForm').addEventListener('submit', createOrderFormHandler);
