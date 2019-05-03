import base64url from 'base64url'
import decodeUriComponent from 'decode-uri-component'
import untildify from 'untildify'
import { isAbsolute } from './utils'

/**
 * decode a binary macaroon as a base64 decoded url string.
 * @param  {String} macaroonPath Path to macaroon file.
 * @return {Promise} decoded macaroon
 */
const decodeMacaroon = macaroonString => {
  if (!macaroonString) {
    return ''
  }

  const unescaped = decodeUriComponent(macaroonString)

  if (isAbsolute(untildify(unescaped))) {
    return unescaped
  }

  return base64url.toBuffer(unescaped).toString('hex')
}

export default decodeMacaroon
