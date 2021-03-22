async function editFormHandler(event) {
  event.preventDefault();

  const order_status = document.querySelector('select[name="orderStatus"]').value.trim();
  
  
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];
  
  const response = await fetch(`/api/orders/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      order_status
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    document.location.replace('/admin/orders/');
  } else {
    alert(response.statusText);
  }
}

document.querySelector('#btnOrderStatusUpdate').addEventListener('click', editFormHandler);
