import { createContext, ReactNode, useContext } from "react";
import { IUserDTO } from "../DTO/IUserDTO";
import { useLocalStorage } from "../hooks/useLocalStorage";

const userInfoFromLogin = "user-info";

export const getUserDataFromLocalStorage = () => {
  const jsonValue = localStorage.getItem(userInfoFromLogin);
  if (jsonValue != null) {
    return JSON.parse(jsonValue) as IUserDTO;
  }
  return null;
};

export const getUserTokenFromLocalStorage = () => {
  const userData = getUserDataFromLocalStorage();
  if (userData == null) {
    return null;
  }
  const userToken = userData.securityToken;
  return userToken;
};

type UserProviderProps = {
  children: ReactNode;
};

type UserContextType = {
  getCurrentUser: () => IUserDTO | null;
  logOutCurrentUser: () => void;
  setLogedinUser: (IUserDTO: IUserDTO) => void;
  isUserLoggedIn: ()=>boolean;
};

const UserContext = createContext({} as UserContextType);

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserContextProvider = (props: UserProviderProps) => {
  const [currentUser, setCurrentUser] = useLocalStorage<IUserDTO | null>(
    userInfoFromLogin,
    null
  );

  const getCurrentUser = () => {
    return currentUser;
  };

  const logOutCurrentUser = () => {
    setCurrentUser(null);
  };

  const setLogedinUser = (user: IUserDTO) => {
    setCurrentUser(user);
  };

  const isUserLoggedIn = () => {
    if((currentUser && currentUser.id> 0)){
        return true;
      }
      return false;
  };

  const { children } = props;
  return (
    <UserContext.Provider
      value={{
        getCurrentUser,
        logOutCurrentUser,
        setLogedinUser,
        isUserLoggedIn
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
