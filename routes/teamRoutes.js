const express = require("express");
const router = express.Router();
const controller = require("../controllers/teamController");

router.post("/", controller.createTeam);
router.get("/", controller.getTeams);
router.put("/:id", controller.updateTeam);
router.delete("/:id", controller.deleteTeam);

module.exports = router;
