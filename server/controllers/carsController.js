const path = require("path");

const getCars = async (req, res) => {
    res.sendFile(path.join(__dirname, "..", "data", "car_data.json"));
};

module.exports = {
    getCars
}