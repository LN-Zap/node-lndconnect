import url from 'url'
import querystring from 'querystring'
import decodeCert from './decodeCert'
import decodeMacaroon from './decodeMacaroon'

/**
 * Decode an lndconnect url.
 * @param  {String} lndconnect url to decode.
 * @return {Object} Lnd connect data (object containing host, cert, and macaroon keys).
 */
const decode = string => {
  const res = {}
  const parsedUrl = url.parse(string)
  const parsedQuery = querystring.parse(parsedUrl.query)

  if (parsedUrl.protocol !== 'lndconnect:') {
    throw new Error('Invalid protocol')
  }

  return {
    host: parsedUrl.host,
    cert: decodeCert(parsedQuery.cert),
    macaroon: decodeMacaroon(parsedQuery.macaroon),
  }
}

export default decode
