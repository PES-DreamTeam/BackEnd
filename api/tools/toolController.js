
const ToolController = (dependencies) => {
    const { BikeStations, axios, chargePointService, Highlights } = dependencies;
    const getBike = async (req, res) => {
        try {
            const bike = await axios.get('https://api.bsmsa.eu/ext/api/bsm/gbfs/v2/en/station_information');
            const data = bike.data.data.stations.map(bikeStation => {
                return {
                    station_id: bikeStation.station_id.toString(),
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

    const publishHighlight = async (req, res) => {
        try {
            console.log(Highlights);
            const result = await Highlights.create(req.body);
            return res.status(200).send(result);
        }catch(error){
            return res.status(500).send({msg: error.toString()});
        }
    }

    const setDefaultStations = async (req, res) => {
        try {
            const data = await chargePointService.get(null, 'id', 'default');
            for(const element in data){
                chargePointService.createDefaultStation({
                    station_id: element,
                });
            }
            return res.status(200).send(data);
        } catch (error) {
            return res.status(500).send({msg: error.toString()});
        }
    }

    const setReportStations = async (req, res) => {
        try {
            const data = await chargePointService.get(null, 'id', 'default');
            for(const element in data){
                chargePointService.createReportStation({
                    station_id: element,
                });
            }
            return res.status(200).send(data);
        } catch (error) {
            return res.status(500).send({msg: error.toString()});
        }
    }

    
    return {
        getBike,
        setDefaultStations,
        publishHighlight,
        setReportStations,
    }
}

module.exports = ToolController;