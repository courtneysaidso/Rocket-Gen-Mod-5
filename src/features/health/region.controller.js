const { Region } = require('../../shared/db/mongodb/schemas');
const {getTopAgentsBySales} = require('../../../src/features/health/agent.controller')

const createRegion = async (req, res) => {
    const regionName = req.query.region;
    console.log(`Checking for existing region: ${regionName}`);

    // checking to see if region exist
    const existingRegion = await Region.findOne({region: regionName});
    console.log(`Existing region found: ${existingRegion}`);

    if (existingRegion) {
        return res.status(400).send({ message: "Region already exists"});
    }

    // creating new region
    const newRegion = new Region({name: regionName});
    await newRegion.save();

    //get top agents
    const getTopAgents = async () => {
        try {
            const topAgents = await getTopAgentsBySales();
            console.log('Top agents by sales:', topAgents);
        } catch (error) {
            console.error('Failed to fetch top agents:', error);
        }
    };
    
    getTopAgents();

    //return region object
    res.status(201).send({
        success: true,
        message: 'Region successfully created.',
        newRegion
    });
};

module.exports = {createRegion}