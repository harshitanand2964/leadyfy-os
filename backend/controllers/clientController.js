const Client = require("../models/client");

exports.createClient = async (req, res) => {
	try {
		const { name, company_name, email } = req.body;

		if (!name || !company_name || !email) {
			return res
				.status(400)
				.json({ message: "name, company_name and email are required" });
		}

		const client = await Client.create(req.body);
		res.status(201).json(client);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

exports.getClients = async (req, res) => {
	const clients = await Client.find().sort({ createdAt: -1 });
	res.json(clients);
};

exports.getClient = async (req, res) => {
	const client = await Client.findById(req.params.id);

	if (!client) {
		return res.status(404).json({ message: "Client not found" });
	}

	res.json(client);
};

exports.updateClient = async (req, res) => {
	const client = await Client.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});

	if (!client) {
		return res.status(404).json({ message: "Client not found" });
	}

	res.json(client);
};

exports.deleteClient = async (req, res) => {
	await Client.findByIdAndDelete(req.params.id);
	res.json({ message: "Client deleted" });
};
