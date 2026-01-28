import "./auth.css";

import { useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

interface AuthData {
  username?: string;
  email: string;
  password: string;
}

export function Auth() {
  const [searchParams] = useSearchParams();
  const modeFromUrl = searchParams.get("mode") === "signup" ? false : true;
  const [Login] = useState(modeFromUrl);

  const [formData, setFormData] = useState<Partial<AuthData>>({});

  const config = Login
    ? {
        title: "Авторизация",
        buttonName: "Авторизоваться",
        endpoint: "auth/signin",
        additionalText: "Нет аккаунта?",
        additionalButton: "Зарегистрируйтесь!",
        additionalUrl: "/auth?mode=signup",
      }
    : {
        title: "Регистрация",
        buttonName: "Зарегистрироваться",
        endpoint: "auth/signup",
        additionalText: "Есть аккаунт?",
        additionalButton: "Авторизуйтесь!",
        additionalUrl: "/auth?mode=signin",
      };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const sendDataServer = (data: AuthData) => {
    axios
      .post(`http://localhost:3000/${config.endpoint}`, data, {
        withCredentials: true,
      })
      .then((response) => {
        console.log('Access')
      })
      .catch((error) => console.error(error));
  };
  const handleSumbit = async (e) => {
    e.preventDefault();
    await sendDataServer(formData);
  };
  return (
    <>
      <h1>Welcome video-chat</h1>
      <div className="auth-container">
        <form className="auth-form" onSubmit={handleSumbit}>
          <h2 className="auth-title">{config.title}</h2>
          <p className="auth-subtitle">Введите ваши данные</p>

          {!Login && (
            <div className="form-group">
              <div className="label-wrapper">
                <label htmlFor="text">Имя</label>
              </div>
              <input
                id="username"
                type="text"
                name="username"
                placeholder="Имя"
                required
                onChange={handleChange}
                value={formData.username}
              />
            </div>
          )}

          <div className="form-group">
            <div className="label-wrapper">
              <label htmlFor="email">Email</label>
            </div>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="name@company.com"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <div className="label-wrapper">
              <label htmlFor="password">Пароль</label>
            </div>
            <div className="password-input-wrapper">
              <input
                id="password"
                name="password"
                placeholder="••••••••"
                required
                value={formData.password}
                onChange={handleChange}
              />
              <button type="button" className="toggle-password"></button>
            </div>
          </div>

          <button type="submit" className="submit-btn">
            {config.buttonName}
          </button>

          <p className="auth-footer">
            {config.additionalText}
            <a href={config.additionalUrl}> {config.additionalButton} </a>
          </p>
        </form>
      </div>
    </>
  );
}
