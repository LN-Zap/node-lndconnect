import encodeCert from './encodeCert'
import encodeMacaroon from './encodeMacaroon'
import format from './format'

/**
 * Generate an lndconnect url.
 * @param  {Object} data Data to encode (object containing host, cert, and macaroon keys).
 * @return {String} lndconnect url.
 */
const encode = (data = {}) => {
  const cert = encodeCert(data.cert)
  const macaroon = encodeMacaroon(data.macaroon)
  const host = data.host

  return format({ host, cert, macaroon })
}

export default encode
