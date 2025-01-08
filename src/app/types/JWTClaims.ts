import { JWTClaimRole } from './JWTClaimRole';

/**
 * Represents the claims of a JWT token.
 */
export type JWTClaims = {
  [role in JWTClaimRole]?: string;
} & {
  exp: number;
};
