import { JWTClaims } from '@app/types/JWTClaims';

export type ParsedJWTClaims = Required<
  Pick<
    JWTClaims,
    | 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'
    | 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
    | 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname'
    | 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname'
    | 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
    | 'exp'
  >
>;
