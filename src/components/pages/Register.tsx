import stylesRegister from "./Register.module.css";
import stylesForm from "./Form.module.css";
import { NavLink } from "react-router-dom";
import { Title } from "../title";

const Register = () => {
  return (
    <div className={stylesForm.form}>
      <Title />
      <div className={stylesRegister.register}>
        <h2 className={stylesRegister.registerH2}>Register</h2>
        <form className={stylesRegister.registerForm}>
          <label
            htmlFor="userName"
            className={stylesRegister.registerFormLabel}
          >
            User Name
          </label>
          <input
            className={stylesRegister.registerFormInput}
            type="text"
            id="userName"
            name="userName"
            placeholder="User Name"
          />
          <label
            htmlFor="userEmail"
            className={stylesRegister.registerFormLabel}
          >
            Email
          </label>
          <input
            className={stylesRegister.registerFormInput}
            type="email"
            id="userEmail"
            name="userEmail"
            placeholder="Email"
          />
          <label
            htmlFor="userPassword"
            className={stylesRegister.registerFormLabel}
          >
            Password
          </label>
          <input
            className={stylesRegister.registerFormInput}
            type="password"
            id="userPassword"
            name="userPassword"
            placeholder="Password"
          />
          <button className={stylesRegister.registerFormButton}>
            Register
          </button>
        </form>
        <NavLink to="/" className={stylesRegister.registerNavLink}>
          If you are registered access to TheWall
        </NavLink>
      </div>
    </div>
  );
};

export default Register;
