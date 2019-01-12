import base64url from 'base64url'

/**
 * decode a binary macaroon as a base64 decoded url string.
 * @param  {String} macaroonPath Path to macaroon file.
 * @return {Promise} decoded macaroon
 */
const decodeMacaroon = macaroonString => {
  return base64url.toBuffer(macaroonString).toString('hex')
}

export default decodeMacaroon
