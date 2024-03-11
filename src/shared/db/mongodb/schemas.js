const mongoose = require('mongoose');

// Define the Agent schema
const agentSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    region: String,
    sales: { type: Number, default: 0 }
});

// Add additional schemas here
// const additionalSchema = new mongoose.Schema({ ... });

// Create models from the schemas
const Agent = mongoose.model('Agent', agentSchema);
// const AdditionalModel = mongoose.model('AdditionalModelName', additionalSchemaName);

// Export all models
module.exports = {
    Agent,
    // AdditionalModel,
    // Add more models as needed
};
