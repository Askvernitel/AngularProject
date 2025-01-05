import { JWTClaimRole } from './JWTClaimRole';

export type JWTClaims = {
  [role in JWTClaimRole]?: string;
} & {
  exp: number;
};
