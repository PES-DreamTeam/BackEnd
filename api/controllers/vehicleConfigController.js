const vehicleTest = async (req, res) => {
    try {
        res.status(200).send('VehicleTest');
    } catch (error) {
        res.status(400).send({msg: error});
    }
}

module.exports = {
    vehicleTest
}