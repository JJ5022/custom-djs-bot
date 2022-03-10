import { resolveAllFiles } from './utils';

resolveAllFiles('./build/event').then(console.log).catch(console.error);
