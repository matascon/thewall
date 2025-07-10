import styles from "./login.module.css";
import { NavLink } from "react-router-dom";
import { Title } from "../title";

const Login = () => {
  return (
    <div>
      <Title />
      <div>
        <h2>Login</h2>
        <form>
          <label htmlFor="userName">Name</label>
          <input
            type="text"
            id="userName"
            name="userName"
            placeholder="User Name"
          />
          <label htmlFor="userPassword">Password</label>
          <input
            type="password"
            id="userPassword"
            name="userPassword"
            placeholder="Password"
          />
          <button>Login</button>
        </form>
        <NavLink to="/Register">Do not you have an account?, create it</NavLink>
      </div>
    </div>
  );
};

export default Login;
