import {
  createContext,
  useContext,
  FunctionComponent,
  PropsWithChildren,
} from "react";

export interface UserInformation {
  login: string;
}

const UserContext = createContext<UserInformation | undefined>(undefined);

export const UserProvider: FunctionComponent<PropsWithChildren<unknown>> = (
  props,
) => {
  return (
    <UserContext.Provider value={{ login: import.meta.env.VITE_GITHUB_LOGIN }}>
      {props.children}
    </UserContext.Provider>
  );
};

export function useCurrentUser(): UserInformation {
  const context = useContext(UserContext);
  if (context == null) {
    throw new Error("useCurrentUser must be used within an UserProvider");
  }
  return context;
}
