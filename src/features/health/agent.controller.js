const { Agent } = require('../../shared/db/mongodb/schemas');

const createAgent = async (req, res) => {
    const { first_name, last_name, email, region } = req.body;

    //check if req fields provided
    if (!first_name || !last_name || !email || !region) {
        return res.status(400).send({
            success: false,
            message: 'first_name, last_name, email and region are required'
        });
    }

    //Set sales to 0 and default values
    const agent = await Agent.create ({
        first_name,
        last_name,
        email,
        region,
        sales: 0, // makes sales default to 0
        //any additional defaults would go here
    });
    if (!agent){
        res.status(500).send({message: 'Create failed'});
    }
    //return agent object
    res.status(201).send({
        success: true,
        message: 'Agent created successfully',
        agent
    });
};
  
const getAgents =  async (req, res) => {
    try {
        const agents = await Agent.find().sort({ last_name: 1 });
        res.json(agents);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching agents', error });
    }
};

const agentsByRegion = async (req, res) => {
    const { region } = req.query;
    if (!region) {
        return res.status(400).send({ message: 'Region is required' });
    }

    try {
        const agents = await Agent.find({ region: region }).sort({ rating: -1 });
        res.json(agents);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching agents', error });
    }
};

const updateAgents = async (req, res) => {
    const {first_name, last_name, email, region} = req.body;
    if (!email) {
        return res.status(400).send({message: 'Email is required'});
    }

    try{
        const agent = await Agent.findOneAndUpdate(
            {email: email},
            {
                $set: {
                    first_name: first_name, 
                    last_name: last_name,
                    region: region
                }
            },
            {new: true} //returns updated document
        )
        if (!agent){
            return res.status(404).send({message: 'Agent does not exist'});
        }
        res.json(agent);
    }
    catch (error) {
        res.status(500).send({message: 'Error updating agent info'})
    }
};

const deleteAgent = async (req, res) => {
    const query = req.body;

    try {
        const agents = await Agent.find(query);
        if (agents.length === 0) {
            return res.status(404).send({ message: 'Agent not found' });
        } else if (agents.length > 1) {
            return res.status(400).send({ message: 'Multiple agents found. Please provide more specific query parameters.' });
        } 
        const deletedAgent = await Agent.findByIdAndRemove(agents[0]._id);
        if (!deletedAgent) {
            return res.status(404).send({ message: 'Agent not found' });
        }
        res.json({ message: 'Agent deleted successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Error deleting agent', error: error.toString() });
    }
};


module.exports = {createAgent, getAgents, agentsByRegion, updateAgents, deleteAgent};