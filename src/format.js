import url from 'url'

/**
 * Generate an lndconnect url.
 * @param  {Object} data Data to format (object containing host, cert, and macaroon keys).
 * @return {String} lndconnect url.
 */
const format = data => {
  const { cert, macaroon, host } = data
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

export default format
