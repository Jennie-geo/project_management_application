import { createContext, FC, useState, useEffect } from "react";
import { useCookies } from "react-cookie";

interface AuthInterface {
  token?: string | null;
  signIn: Function;
  signOut: Function;
}

const authContext = createContext<AuthInterface>({
  signIn: () => {},
  signOut: () => {},
});

const AuthcontextProvider: FC<{}> = ({ children }) => {
  const sessId = process.env.REACT_APP_SESSIONID as string;

  const [cookies, setCookies, removeCookies] = useCookies([sessId]);
  const [sessionToken, setSessionToken] = useState<string | null>(
    cookies[sessId]
  );

  useEffect(() => {
    if (!sessionToken) {
      removeCookies(sessId);
      return;
    }
    setCookies(sessId, sessionToken, { path: "/" });
  }, [sessionToken]);

  const signIn = (token: string) => {
    setSessionToken(token);
  };

  const signOut = () => {
    setSessionToken(null);
  };
  return (
    <authContext.Provider
      value={{
        token: sessionToken,
        signIn,
        signOut,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export { AuthcontextProvider, authContext };
