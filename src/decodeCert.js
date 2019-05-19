import base64url from 'base64url'
import decodeUriComponent from 'decode-uri-component'
import untildify from 'untildify'
import { isAbsolute } from './utils'

/**
 * decode a tls certificate from a base64 encoded url string.
 * @param  {String} certString base64url encoded string to decode
 * @return {String} decoded certificate
 */
const decodeCert = certString => {
  if (!certString) {
    return ''
  }

  const unescaped = decodeUriComponent(certString)

  if (isAbsolute(untildify(unescaped))) {
    return unescaped
  }

  const cert = base64url.toBase64(unescaped)
  var prefix = '-----BEGIN CERTIFICATE-----\n'
  var postfix = '-----END CERTIFICATE-----'
  return prefix + cert.match(/.{0,64}/g).join('\n') + postfix
}

export default decodeCert
