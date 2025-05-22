function handleCredentialResponse(response) {
  const data = parseJwt(response.credential);
  localStorage.setItem('username', data.name);
  document.getElementById('welcome')?.textContent = `Вы вошли как ${data.name}`;
  console.log("Пользователь:", data);
}

function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = decodeURIComponent(atob(base64Url).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  return JSON.parse(base64);
}

// При загрузке — показать имя на главной, если уже вошёл
window.addEventListener('DOMContentLoaded', () => {
  const name = localStorage.getItem('username');
  if (name) {
    document.getElementById('welcome')?.textContent = `Вы вошли как ${name}`;
  }

  const dashboard = document.getElementById('dashboardContent');
  if (dashboard) {
    if (name) {
      dashboard.innerHTML = `
        <h2>Добро пожаловать, ${name}!</h2>
        <p>Ваш текущий баланс: <strong>$10,000</strong></p>
        <h3>Ваши активы:</h3>
        <ul style="list-style: none; padding: 0;">
          <li>📈 Акции: <strong>5 × AAPL</strong></li>
          <li>💸 Криптовалюта: <strong>0.12 BTC</strong></li>
          <li>📊 ETF: <strong>3 × VTI</strong></li>
        </ul>
      `;
    } else {
      dashboard.innerHTML = `
        <h2>Личный кабинет</h2>
        <p>Чтобы увидеть данные, пожалуйста, войдите на <a href="index.html">главной странице</a>.</p>
      `;
    }
  }
});
