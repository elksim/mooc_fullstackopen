import { useContext, useReducer, createContext } from "react";

const NotificationReducer = (state, action) => {
  switch (action.type) {
    case "set":
      return {
        message: action.payload.message,
        type: action.payload.type,
      };
    case "remove":
      return {};
    default:
      return { message: "notifications go here." };
  }
};

export const NotificationContext = createContext();

export const useNotificationValue = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext);
  return notification;
};
export const useNotificationDispatch = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext);
  return notificationDispatch;
};

export const useSetNotification = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext);

  return (message, type, duration) => {
    notificationDispatch({ type: "set", payload: { message, type } });
    setTimeout(() => {
      notificationDispatch({ type: "remove" });
    }, duration);
  };
};

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(NotificationReducer, {
    message: "notifications go here...",
  });

  return (
    <>
      <NotificationContext.Provider
        value={[notification, notificationDispatch]}
      >
        {props.children}
      </NotificationContext.Provider>
    </>
  );
};
