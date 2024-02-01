import ReactDOM from "react-dom/client";
import App from "./App";
import { NotificationContextProvider } from "./NotificationContext";
import { BrowserRouter } from "react-router-dom";
import { UserContextProvider } from "./UserContext";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <UserContextProvider>
        <NotificationContextProvider>
          <App />
        </NotificationContextProvider>
      </UserContextProvider>
    </BrowserRouter>
  </QueryClientProvider>
);
