import path from 'path'
import base64url from 'base64url'

/**
 * decode a binary macaroon as a base64 decoded url string.
 * @param  {String} macaroonPath Path to macaroon file.
 * @return {Promise} decoded macaroon
 */
const decodeMacaroon = macaroonString => {
  if (!macaroonString) {
    return ''
  }

  const unescaped = base64url.decode(macaroonString)

  if (path.isAbsolute(unescaped)) {
    return unescaped
  }

  return base64url.toBuffer(macaroonString).toString('hex')
}

export default decodeMacaroon
