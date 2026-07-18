/**
 * Backend deployment configuration and utilities
 */

const path = require('path');

// Load environment variables
require('dotenv').config({
  path: path.join(__dirname, '../../.env'),
});

module.exports = {
  // Server config
  PORT: process.env.PORT || 3001,
  NODE_ENV: process.env.NODE_ENV || 'development',
  
  // AWS config
  AWS_REGION: process.env.AWS_REGION || 'us-east-1',
  CLAUDE_MODEL: process.env.CLAUDE_MODEL || 'claude-3-5-sonnet-20241022',
  LLAMA_MODEL: process.env.LLAMA_MODEL || 'llama3.1-8b-instruct',
  
  // CORS
  CORS_ORIGIN: process.env.CORS_ORIGIN || [
    'http://localhost:3000',
    'http://localhost:3001',
  ],
  
  // API
  API_TIMEOUT: 30000,
  MAX_CHAT_HISTORY: 20,
  
  // Validate config
  validate() {
    const required = ['AWS_REGION'];
    const missing = required.filter(key => !process.env[key]);
    
    if (missing.length > 0) {
      console.warn(`⚠️  Missing env vars: ${missing.join(', ')}`);
    }
    
    return {
      status: 'ok',
      environment: process.env.NODE_ENV,
      port: this.PORT,
      region: this.AWS_REGION,
    };
  },
};
