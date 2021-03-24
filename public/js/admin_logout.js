

async function adminLogoutClickHandler() {

  const response = await fetch('/admin/logout', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' }
  });

  if (response.ok) {
    document.location.replace('/admin/login');
  } else {
    alert(response.statusText);
  }
}

document.querySelector('#adminLogout').addEventListener('click', adminLogoutClickHandler);
