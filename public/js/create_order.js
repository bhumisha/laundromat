async function createOrderFormHandler(event) {
  event.preventDefault();

  const order_status = "pick" //document.querySelector('input[name="post-title"]').value.trim();
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
document.querySelector('.createOrderForm').addEventListener('submit', createOrderFormHandler);
