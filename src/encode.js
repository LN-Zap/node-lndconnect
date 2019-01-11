import url from 'url'

/**
 * Generate an lndconnect url.
 * @param  {Object} data Data to encode (object containing host, cert, and macaroon keys).
 * @return {String} lndconnect url.
 */
const encode = data => {
  const cert = data.cert
  const macaroon = data.macaroon
  const host = data.host
  return url.format({
    protocol: 'lndconnect',
    slashes: true,
    host,
    query: {
      cert,
      macaroon,
    },
  })
}

export default encode
