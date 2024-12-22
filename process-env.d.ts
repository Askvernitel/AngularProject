import type { IntClosedRange } from 'type-fest';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_URL?: string;
      PORT?: string;
    }
  }
}

export {};
