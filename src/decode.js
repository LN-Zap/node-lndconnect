import url from 'url'
import querystring from 'querystring'

/**
 * Decode an lndconnect url.
 * @param  {String} lndconnect url to decode.
 * @return {Object} Lnd connect data (object containing host, cert, and macaroon keys).
 */
const decode = string => {
  const parsedUrl = url.parse(string)
  const parsedQuery = querystring.parse(parsedUrl.query)
  return {
    host: parsedUrl.host,
    cert: parsedQuery.cert,
    macaroon: parsedQuery.macaroon,
  }
}

export default decode
