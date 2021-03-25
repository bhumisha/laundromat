

async function editFormHandler(id,order_status) {
  event.preventDefault();
  
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


let next_step = word => {
  switch (word) {
    case 'Pending':
      word = 'Accepted'
      break;
    case 'Accepted':
      word = 'Cleaning'
      break;
    case 'Cleaning':
      word = 'Delivering'
      break;
    case 'Delivering':
      word = 'Complete'
      break;
      case 'Complete':
      word = 'Pending'
      break;
  }

  return word;
},


changeStatus = id => {
  console.log(id);
  let val = document.getElementById(id).innerHTML;
  val = next_step(val);
  editFormHandler(id, val);
  return;
};
