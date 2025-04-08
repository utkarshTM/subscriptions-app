import { defineConfig, drivers } from '@adonisjs/core/hash';

const hashConfig = defineConfig({
  default: 'bcrypt', 
  list: {
    bcrypt: drivers.bcrypt({
      rounds: 10,
    }),
    scrypt: drivers.scrypt({
      cost: 16384,          
      blockSize: 8,         
      parallelization: 1,    
      maxMemory: 64 * 1024 * 1024,
    }),
  },
});

export default hashConfig;

/**
 * Extend the AdonisJS hash types
 */
declare module '@adonisjs/core/types' {
  export interface HashersList extends InferHashers<typeof hashConfig> {}
}
