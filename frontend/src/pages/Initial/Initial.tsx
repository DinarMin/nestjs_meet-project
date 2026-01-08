import "./initial.css";

export function Initial() {
  return (
    <>
    <h1>Welcome video-chat</h1>
      <div className="auth-container">
        <form className="auth-form">
          <h2 className="auth-title">Войти в аккаунт</h2>
          <p className="auth-subtitle">Введите ваши данные для доступа</p>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="name@company.com"
              required
            />
          </div>

          <div className="form-group">
            <div className="label-wrapper">
              <label htmlFor="password">Пароль</label>
              <a href="/forgot" className="forgot-link">
                Забыли?
              </a>
            </div>
            <div className="password-input-wrapper">
              <input
                id="password"
                name="password"
                placeholder="••••••••"
                required
              />
              <button type="button" className="toggle-password"></button>
            </div>
          </div>

          <button type="submit" className="submit-btn" >
            Войти
          </button>

          <p className="auth-footer">
            Нет аккаунта? <a href="/signup">Создать профиль</a>
          </p>
        </form>
      </div>
    </>
  );
}
