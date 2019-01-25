import url from 'url'
import querystring from 'querystring'

/**
 * Decode an lndconnect url.
 * @param  {String} lndconnect url to parse.
 * @return {Object} Lnd connect data (object containing host, cert, and macaroon keys).
 */
const parse = (string = '') => {
  const res = {}
  const parsedUrl = url.parse(string)
  const parsedQuery = querystring.parse(parsedUrl.query)

  if (parsedUrl.protocol !== 'lndconnect:') {
    throw new Error('Invalid protocol')
  }

  return {
    host: parsedUrl.host,
    cert: parsedQuery.cert,
    macaroon: parsedQuery.macaroon,
  }
}

export default parse
