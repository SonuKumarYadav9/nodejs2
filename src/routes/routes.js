const express = require("express");
const router = express.Router();
const {
  createCustomer,
  getCustomer,
  deleteCustomer,
} = require("../controllers/customerController.js");
const cardController = require("../controllers/cardController.js");

//_________________USER____________________//
router.post("/customer", createCustomer);
router.get("/customer", getCustomer);
router.delete("/customer", deleteCustomer);

//_____________CARD________________///
router.post("/card", cardController.createCard);
router.get("/card", cardController.getAllCards);

router.all("/**", (req, res) => {
  return res
    .status(404)
    .send({ status: false, msg: "The Api endpoint is not available" });
});

module.exports = router;
