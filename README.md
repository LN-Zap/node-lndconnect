# lndconnect

[![](https://img.shields.io/badge/project-LND-blue.svg?style=flat-square)](https://github.com/lightningnetwork/lnd)
[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)
[![Dependency Status](https://david-dm.org/LN-Zap/node-lndconnect.svg?style=flat-square)](https://david-dm.org/LN-Zap/node-lndconnect)
[![Build Status](https://travis-ci.org/LN-Zap/node-lndconnect.svg?branch=master)](https://travis-ci.org/LN-Zap/node-lndconnect)

> Generate and parse lndconnect uris https://github.com/LN-Zap/lndconnect ⚡️

This package provides utilities for generating and parsing lndconnect uris.

For more information take a look at the [specification of the uri format](https://github.com/LN-Zap/lndconnect/blob/master/lnd_connect_uri.md).

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Maintainers](#maintainers)
- [Contribute](#contribute)
- [License](#license)

## Install

```
npm install lndconnect --save
```

## Usage

**format({ host, cert, macaroon }):**

Formats a host / cert / macaroon combo into an lndconnect link.

```javascript
import { format } from 'lndconnect'

const connectionString = format({
  host: '1.2.3.4:10009',
  cert: 'MIICuDCCAl...',
  macaroon: '0201036c6...',
})

expect(connectionString).toEqual('lndconnect://1.2.3.4:10009?cert=MIICuDCCAl...&macaroon=0201036c6...')
```

**encode({ host, cert, macaroon }):**

Encodes a host / cert / macaroon combo and formats into an lndconnect link.

```javascript
import { encode } from 'lndconnect'

const connectionString = encode({
  host: '1.2.3.4:10009',
  cert: '-----BEGIN CERTIFICATE-----\n...',
  macaroon: '0201036c6...',
})

expect(connectionString).toEqual('lndconnect://1.2.3.4:10009?cert=MIICuDCCAl...&macaroon=AgEDbG5kAr...')
```

**decode(lndconnectUri):**

Decodes an lndconnect link into it's component parts (host / cert as utf8 / macaroon as hex)

```javascript
import { decode } from 'lndconnect'

const { host, cert, macaroon } = decode('lndconnect://1.2.3.4:10009?cert=MIICuDCCAl...&macaroon=AgEDbG5kAr...')

expect(host).toEqual('1.2.3.4:10009')
expect(cert).toEqual('MIICuDCCAl...')
expect(macaroon).toEqual('0201036c6...')
```

#### Certificate

**encodeCert(cert, format):**

Encodes a certificate (String or Buffer) to base64url encoded DER format.

```javascript
import { encodeCert } from 'lndconnect'

const certPath = path.join(__dirname, 'tls.cert')
const cert = encodeCert(certPath)

// returns base64url encoded DER cert.
expect(cert).toEqual('MIICuDCCAl...')
```

**decodeCert(encodedCert):**

Decodes a certificate from base64url encoded DER format to a string.

```javascript
import { decodeCert } from 'lndconnect'

// pass a base64url encoded DER cert
const cert = decodeCert(encodedCert)

// returns utf8 encoded PEM cert.
expect(cert).toEqual('-----BEGIN CERTIFICATE-----\n...')
```

#### Macaroon

**encodeMacaroon(macaroon, format):**

Encodes a binary macaroon (String or Buffer) to base64url encoded string.

```javascript
import { encodeMacaroon } from 'lndconnect'

const macaroonPath = path.join(__dirname, 'admin.macaroon')
const macaroon = encodeMacaroon(macaroonPath)

// returns base64url encoded macaroon.
expect(macaroon).toEqual('AgEDbG5kAr...')
```

**decodeMacaroon(encodedMacaroon):**

Decodes a base64url encoded macaroon to a hex encoded macaroon.

```javascript
import { decodeMacaroon } from 'lndconnect'

// pass a base64url encoded macaroon
const macaroon = decodeMacaroon(encodedMacaroon)

// returns hex encoded macaroon.
expect(macaroon).toEqual('0201036c6...')
```

### Testing

Run the tests suite:

```bash
  npm test
```

## Maintainers

[@Tom Kirkpatrick (mrfelton)](https://github.com/mrfelton).

## Contribute

Feel free to dive in! [Open an issue](https://github.com/LN-Zap/node-lndconnect/issues/new) or submit PRs.

lndconnect follows the [Contributor Covenant](http://contributor-covenant.org/version/1/3/0/) Code of Conduct.

## License

[MIT](LICENSE) © Tom Kirkpatrick
