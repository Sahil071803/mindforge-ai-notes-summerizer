const Anthropic = require("@anthropic-ai/sdk");

console.log("API KEY:", process.env.ANTHROPIC_API_KEY); 

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

module.exports = client;