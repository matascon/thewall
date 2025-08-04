import { createContext, useState, type ReactNode } from "react";

type UserNameContextType = {
  userName: string;
  setUserName: (userName: string) => void;
};

type UserNameProviderProps = { children: ReactNode };

const UserNameContext = createContext<UserNameContextType>({
  userName: "",
  setUserName: () => {},
});

const UserNameProvider = ({ children }: UserNameProviderProps) => {
  const [userName, setUserName] = useState<string>("");

  return (
    <UserNameContext.Provider value={{ userName, setUserName }}>
      {children}
    </UserNameContext.Provider>
  );
};

export { UserNameContext, UserNameProvider };
