import "./App.css";
import type { ReactNode } from "react";

interface SaludoProps {
  children: ReactNode;
}

const Saludo = ({ children }: SaludoProps) => {
  return <h1>{children}</h1>;
};

function App() {
  return <Saludo>REACT HELLO</Saludo>;
}

export default App;
