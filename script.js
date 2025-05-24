 // Проверяем, не истёк ли сохранённый токен
  if (name && tokenExp && Date.now() < tokenExp * 1000) {
    document.getElementById('welcome')?.textContent = `Вы вошли как ${name}`;
  } else {
    console.warn("⚠️ Токен истёк или пользователь не авторизован. Необходима повторная авторизация.");
    // Здесь можно добавить код для перенаправления пользователя на страницу входа,
    // например, window.location.href = '/login';
  }
});
Рекомендации по улучшению
Безопасность токена: Убедитесь, что ваш токен хранится безопасно. Если это возможно, избегайте использования localStorage, так как он подвержен атакам XSS. Рассмотрите возможность использования других методов хранения или ограничения доступа к токену.
Обработка ошибок пользовательского интерфейса: В вашем коде обрабатываются ошибки при парсинге токена, но вывод ошибок в консоль может быть недостаточен для конечного пользователя. Рассмотрите добавление визуальной информации для пользователя, чтобы уведомить его о проблемах с входом.
Чистка старых данных: При событии 'DOMContentLoaded' вы можете добавить логику для удаления устаревших данных из localStorage, если пользователь не был авторизован и токен истек. Это обеспечит чистоту вашего хранилища.
Корректная работа с atob: Использование atob может вызвать проблемы с кодировками не-UTF-8. Рассмотрите возможность использования библиотеки, которая обеспечивает безопасное декодирование токенов, если ваш токен содержит не стандартные символы.
Логирование: Хотя вы уже логируете ошибки, может быть полезно добавить больше контекста для каждого лога, например, информацию о текущем состоянии приложения или специфических действиях пользователя, чтобы упростить отладку.
Тестирование: Убедитесь, что вы протестировали вашу реализацию на различных браузерах, чтобы наблюдать поведение локального хранилища и управления токенами. Иногда функции могут некорректно работать на разных платформах.
Пример доработанного кода с учётом рекомендаций
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
    alert("При обработке вашего входа возникла ошибка. Пожалуйста, попробуйте ещё раз.");
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

  if (name && tokenExp && Date.now() < tokenExp * 1000) {
    document.getElementById('welcome')?.textContent = `Вы вошли как ${name}`;
  } else {
    console.warn("⚠️ Токен истёк или пользователь не авторизован. Необходима повторная авторизация.");
    localStorage.removeItem('username');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('tokenExp');
    // Здесь можно добавить код для перенаправления пользователя на страницу входа
    // window.location.href = '/login';
  }
});
