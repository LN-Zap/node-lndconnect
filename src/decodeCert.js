import path from 'path'
import base64url from 'base64url'

/**
 * decode a tls certificate from a base64 encoded url string.
 * @param  {String} certString base64url encoded string to decode
 * @return {Promise} decoded certificate
 */
const decodeCert = certString => {
  if (!certString) {
    return ''
  }

  const unescaped = base64url.decode(certString)

  if (path.isAbsolute(unescaped)) {
    return unescaped
  }

  const cert = base64url.toBase64(certString)
  var prefix = '-----BEGIN CERTIFICATE-----\n'
  var postfix = '-----END CERTIFICATE-----'
  return prefix + cert.match(/.{0,64}/g).join('\n') + postfix
}

export default decodeCert
