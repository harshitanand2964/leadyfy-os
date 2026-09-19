import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Clients from "./pages/Clients";

const Private = ({ children }) =>
	localStorage.getItem("token") ? children : <Navigate to="/" />;

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route
					path="/clients"
					element={
						<Private>
							<Clients />
						</Private>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}
