import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Container } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { NotificationContextProvider } from "./NotificationContext";
import App from "./App";
import { UserContextProvider } from "./UserContext";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
	<Container>
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<UserContextProvider>
					<NotificationContextProvider>
						<App />
					</NotificationContextProvider>
				</UserContextProvider>
			</BrowserRouter>
		</QueryClientProvider>
	</Container>
);
