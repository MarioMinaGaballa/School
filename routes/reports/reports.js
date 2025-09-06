const express = require("express");
const router = express.Router();
const reportController1 = require("../../controllers/reports/report_1");
const reportController2 = require("../../controllers/reports/report_2");

router.post("/report_1", reportController1.report_1);
router.post("/report_2", reportController2.report_2);

module.exports = router;
