import styles from "./register.module.css";
import { NavLink } from "react-router-dom";
import { Title } from "../title";

const Register = () => {
  return (
    <div>
      <Title />
      <div>
        <h2>Register</h2>
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
        <NavLink to="/">If you are registered access to TheWall</NavLink>
      </div>
    </div>
  );
};

export default Register;
