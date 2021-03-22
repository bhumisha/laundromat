async function createOrderFormHandler(event) {
  event.preventDefault();

  const order_status = "pick" //document.querySelector('input[name="post-title"]').value.trim();
  const order_date = document.querySelector('#srvcDate').value.trim();
  const order_type = document.querySelector('#serviceSelect').value.trim();
  console.log(order_status, '----', order_date, '-----', order_type);


  // const id = window.location.toString().split('/')[
  //   window.location.toString().split('/').length - 1
  // ];

  const response = await fetch(`/api/orders/`, {
    method: 'POST',
    body: JSON.stringify({
      order_date,
      order_type,
      order_status
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    document.location.replace('/api/orders/');
  } else {
    alert(response.statusText);
  }
}

document.querySelector('.createOrderForm').addEventListener('submit', createOrderFormHandler);