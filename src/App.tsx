import "./App.css";
import { Core } from "./components/core";
import { PasswdProvider } from "./context/passwdContext";
import { UserNameProvider } from "./context/userNameContext";

function App() {
  return (
    <UserNameProvider>
      <PasswdProvider>
        <Core />
      </PasswdProvider>
    </UserNameProvider>
  );
}

export default App;
