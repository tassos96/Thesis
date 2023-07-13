import { createContext, ReactNode, useContext } from "react";
import { IUserDTO } from "../DTO/IUserDTO";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { IUserRoleEnum } from "../DTO/IUserRoleEnum";

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
    return "";
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
  setLoggedinUser: (IUserDTO: IUserDTO) => void;
  isUserLoggedIn: ()=> boolean;
  isUserTeacher: ()=> boolean;
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

  const setLoggedinUser = (user: IUserDTO) => {
    setCurrentUser(user);
  };

  const isUserLoggedIn = () => {
    if((currentUser && currentUser.userId> 0)){
        return true;
      }
      return false;
  };

  const isUserTeacher = () => {
    if((currentUser && currentUser.userRole === IUserRoleEnum.Teacher)){
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
        setLoggedinUser,
        isUserLoggedIn,
        isUserTeacher
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
