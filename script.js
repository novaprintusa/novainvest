function handleCredentialResponse(response) {
  try {
    const data = parseJwt(response.credential);
    
    // Проверка срока действия токена
    if (data.exp && Date.now() >= data.exp * 1000) {
      console.warn("⚠️ Токен истёк");
      return;
    }
    
    localStorage.setItem('username', data.name);
    localStorage.setItem('userEmail', data.email);
    localStorage.setItem('tokenExp', data.exp);
    
    document.getElementById('welcome')?.textContent = `Вы вошли как ${data.name}`;
    console.log("✅ Пользователь вошёл:", data);
  } catch (error) {
    console.error("❌ Ошибка при обработке токена:", error);
  }
}

function parseJwt(token) {
  try {
    if (!token || typeof token !== 'string') {
      throw new Error('Невалидный токен');
    }
    
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Неправильный формат JWT');
    }
    
    const base64Url = parts[1];
    const base64 = decodeURIComponent(
      atob(base64Url)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    
    return JSON.parse(base64);
  } catch (error) {
    console.error("❌ Ошибка парсинга JWT:", error);
    throw error;
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const name = localStorage.getItem('username');
  const tokenExp = localStorage.getItem('tokenExp');
  
  // Проверяем не истёк ли сохранённый токен
  if (name && tokenExp && Date.now() < tokenExp * 1000) {
    document.getElementById('welcome')?.textContent = `Вы вошли как ${name}`;
  } else if (tokenExp) {
    // Очищаем устаревшие данные
    localStorage.removeItem('username');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('tokenExp');
  }
});
