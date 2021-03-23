
async function editFormHandler(event) {
  event.preventDefault();
  

  const id = document.querySelector('.updateOrder').name;
  const order_status = document.querySelector('.updateOrder').id;
  
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

document.querySelector('.updateOrder').addEventListener('click', editFormHandler);
