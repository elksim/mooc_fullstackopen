import { createContext, useReducer, useContext } from "react";

const UserReducer = (state, action) => {
  // state = [user, username, token]
  switch (action.type) {
    case "login": {
      return {
        user: action.payload.user,
        username: action.payload.username,
        token: action.payload.token,
      };
    }
    case "logout": {
      return {};
    }
  }
};

const UserContext = createContext();

const UserContextProvider = (props) => {
  const [user, userReducer] = useReducer(UserReducer);

  return (
    <UserContext.Provider value={[user, userReducer]}>
      {props.children}
    </UserContext.Provider>
  );
};
