import styles from "./Nav.module.css";
import { Title } from "../title";
import { useContext } from "react";
import { UserNameContext } from "../../context/userNameContext";

type PropsNav = {
  handleLogged: (
    valueLogged: boolean,
    userName: string,
    passwd: string
  ) => void;
};

const Nav = ({ handleLogged }: PropsNav) => {
  const { userName } = useContext(UserNameContext);

  const handleClick = () => {
    handleLogged(false, "", "");
  };

  return (
    <nav className={styles.nav}>
      <Title />
      <div className={styles.navDiv}>
        <h2 className={styles.navDivH2}>{userName}</h2>
        <button onClick={handleClick} className={styles.navDivButton}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Nav;
