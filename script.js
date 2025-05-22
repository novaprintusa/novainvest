// Показываем контент в "Кабинете"
window.addEventListener('DOMContentLoaded', () => {
  const dashboard = document.getElementById('dashboardContent');
  if (!dashboard) return;

  const username = localStorage.getItem('username');

  if (username) {
    dashboard.innerHTML = `
      <h2>Добро пожаловать, ${username}!</h2>
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
});
