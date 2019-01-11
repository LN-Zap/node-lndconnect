import path from 'path'
import fs from 'fs'
import os from 'os'
import url from 'url'
import querystring from 'querystring'
import util from 'util'
import base64url from 'base64url'

const readFile = util.promisify(fs.readFile)

/**
 * Encode a tls certificate as a base64 encoded url string.
 * @param  {String} certPath Path to vertificate file.
 * @return {Promise} Encoded certificate
 */
export const encodeCert = async certPath => {
  const certData = await readFile(certPath, 'utf8')
  var lines = certData.split(/\n/)
  lines = lines.filter(line => line != '')
  lines.pop()
  lines.shift()
  return base64url.fromBase64(lines.join(''))
}

/**
 * Encode a binary macaroon as a base64 encoded url string.
 * @param  {String} macaroonPath Path to macaroon file.
 * @return {Promise} Encoded macaroon
 */
export const encodeMacaroon = async macaroonPath => {
  const macaroonData = await readFile(macaroonPath)
  const macaroonBase64 = new Buffer.from(macaroonData, 'binary').toString('base64')
  return base64url.fromBase64(macaroonBase64)
}

/**
 * Generate an lndconnect url.
 * @param  {Object} data Data to encode (object containing host, cert, and macaroon keys).
 * @return {String} lndconnect url.
 */
export const encode = data => {
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

/**
 * Decode an lndconnect url.
 * @param  {String} lndconnect url to decode.
 * @return {Object} Lnd connect data (object containing host, cert, and macaroon keys).
 */
export const decode = string => {
  const parsedUrl = url.parse(string)
  const parsedQuery = querystring.parse(parsedUrl.query)
  return {
    host: parsedUrl.host,
    cert: parsedQuery.cert,
    macaroon: parsedQuery.macaroon,
  }
}

export default {
  encodeCert,
  encodeMacaroon,
  encode,
  decode,
}
