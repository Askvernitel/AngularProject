/**
 * Represents the possible roles that can be assigned to a JWT (JSON Web Token) claim.
 * @see https://tools.ietf.org/html/rfc7519
 */
export type JWTClaimRole =
  | 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'
  | 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname'
  | 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'
  | 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/upn'
  | 'http://schemas.xmlsoap.org/claims/CommonName'
  | 'http://schemas.xmlsoap.org/claims/EmailAddress'
  | 'http://schemas.xmlsoap.org/claims/Group'
  | 'http://schemas.xmlsoap.org/claims/UPN'
  | 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
  | 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname'
  | 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/privatepersonalidentifier'
  | 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
  | 'http://schemas.microsoft.com/ws/2008/06/identity/claims/authenticationmethod'
  | 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/denyonlysid'
  | 'http://schemas.microsoft.com/ws/2008/06/identity/claims/denyonlyprimarysid'
  | 'http://schemas.microsoft.com/ws/2008/06/identity/claims/denyonlyprimarygroupsid'
  | 'http://schemas.microsoft.com/ws/2008/06/identity/claims/groupsid'
  | 'http://schemas.microsoft.com/ws/2008/06/identity/claims/primarygroupsid'
  | 'http://schemas.microsoft.com/ws/2008/06/identity/claims/primarysid'
  | 'http://schemas.microsoft.com/ws/2008/06/identity/claims/windowsaccountname';
