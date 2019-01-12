import path from 'path'
import fs from 'fs'
import util from 'util'
import base64url from 'base64url'

const readFile = util.promisify(fs.readFile)

/**
 * Encode a tls certificate as a base64 encoded url string.
 * @param  {String} certPath Path to vertificate file.
 * @return {Promise} Encoded certificate
 */
const encodeCert = async certPath => {
  const certData = await readFile(certPath, 'utf8')
  var lines = certData.split(/\n/)
  lines = lines.filter(line => line != '')
  lines.pop()
  lines.shift()
  return base64url.encode(lines.join(''))
}

export default encodeCert
