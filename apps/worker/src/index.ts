import { logger } from '@prguardian/observability';

logger.info('PR Guardian worker starting — job polling not implemented until M3');

process.on('SIGTERM', () => {
  logger.info('Worker received SIGTERM, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('Worker received SIGINT, shutting down gracefully');
  process.exit(0);
});
