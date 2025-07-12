import stylesLogin from "./Login.module.css";
import stylesForm from "./Form.module.css";
import { NavLink } from "react-router-dom";
import { Title } from "../title";

const Login = () => {
  return (
    <div className={stylesForm.form}>
      <Title />
      <div className={stylesLogin.login}>
        <h2 className={stylesLogin.loginH2}>Login</h2>
        <form className={stylesLogin.loginForm}>
          <label htmlFor="userName" className={stylesLogin.loginFormLabel}>
            Name
          </label>
          <input
            className={stylesLogin.loginFormInput}
            type="text"
            id="userName"
            name="userName"
            placeholder="User Name"
          />
          <label htmlFor="userPassword" className={stylesLogin.loginFormLabel}>
            Password
          </label>
          <input
            className={stylesLogin.loginFormInput}
            type="password"
            id="userPassword"
            name="userPassword"
            placeholder="Password"
          />
          <button className={stylesLogin.loginFormButton}>Login</button>
        </form>
        <NavLink to="/Register" className={stylesLogin.loginNavLink}>
          Do not you have an account?, create it
        </NavLink>
      </div>
    </div>
  );
};

export default Login;
