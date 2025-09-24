const axios = require('axios');

const SMYTHOS_BASE = process.env.SMYTHOS_URL || 'https://api.smythos.example';
const SMYTHOS_KEY = process.env.SMYTHOS_API_KEY || '';

const client = axios.create({
  baseURL: SMYTHOS_BASE,
  headers: { 'Authorization': `Bearer ${SMYTHOS_KEY}`, 'Content-Type': 'application/json' }
});

async function callSkill(endpoint, payload) {
  // endpoint: '/create_storybook'
  const resp = await client.post(endpoint, payload, { timeout: 120000 });
  return resp.data;
}

module.exports = { callSkill };
