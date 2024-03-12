const AgentController = require('../features/health/agent.controller');

const registerAgentRoutes = (app) => {
  app.post('/agent-create', AgentController.createAgent);
  app.get('/agents', AgentController.getAgents);
  app.get('/agents-by-region', AgentController.agentsByRegion);
  app.put('/agent-update-info', AgentController.updateAgents);
}

module.exports = {registerAgentRoutes};