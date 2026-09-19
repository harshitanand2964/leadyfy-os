import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const submit = async (event) => {
		event.preventDefault();

		try {
			const { data } = await api.post("/auth/login", { email, password });
			localStorage.setItem("token", data.token);
			localStorage.setItem("user", JSON.stringify(data.user));
			navigate("/clients");
		} catch (requestError) {
			setError(requestError.response?.data?.message || "Login failed");
		}
	};

	return (
		<div className="center">
			<form className="card" onSubmit={submit}>
				<h2>Leadyfy OS</h2>
				<input
					placeholder="Email"
					value={email}
					onChange={(event) => setEmail(event.target.value)}
				/>
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(event) => setPassword(event.target.value)}
				/>
				{error && <p className="err">{error}</p>}
				<button type="submit">Login</button>
			</form>
		</div>
	);
}
