import app from './app';
import { config } from './config';
import { prisma } from './database/prisma';

const server = app.listen(config.port, () => {
  console.log(
    `[eLandRegistry Backend] Server is running on port ${config.port} (${config.nodeEnv})`,
  );
  console.log(
    `[eLandRegistry Backend] Healthcheck available at http://localhost:${config.port}/api/v1/healthcheck/`,
  );
});

// Graceful shutdown handling
const gracefulShutdown = async (signal: string) => {
  console.log(`[eLandRegistry Backend] Received ${signal}. Initiating graceful shutdown...`);
  server.close(async () => {
    console.log('[eLandRegistry Backend] HTTP server closed.');
    await prisma.$disconnect();
    console.log('[eLandRegistry Backend] Database connection closed.');
    process.exit(0);
  });
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
