const { Region } = require('../../shared/db/mongodb/schemas');
const {getTopAgentsBySales} = require('../../../src/features/health/agent.controller')

const createRegion = async (req, res) => {
    const regionName = req.query.region;
    console.log(`Checking for existing region: ${regionName}`);

    // Checking to see if region already exists
    const existingRegion = await Region.findOne({region: regionName});
    console.log(`Existing region found: ${existingRegion}`);

    if (existingRegion) {
        return res.status(400).send({ message: "Region already exists"});
    }

    // Creating new region
    const newRegion = new Region({name: regionName});
    await newRegion.save();

    // Get top agents and assign them to the new region
    try {
        const topAgents = await getTopAgentsBySales();
        console.log('Top agents by sales:', topAgents);

        // Assuming getTopAgentsBySales returns an array of agent IDs
        newRegion.top_agents = topAgents;
        await newRegion.save();

        console.log('Top agents assigned to the new region.');
    } catch (error) {
        console.error('Failed to fetch top agents:', error);
        return res.status(500).send({ message: "Failed to fetch top agents." });
    }

    // Return region object
    res.status(201).send({
        success: true,
        message: 'Region successfully created.',
        newRegion
    });
};


module.exports = {createRegion}