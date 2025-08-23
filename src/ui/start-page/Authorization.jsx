import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 


export function Authorization ({ SetViewPage }) {
  const [inputInfo, setInputInfo] = useState({
    login: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedLogin = localStorage.getItem('userLogin');
    const storedPassword = localStorage.getItem('userPassword');
    console.log(storedLogin);
    if (storedLogin || storedPassword) {
      fetch(`${import.meta.env.VITE_APP_BASE_USL_API}check_session/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
      body: JSON.stringify({login: storedLogin, password: storedPassword})
    })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.status_code === 200) {
        console.log("Вы успешно авторизовались", data)
        navigate('/files', { state: data.user[0], replace: false});
      }
    });
    }
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputInfo((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    fetch(`${import.meta.env.VITE_APP_BASE_USL_API}login/`, {
      method: "POST",
      body: JSON.stringify(inputInfo),
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      else {
        console.log(response);
        setErrorMsg("Неверный логин или пароль");
      }
    })
    .then((data) => {
      if (data) {
        console.log("Вы успешно авторизовались");
        console.log(data);

        localStorage.setItem('userLogin', inputInfo.login);
        localStorage.setItem('userPassword', inputInfo.password);

        navigate('/files', { state: data, replace: false }); 
      } 
    });
  };

  return (
    <div className="container-form">
      <form onSubmit={onSubmit} className="auth-form">
        <h2 className="head-form">Войти</h2>
        <div className="input-block">
          <input type="text" placeholder="Логин" name="login" onChange={onChange} className="input-form"/>
          <input type="password" placeholder="Пароль" name="password" onChange={onChange} className="input-form"/>
          <div>{errorMsg}</div>
        </div>
        <div className="buttons-block">
          <button type="submit" className="button-form submit">Войти</button>
          <button className="button--form" onClick={() => { SetViewPage("Registration") }}>Зарегестрироваться</button>
        </div>
      </form>
    </div>
  );
};
