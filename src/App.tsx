import "./App.css";
import { Core } from "./components/core";
import { UserNameProvider } from "./context/userNameContext";

function App() {
  return (
    <UserNameProvider>
      <Core />
    </UserNameProvider>
  );
}

export default App;
