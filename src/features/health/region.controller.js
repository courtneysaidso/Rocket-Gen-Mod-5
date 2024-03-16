const { Region } = require('../../shared/db/mongodb/schemas');
const {getTopAgentsBySales} = require('../../../src/features/health/agent.controller')

const createRegion = async (req, res) => {
    const regionName = req.query.region;
    console.log(`Checking for existing region: ${regionName}`);

    // Checking to see if region exists
    const existingRegion = await Region.findOne({region: regionName});
    console.log(`Existing region found: ${existingRegion}`);

    if (existingRegion) {
        return res.status(400).send({ message: "Region already exists"});
    }

    // Creating new region
    const newRegion = new Region({name: regionName});
    await newRegion.save();

    // Creating new agents as managers
    const managerIds = [];
    for (let i = 0; i < 4; i++) {
        const manager = new agent({
            first_name: `Manager ${i + 1}`,
            last_name: `Region ${regionName}`,
            email: `manager${i + 1}@example.com`,
            region: regionName,
            sales: 0, // Initialize sales to 0
            isManager: true
        });
        await manager.save();
        managerIds.push(manager._id);
    }

    // Assign managers to the new region
    newRegion.manager = managerIds;

    // assigning top agents to new region
    try {
        const topAgents = await getTopAgentsBySales();
        console.log('Top agents by sales:', topAgents);

        newRegion.top_agents = topAgents;
        await newRegion.save();

        console.log('Top agents assigned to the new region.');
    } catch (error) {
        console.error('Failed to fetch top agents:', error);
        return res.status(500).send({ message: "Failed to fetch top agents." });
    }

    // Calculate total sales for the region
    const calculateTotalSales = async (agentIds) => {
        let totalSales = 0;
        for (const agentId of agentIds) {
            const agent = await Agent.findById(agentId);
            totalSales += agent.sales;
        }
        return totalSales;
    };
    newRegion.total_sales = calculateTotalSales(newRegion.top_agents);

    // Return region object
    res.status(201).send({
        success: true,
        message: 'Region successfully created.',
        newRegion
    });
};

const regionInfo = async (req, res) => {
    const { region } = req.query;
    const regionInfo = await Region.findOne({ region: region }).populate('manager top_agents');
    if (!regionInfo) {
        return res.status(404).send({ message: "Region not found" });
    }
    res.json(regionInfo);
};

const allStars = async (req, res) => {
    const regions = await Region.find();
    const topAgents = await Promise.all(regions.map(async (region) => {
        const topAgent = await Agent.findOne({ region: region._id }).sort({ sales: -1 }).limit(1);
        return { region: region.region, topAgent };
    }));
    res.json(topAgents);
};

module.exports = {createRegion, regionInfo, allStars}