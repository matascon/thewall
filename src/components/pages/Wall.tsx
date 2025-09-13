import { Nav } from "../nav";
import { Main } from "../main";

type PropsWall = {
  handleLogged: (
    valueLogged: boolean,
    userName: string,
    passwd: string
  ) => void;
};

const Wall = ({ handleLogged }: PropsWall) => {
  return (
    <>
      <Nav handleLogged={handleLogged} />
      <Main />
    </>
  );
};

export default Wall;
