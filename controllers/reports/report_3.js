const report3 = require("../../models/reports/report_3");

const report_3 = async (req, res) => {
  try {
  const orderby =req.body;
  const fnData = await report3.data(orderby);
  console.log(fnData);
  res.status(200).json(fnData);
  }catch (error) {
    console.error("Error fetching report data", error);
    res.status(500).json({ message: "An internal server error occurred" });
  }
}


module.exports = { report_3 };