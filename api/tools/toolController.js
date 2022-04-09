
const ToolController = (dependencies) => {
    const { BikeStations, axios } = dependencies;
    const getBike = async (req, res) => {
        try {
            const bike = await axios.get('https://api.bsmsa.eu/ext/api/bsm/gbfs/v2/en/station_information');
            const data = bike.data.data.stations.map(bikeStation => {
                return {
                    station_id: bikeStation.station_id,
                    name: bikeStation.name,
                    lat: bikeStation.lat,
                    lng: bikeStation.lon,
                    address: bikeStation.address,
                    postCode: bikeStation.post_code,
                }
            });
            data.forEach(element => {
                BikeStations.create(element);
            });
            return res.status(200).send(data);
        } catch (error) {
            return res.status(500).send({msg: error.toString()});
        }
    }

    return {
        getBike
    }
}

module.exports = ToolController;