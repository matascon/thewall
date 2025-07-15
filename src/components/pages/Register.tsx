import stylesRegister from "./Register.module.css";
import stylesForm from "./Form.module.css";
import { NavLink } from "react-router-dom";
import { Title } from "../title";
import { useState } from "react";

interface RegisterData {
  userName: string;
  email: string;
  passwd: string;
}

const Register = () => {
  const [registerData, setRegisterData] = useState<RegisterData>({
    userName: "",
    email: "",
    passwd: "",
  });

  const [errorForm, setErrorForm] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (registerData.userName && registerData.email && registerData.passwd) {
      console.log("Todo correcto");
      setErrorForm(null);
    } else {
      setErrorForm("All fields are required");
    }
  };

  return (
    <div className={stylesForm.form}>
      <Title />
      <div className={stylesRegister.register}>
        <h2 className={stylesRegister.registerH2}>Register</h2>
        <form className={stylesRegister.registerForm} onSubmit={handleSubmit}>
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
            onChange={handleChange}
          />
          <label htmlFor="email" className={stylesRegister.registerFormLabel}>
            Email
          </label>
          <input
            className={stylesRegister.registerFormInput}
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />
          <label htmlFor="passwd" className={stylesRegister.registerFormLabel}>
            Password
          </label>
          <input
            className={stylesRegister.registerFormInput}
            type="password"
            id="passwd"
            name="passwd"
            placeholder="Password"
            onChange={handleChange}
          />
          <button type="submit" className={stylesRegister.registerFormButton}>
            Register
          </button>
        </form>
        {errorForm && (
          <p className={stylesRegister.registerError}>{errorForm}</p>
        )}
        <NavLink to="/" className={stylesRegister.registerNavLink}>
          If you are registered access to TheWall
        </NavLink>
      </div>
    </div>
  );
};

export default Register;
