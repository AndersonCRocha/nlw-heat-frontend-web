import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { api } from "../services/api";

const LOCAL_STORAGE_TOKEN_KEY = "@dowhile:access_token";

interface IUser {
  id: string;
  name: string;
  login: string;
  avatar_url: string;
}

interface AuthContextData {
  user: IUser | null;
  signinUrl: string;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

interface AuthProviderProps {
  children: ReactNode;
}

interface IAuthResponse {
  access_token: string;
  user: {
    id: string;
    name: string;
    login: string;
    avatar_url: string;
  };
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<IUser | null>(null);

  const signinUrl = `${import.meta.env.VITE_APP_BACKEND_URL}/signin/github`;

  async function signin(githubCode: string) {
    const { data } = await api.post<IAuthResponse>("/signin/github/callback", {
      code: githubCode,
    });
    const { access_token: accessToken, user } = data;

    api.defaults.headers.common.authorization = `Bearer ${accessToken}`;
    window.localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, accessToken);

    setUser(user);
  }

  async function signOut() {
    setUser(null);
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
  }

  useEffect(() => {
    const actualPageUrl = window.location.href;
    const hasGithubCode = actualPageUrl.includes("?code=");

    if (hasGithubCode) {
      const [urlWithoutCode, githubCode] = actualPageUrl.split("?code=");

      window.history.pushState({}, "", urlWithoutCode);
      signin(githubCode);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);

    if (token) {
      api.defaults.headers.common.authorization = `Bearer ${token}`;

      api.get<IUser>("/users/me").then(({ data }) => {
        setUser(data);
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ signinUrl, signOut, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
