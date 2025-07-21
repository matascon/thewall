import stylesLogin from "./Login.module.css";
import stylesForm from "./Form.module.css";
import { NavLink } from "react-router-dom";
import { Title } from "../title";
import { useState } from "react";
import useFetch from "../hooks/useFetch";

interface UserData {
  userName: string;
  passwd: string;
}

type Props = {
  handleLogged: (
    valueLogged: boolean,
    userName: string,
    passwd: string
  ) => void;
};
type ValidateUser = (fetchApi: FetchApi, userName: string) => Promise<boolean>;
type LoginUser = (fetchApi: FetchApi, userData: UserData) => Promise<boolean>;
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

const loginUser: LoginUser = async (fetchApi, userData) => {
  const result = await fetchApi("http://localhost:8079/api/user/loginUser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  return result ? true : false;
};

const Login = ({ handleLogged }: Props) => {
  const [userDataInput, setuserDataInput] = useState<UserData>({
    userName: "",
    passwd: "",
  });
  const [errorForm, setErrorForm] = useState<string | null>(null);
  const { loading, error, fetchApi } = useFetch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setuserDataInput((prev: UserData) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorForm("");

    if (userDataInput.userName && userDataInput.passwd) {
      const result = await validateUser(fetchApi, userDataInput.userName);
      if (error) {
        setErrorForm("There was a problem to login the user, try later");
      } else {
        if (result) {
          const result = await loginUser(fetchApi, userDataInput);
          if (error) {
            setErrorForm("There was a problem to login the user, try later");
          } else {
            result
              ? handleLogged(true, userDataInput.userName, userDataInput.passwd)
              : setErrorForm("Wrong password.");
          }
        } else {
          setErrorForm(`User ${userDataInput.userName} does not exist.`);
        }
      }
    } else {
      setErrorForm("All fields are required.");
    }
  };

  return (
    <div className={stylesForm.form}>
      <Title />
      <div className={stylesLogin.login}>
        <h2 className={stylesLogin.loginH2}>Login</h2>
        <form className={stylesLogin.loginForm} onSubmit={handleSubmit}>
          <label htmlFor="userName" className={stylesLogin.loginFormLabel}>
            User Name
          </label>
          <input
            className={stylesLogin.loginFormInput}
            type="text"
            id="userName"
            name="userName"
            placeholder="User Name"
            value={userDataInput.userName}
            onChange={handleChange}
          />
          <label htmlFor="userPassword" className={stylesLogin.loginFormLabel}>
            Password
          </label>
          <input
            className={stylesLogin.loginFormInput}
            type="password"
            id="passwd"
            name="passwd"
            placeholder="Password"
            value={userDataInput.passwd}
            onChange={handleChange}
          />
          {errorForm && (
            <p className={stylesLogin.registerError}>{errorForm}</p>
          )}
          <button className={stylesLogin.loginFormButton} disabled={loading}>
            {!loading ? "Login" : "..."}
          </button>
        </form>
        <NavLink to="/Register" className={stylesLogin.loginNavLink}>
          Do not you have an account?, create it
        </NavLink>
      </div>
    </div>
  );
};

export default Login;
