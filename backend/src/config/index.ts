import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const config = {
  port: parseInt(process.env.PORT || '5000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  databaseUrl: process.env.DATABASE_URL || '',
  corsOrigin: process.env.CORS_ORIGIN || '*',
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET || 'dev_access_secret',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'dev_refresh_secret',
  },
  fabric: {
    network: process.env.FABRIC_NETWORK || 'elandregistry-network',
    channel: process.env.FABRIC_CHANNEL || 'landchannel',
    chaincode: process.env.FABRIC_CHAINCODE || 'landregistry-contract',
    mspId: process.env.FABRIC_MSP_ID || 'Org1MSP',
  },
  storage: {
    type: process.env.STORAGE_TYPE || 'local',
    path: process.env.STORAGE_PATH || './storage',
  },
};
