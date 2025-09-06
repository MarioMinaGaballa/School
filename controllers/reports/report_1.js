const report1 = require("../../models/reports/report_1");

const report_1 = async (req, res) => {
  try {
    const { id } = req.body;
    const isvalidId = await report1.isValidTeacherId(id);
    if (!isvalidId) {
      return res
        .status(400)
        .json({ message: "Invalid ID: No teacher found with the provided ID" });
    }
    const fnData = await report1.data(id);
    res.status(200).json(fnData);
  } catch (error) {
    console.error("Error fetching report data", error);
    res.status(500).json({ message: "An internal server error occurred" });
  }
};

module.exports = {
  report_1,
};
