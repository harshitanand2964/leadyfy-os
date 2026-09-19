import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const empty = { name: "", company_name: "", email: "", phone: "" };

export default function Clients() {
	const [clients, setClients] = useState([]);
	const [form, setForm] = useState(empty);
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const logout = () => {
		localStorage.clear();
		navigate("/");
	};

	const load = async () => {
		try {
			const { data } = await api.get("/clients");
			setClients(data);
		} catch {
			logout();
		}
	};

	useEffect(() => {
		load();
	}, []);

	const add = async (event) => {
		event.preventDefault();

		try {
			await api.post("/clients", form);
			setForm(empty);
			setError("");
			load();
		} catch (requestError) {
			setError(requestError.response?.data?.message || "Failed to add client");
		}
	};

	const remove = async (id) => {
		await api.delete(`/clients/${id}`);
		load();
	};

	return (
		<div className="page">
			<div className="bar">
				<h2>Clients</h2>
				<button type="button" onClick={logout}>Logout</button>
			</div>

			<form className="row" onSubmit={add}>
				{["name", "company_name", "email", "phone"].map((field) => (
					<input
						key={field}
						placeholder={field}
						value={form[field]}
						onChange={(event) =>
							setForm({ ...form, [field]: event.target.value })
						}
					/>
				))}
				<button type="submit">Add Client</button>
			</form>
			{error && <p className="err">{error}</p>}

			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Company</th>
						<th>Email</th>
						<th>Status</th>
						<th />
					</tr>
				</thead>
				<tbody>
					{clients.map((client) => (
						<tr key={client._id}>
							<td>{client.name}</td>
							<td>{client.company_name}</td>
							<td>{client.email}</td>
							<td>
								<span className="badge">{client.status}</span>
							</td>
							<td>
								<button type="button" onClick={() => remove(client._id)}>
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
