import resolveAllFiles from './utils/resolveAllFiles';

resolveAllFiles('./build/event').then(console.log).catch(console.error);
