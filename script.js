function handleCredentialResponse(response) {
  const data = parseJwt(response.credential);
  localStorage.setItem('username', data.name);
  document.getElementById('welcome')?.textContent = `Вы вошли как ${data.name}`;
  console.log("✅ Пользователь вошёл:", data);
}

function parseJwt(token) {
  const base64 = decodeURIComponent(
  atob(base64Url)
    .split('')
    .map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    })
    .join('')
);
  return JSON.parse(base64);
}

// При загрузке страницы — показать имя пользователя, если он вошёл
window.addEventListener('DOMContentLoaded', () => {
  const name = localStorage.getItem('username');
  if (name) {
    document.getElementById('welcome')?.textContent = `Вы вошли как ${name}`;
  }
});
