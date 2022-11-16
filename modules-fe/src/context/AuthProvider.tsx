import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";

export type AuthTokens = {
  access?: string;
  refresh?: string;
};

const AuthContext = createContext<{
  auth: AuthTokens;
  setAuth: Dispatch<SetStateAction<AuthTokens>>;
}>({ auth: {}, setAuth: () => null });

type Props = {
  children: ReactNode;
};

// retrieve login on page refresh
const localStorageAuthState: AuthTokens =
  JSON.parse(window.localStorage.getItem("auth") ?? "") ?? {};

export const AuthProvider = ({ children }: Props) => {
  const [auth, setAuth] = useState<AuthTokens>(localStorageAuthState);

  const value = useMemo(() => ({ auth, setAuth }), [auth]);

  useEffect(() => {
    // persist login in local storage
    window.localStorage.setItem("auth", JSON.stringify(auth));
  }, [auth, auth.access, auth.refresh]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
