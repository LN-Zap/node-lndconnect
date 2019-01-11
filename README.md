# lndconnect

[![](https://img.shields.io/badge/project-LND-blue.svg?style=flat-square)](https://github.com/lightningnetwork/lnd)
[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)
[![Dependency Status](https://david-dm.org/LN-Zap/lndconnect.svg?style=flat-square)](https://david-dm.org/LN-Zap/lndconnect)
[![Build Status](https://travis-ci.org/LN-Zap/lndconnect.svg?branch=master)](https://travis-ci.org/LN-Zap/lndconnect)

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

**encodeCert(certPath<string>):**

```javascript
const certPath = path.join(__dirname, 'tls.cert')
const cert = await encodeCert(certPath)
expect(cert).toEqual('MIICuDCCAl...')
```

**encodeMacaroon(macaroonPath<string>):**

```javascript
const macaroonPath = path.join(__dirname, 'admin.macaroon')
const macaroon = await encodeMacaroon(macaroonPath)
expect(macaroon).toEqual('macaroon=AgEDbG5kAr...')
```

**encode({ host<string>, cert<string>, macaroon<string> }):**

```javascript
const connectionString = encode({
  host: '1.2.3.4:10009',
  cert: 'MIICuDCCAl...',
  macaroon: 'AgEDbG5kAr...',
})

expect(connectionString).toEqual('lndconnect://1.2.3.4:10009?cert=MIICuDCCAl...&macaroon=AgEDbG5kAr...')
```

**decode({ host<string>, cert<string>, macaroon<string> }):**

```javascript
const { host, cert, macaroon } decode('lndconnect://1.2.3.4:10009?cert=MIICuDCCAl...&macaroon=AgEDbG5kAr...')

expect(host).toEqual('1.2.3.4:10009')
expect(cert).toEqual('cert=MIICuDCCAl...')
expect(macaroon).toEqual('macaroon=AgEDbG5kAr...')
```

### Testing

Run the tests suite:

```bash
  npm test
```

## Maintainers

[@Tom Kirkpatrick (mrfelton)](https://github.com/mrfelton).

## Contribute

Feel free to dive in! [Open an issue](https://github.com/LN-Zap/lndconnect/issues/new) or submit PRs.

lndconnect follows the [Contributor Covenant](http://contributor-covenant.org/version/1/3/0/) Code of Conduct.

## License

[MIT](LICENSE) © Tom Kirkpatrick
