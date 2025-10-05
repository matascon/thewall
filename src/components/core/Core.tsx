import { useContext, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login, Register, Wall } from "../pages";
import { UserNameContext } from "../../context/userNameContext";
import { PasswdContext } from "../../context/passwdContext";

interface UserData {
  userName: string;
  passwd: string;
}

const Core = () => {
  const [logged, setLogged] = useState<boolean>(false);
  const { setUserName } = useContext(UserNameContext);
  const { setPasswd } = useContext(PasswdContext);

  //1 Note
  //  |
  //  |
  //  V
  const [_userData, setUserData] = useState<UserData>({
    userName: "",
    passwd: "",
  });

  const handleLogged = (
    valueLogged: boolean,
    userNameInput: string,
    passwdInput: string
  ) => {
    setLogged(valueLogged);
    setUserName(userNameInput);
    setPasswd(passwdInput);

    //1 Note - Esto lo vamos a dejar de momento por si queremos añadir la funcionalidad en el futuro de inicio de sesión automatico
    //1 Note - We leave this at the moment due to in case we would like to add automatic login on future
    setUserData({
      userName: userNameInput,
      passwd: passwdInput,
    });
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            !logged ? (
              <Login handleLogged={handleLogged} />
            ) : (
              <Wall handleLogged={handleLogged} />
            )
          }
        />
        <Route path="/Register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Core;
