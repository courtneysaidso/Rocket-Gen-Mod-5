const mongoose = require('mongoose');

// Define the Agent schema
const agentSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    region: String,
    sales: { type: Number, default: 0 },
    isManager: { type: Boolean, default: false }
});

// Define region schema
const regionSchema = new mongoose.Schema({
    region: String, 
    address: String,
    total_sales: [{ type: Number, default: 0}],
    manager: [{type: mongoose.Schema.Types.ObjectId, ref: 'Agent'}],
    top_agents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Agent'}]
});
// Add additional schemas here
// const additionalSchema = new mongoose.Schema({ ... });

// Create models from the schemas
const Agent = mongoose.model('Agent', agentSchema);
// const AdditionalModel = mongoose.model('AdditionalModelName', additionalSchemaName);

const Region = mongoose.model('Region', regionSchema);

// Export all models
module.exports = {
    Agent,
    Region,
    // AdditionalModel,
    // Add more models as needed
};
