const AgentController = require('../features/health/agent.controller');

const registerAgentRoutes = (app) => {
  app.post('/agent-create', AgentController.createAgent);
  app.get('/agents', AgentController.getAgents);
  app.get('/agents-by-region', AgentController.agentsByRegion);
  app.put('/agent-update-info', AgentController.updateAgents);
  app.delete('/agent-delete', AgentController.deleteAgent);
}

module.exports = {registerAgentRoutes};