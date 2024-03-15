const { Region } = require('../../shared/db/mongodb/schemas');

const createRegion = async (req, res) => {
    const region = req.query.region;

    // checking to see if region exist
    const existingRegion = await Region.findOne({name: regionName});
    if (existingRegion) {
        return res.status(400).send({ message: `Region ${regionName} already exists`});
    }
    // creating new region
    const newRegion = new Region({name: regionName});
    await newRegion.save();

    //return region object
    res.status(201).send({
        success: true,
        message: 'Region successfully created.',
        newRegion
    });
};

module.exports = {createRegion}