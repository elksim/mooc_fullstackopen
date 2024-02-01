import { useNotificationValue } from "../NotificationContext";

const Notification = () => {
  const notification = useNotificationValue();
  console.log;
  if (
    notification.message === null ||
    notification.message === undefined ||
    notification.message === ""
  ) {
    return <></>;
  }

  const style = {
    borderStyle: "solid",
    borderRadius: "5px",
    background: "lightgrey",
    padding: "10px",
    color: notification.type === "error" ? "red" : "green",
  };
  return (
    <>
      <h3 style={style}>{notification.message}</h3>
    </>
  );
};

export default Notification;
