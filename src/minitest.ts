import logger from './utils/logger';
import resolveAllFiles from './utils/resolveAllFiles';

resolveAllFiles('./build/event').then(logger.info).catch(logger.error);
