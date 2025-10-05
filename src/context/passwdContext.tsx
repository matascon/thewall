import { createContext, useState, type ReactNode } from "react";

type UserNameContextType = {
  passwd: string;
  setPasswd: (passwd: string) => void;
};

type passwdProviderProps = { children: ReactNode };

const PasswdContext = createContext<UserNameContextType>({
  passwd: "",
  setPasswd: () => {},
});

const PasswdProvider = ({ children }: passwdProviderProps) => {
  const [passwd, setPasswd] = useState<string>("");

  return (
    <PasswdContext.Provider value={{ passwd, setPasswd }}>
      {children}
    </PasswdContext.Provider>
  );
};

export { PasswdContext, PasswdProvider };
