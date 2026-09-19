const express = require("express");
const clientController = require("../controllers/clientController");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect, authorize("owner", "admin"));
router.route("/").post(clientController.createClient).get(clientController.getClients);
router
	.route("/:id")
	.get(clientController.getClient)
	.put(clientController.updateClient)
	.delete(clientController.deleteClient);

module.exports = router;
