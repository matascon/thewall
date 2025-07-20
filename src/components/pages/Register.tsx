import stylesRegister from "./Register.module.css";
import stylesForm from "./Form.module.css";
import { Navigate, NavLink } from "react-router-dom";
import { Title } from "../title";
import { useState } from "react";
import useFetch from "../hooks/useFetch";

interface RegisterData {
  userName: string;
  email: string;
  passwd: string;
}

type ValidateUser = (fetchApi: FetchApi, userName: string) => Promise<boolean>;
type RegisterUser = (
  fetchApi: FetchApi,
  registerData: RegisterData
) => Promise<boolean>;
type FetchOptions<T> = RequestInit & { body?: T };
type FetchApi = <T>(
  url: string,
  fetchOptions?: FetchOptions<T>
) => Promise<T | void>;

const validateUser: ValidateUser = async (fetchApi, userName) => {
  const userNameToValidate = {
    userName: userName,
  };

  const result = await fetchApi("http://localhost:8079/api/user/validateUser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userNameToValidate),
  });

  return result ? true : false;
};

const registerUser: RegisterUser = async (fetchApi, registerData) => {
  const userToRegister = {
    userName: registerData.userName,
    email: registerData.email,
    passwd: registerData.passwd,
  };

  const result = await fetchApi("http://localhost:8079/api/user/registerUser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userToRegister),
  });

  return result ? true : false;
};

const Register = () => {
  const [registerData, setRegisterData] = useState<RegisterData>({
    userName: "",
    email: "",
    passwd: "",
  });
  const [errorForm, setErrorForm] = useState<string | null>(null);
  const [successForm, setSuccessForm] = useState<string | null>(null);
  const [redirect, setRedirect] = useState<boolean>(false);
  const { loading, error, fetchApi } = useFetch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (registerData.userName && registerData.email && registerData.passwd) {
      setErrorForm(null);
      const userExist = await validateUser(fetchApi, registerData.userName);
      if (error) {
        setErrorForm("There was a problem to register the user, try later");
      } else {
        if (!userExist) {
          const registerResult = await registerUser(fetchApi, registerData);
          if (registerResult) {
            setSuccessForm("The user has been registered successfully");
            setRegisterData({
              userName: "",
              email: "",
              passwd: "",
            });
            setTimeout(() => {
              setRedirect(true);
            }, 3000);
          } else {
            setErrorForm("There was a problem to register the user, try later");
          }
        } else {
          successForm && setSuccessForm(null);
          setErrorForm("That user name is being used");
        }
      }
    } else {
      successForm && setSuccessForm(null);
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
            value={registerData.userName}
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
            value={registerData.email}
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
            value={registerData.passwd}
            onChange={handleChange}
          />
          <button
            type="submit"
            className={stylesRegister.registerFormButton}
            disabled={loading}
          >
            Register
          </button>
        </form>
        {errorForm && (
          <p className={stylesRegister.registerError}>{errorForm}</p>
        )}
        {successForm && (
          <p className={stylesRegister.registerSuccess}>{successForm}</p>
        )}
        {redirect && <Navigate to="/" />}
        <NavLink to="/" className={stylesRegister.registerNavLink}>
          If you are registered access to TheWall
        </NavLink>
      </div>
    </div>
  );
};

export default Register;
