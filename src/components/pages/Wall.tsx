import styles from "./Wall.module.css";
import { Main } from "../main";
import { useContext } from "react";
import { UserNameContext } from "../../context/userNameContext";

type PropsWall = { userName: string };

const Wall = ({ userName }: PropsWall) => {
  return <Main />;
};

export default Wall;
