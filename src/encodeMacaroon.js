import fs from 'fs'
import util from 'util'
import base64url from 'base64url'

const readFile = util.promisify(fs.readFile)

/**
 * Encode a binary macaroon as a base64 encoded url string.
 * @param  {String} macaroonPath Path to macaroon file.
 * @return {Promise} Encoded macaroon
 */
const encodeMacaroon = async macaroonPath => {
  const macaroonData = await readFile(macaroonPath)
  const macaroonBase64 = new Buffer.from(macaroonData, 'binary').toString('base64')
  return base64url.fromBase64(macaroonBase64)
}

export default encodeMacaroon
