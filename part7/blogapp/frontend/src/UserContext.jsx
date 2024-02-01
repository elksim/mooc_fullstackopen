import { createContext, useReducer, useContext } from "react";

import { setToken } from "./requests";

const UserReducer = (state, action) => {
  switch (action.type) {
    case "login": {
      setToken(action.payload.token);
      return {
        username: action.payload.username,
        token: action.payload.token,
      };
    }
    case "logout": {
      setToken(null);
      return null;
    }
    default: {
      return null;
    }
  }
};

export const useUserValue = () => {
  const [user, userDispatch] = useContext(UserContext);
  return user;
};

export const useUserDispatch = () => {
  const [user, userDispatch] = useContext(UserContext);
  return userDispatch;
};

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [user, userReducer] = useReducer(UserReducer, null);

  return (
    <UserContext.Provider value={[user, userReducer]}>
      {props.children}
    </UserContext.Provider>
  );
};
