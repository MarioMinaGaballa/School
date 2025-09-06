const report2 = require("../../models/reports/report_2");

const report_2 = async (req, res) => {
  try {
    const { id } = req.body;
    const isvalidId = await report2.isValidStudentId(id);
    if (!isvalidId) {
      return res
        .status(400)
        .json({ message: "Invalid ID: No teacher found with the provided ID" });
    }
    const fnData = await report2.data(id);
    console.log(fnData);
    res.status(200).json(fnData);
  } catch (error) {
    console.error("Error fetching report data", error);
    res.status(500).json({ message: "An internal server error occurred" });
  }
};

module.exports = {
  report_2,
};
