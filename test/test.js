'use strict'

import test from 'tape-promise/tape'
import path from 'path'
import os from 'os'
import fs from 'fs'
import util from 'util'
const readFile = util.promisify(fs.readFile)

import { encodeCert, decodeCert, decodeMacaroon, encodeMacaroon, encode, decode, format } from '../src'

const HOSTNAME = '1.2.3.4'
const PORT = '10009'
const CERT_PATH = '/path/to/cert file'
const ENCODED_CERT_PATH = '%2Fpath%2Fto%2Fcert%20file'
const CERT = `-----BEGIN CERTIFICATE-----
MIICuDCCAl6gAwIBAgIQeubXIhKzlGo/scDmWj9VtzAKBggqhkjOPQQDAjA/MR8w
HQYDVQQKExZsbmQgYXV0b2dlbmVyYXRlZCBjZXJ0MRwwGgYDVQQDExN0aGVkZWF0
aG1hY2hpbmUubGFuMB4XDTE5MDEwMjExMzUxOVoXDTIwMDIyNzExMzUxOVowPzEf
MB0GA1UEChMWbG5kIGF1dG9nZW5lcmF0ZWQgY2VydDEcMBoGA1UEAxMTdGhlZGVh
dGhtYWNoaW5lLmxhbjBZMBMGByqGSM49AgEGCCqGSM49AwEHA0IABFosqs1rkSPw
i6gOtuKSd7jMx8XSgadnbjWTbAH14+wFKYP7710JfosoikHW2dwZlUEfbeFNs33T
2ifMTqD3hVujggE6MIIBNjAOBgNVHQ8BAf8EBAMCAqQwDwYDVR0TAQH/BAUwAwEB
/zCCAREGA1UdEQSCAQgwggEEghN0aGVkZWF0aG1hY2hpbmUubGFugglsb2NhbGhv
c3SCBHVuaXiCCnVuaXhwYWNrZXSHBH8AAAGHEAAAAAAAAAAAAAAAAAAAAAGHEP6A
AAAAAAAAAAAAAAAAAAGHEP6AAAAAAAAAEOe3k9fX+f6HBMCoVs2HEP6AAAAAAAAA
vPC7//6rGHCHEP6AAAAAAAAA8JND8/hwxvqHEP6AAAAAAAAA6rX1aP4vsbaHEP6A
AAAAAAAAlbtYbhCVtbeHEP6AAAAAAAAALZmwBSSILp+HEP6AAAAAAAAAKNvxGH98
fU+HEP6AAAAAAAAAvOC7LgFuUZGHEP6AAAAAAAAArt5I//4AESIwCgYIKoZIzj0E
AwIDSAAwRQIhALwsEmlLQfARQOca0gbF8XnTofXHqnjkBhyO0vTgTH5lAiB+GU2T
VpSAsPAoKv6XopMG/oMolgo5T1YByHu202p9Uw==
-----END CERTIFICATE-----`
const ENCODED_CERT =
  'MIICuDCCAl6gAwIBAgIQeubXIhKzlGo_scDmWj9VtzAKBggqhkjOPQQDAjA_MR8wHQYDVQQKExZsbmQgYXV0b2dlbmVyYXRlZCBjZXJ0MRwwGgYDVQQDExN0aGVkZWF0aG1hY2hpbmUubGFuMB4XDTE5MDEwMjExMzUxOVoXDTIwMDIyNzExMzUxOVowPzEfMB0GA1UEChMWbG5kIGF1dG9nZW5lcmF0ZWQgY2VydDEcMBoGA1UEAxMTdGhlZGVhdGhtYWNoaW5lLmxhbjBZMBMGByqGSM49AgEGCCqGSM49AwEHA0IABFosqs1rkSPwi6gOtuKSd7jMx8XSgadnbjWTbAH14-wFKYP7710JfosoikHW2dwZlUEfbeFNs33T2ifMTqD3hVujggE6MIIBNjAOBgNVHQ8BAf8EBAMCAqQwDwYDVR0TAQH_BAUwAwEB_zCCAREGA1UdEQSCAQgwggEEghN0aGVkZWF0aG1hY2hpbmUubGFugglsb2NhbGhvc3SCBHVuaXiCCnVuaXhwYWNrZXSHBH8AAAGHEAAAAAAAAAAAAAAAAAAAAAGHEP6AAAAAAAAAAAAAAAAAAAGHEP6AAAAAAAAAEOe3k9fX-f6HBMCoVs2HEP6AAAAAAAAAvPC7__6rGHCHEP6AAAAAAAAA8JND8_hwxvqHEP6AAAAAAAAA6rX1aP4vsbaHEP6AAAAAAAAAlbtYbhCVtbeHEP6AAAAAAAAALZmwBSSILp-HEP6AAAAAAAAAKNvxGH98fU-HEP6AAAAAAAAAvOC7LgFuUZGHEP6AAAAAAAAArt5I__4AESIwCgYIKoZIzj0EAwIDSAAwRQIhALwsEmlLQfARQOca0gbF8XnTofXHqnjkBhyO0vTgTH5lAiB-GU2TVpSAsPAoKv6XopMG_oMolgo5T1YByHu202p9Uw'

const MACAROON_PATH = '/path/to/macaroon file'
const ENCODED_MACAROON_PATH = '%2Fpath%2Fto%2Fmacaroon%20file'
const MACAROON =
  '0201036c6e6402bb01030a10fc3be5e60b0d1405139236c2ab8c35fe1201301a160a0761646472657373120472656164120577726974651a130a04696e666f120472656164120577726974651a170a08696e766f69636573120472656164120577726974651a160a076d657373616765120472656164120577726974651a170a086f6666636861696e120472656164120577726974651a160a076f6e636861696e120472656164120577726974651a140a05706565727312047265616412057772697465000006206c1b4c6c90f1fff66ff7f37c29ccbe68681f9afc65e4305f7f81fb3d1c5a1c7f'
const ENCODED_MACAROON =
  'AgEDbG5kArsBAwoQ_Dvl5gsNFAUTkjbCq4w1_hIBMBoWCgdhZGRyZXNzEgRyZWFkEgV3cml0ZRoTCgRpbmZvEgRyZWFkEgV3cml0ZRoXCghpbnZvaWNlcxIEcmVhZBIFd3JpdGUaFgoHbWVzc2FnZRIEcmVhZBIFd3JpdGUaFwoIb2ZmY2hhaW4SBHJlYWQSBXdyaXRlGhYKB29uY2hhaW4SBHJlYWQSBXdyaXRlGhQKBXBlZXJzEgRyZWFkEgV3cml0ZQAABiBsG0xskPH_9m_383wpzL5oaB-a_GXkMF9_gfs9HFocfw'
const CONNECTION_STRING =
  'lndconnect://1.2.3.4:10009?cert=MIICuDCCAl6gAwIBAgIQeubXIhKzlGo_scDmWj9VtzAKBggqhkjOPQQDAjA_MR8wHQYDVQQKExZsbmQgYXV0b2dlbmVyYXRlZCBjZXJ0MRwwGgYDVQQDExN0aGVkZWF0aG1hY2hpbmUubGFuMB4XDTE5MDEwMjExMzUxOVoXDTIwMDIyNzExMzUxOVowPzEfMB0GA1UEChMWbG5kIGF1dG9nZW5lcmF0ZWQgY2VydDEcMBoGA1UEAxMTdGhlZGVhdGhtYWNoaW5lLmxhbjBZMBMGByqGSM49AgEGCCqGSM49AwEHA0IABFosqs1rkSPwi6gOtuKSd7jMx8XSgadnbjWTbAH14-wFKYP7710JfosoikHW2dwZlUEfbeFNs33T2ifMTqD3hVujggE6MIIBNjAOBgNVHQ8BAf8EBAMCAqQwDwYDVR0TAQH_BAUwAwEB_zCCAREGA1UdEQSCAQgwggEEghN0aGVkZWF0aG1hY2hpbmUubGFugglsb2NhbGhvc3SCBHVuaXiCCnVuaXhwYWNrZXSHBH8AAAGHEAAAAAAAAAAAAAAAAAAAAAGHEP6AAAAAAAAAAAAAAAAAAAGHEP6AAAAAAAAAEOe3k9fX-f6HBMCoVs2HEP6AAAAAAAAAvPC7__6rGHCHEP6AAAAAAAAA8JND8_hwxvqHEP6AAAAAAAAA6rX1aP4vsbaHEP6AAAAAAAAAlbtYbhCVtbeHEP6AAAAAAAAALZmwBSSILp-HEP6AAAAAAAAAKNvxGH98fU-HEP6AAAAAAAAAvOC7LgFuUZGHEP6AAAAAAAAArt5I__4AESIwCgYIKoZIzj0EAwIDSAAwRQIhALwsEmlLQfARQOca0gbF8XnTofXHqnjkBhyO0vTgTH5lAiB-GU2TVpSAsPAoKv6XopMG_oMolgo5T1YByHu202p9Uw&macaroon=AgEDbG5kArsBAwoQ_Dvl5gsNFAUTkjbCq4w1_hIBMBoWCgdhZGRyZXNzEgRyZWFkEgV3cml0ZRoTCgRpbmZvEgRyZWFkEgV3cml0ZRoXCghpbnZvaWNlcxIEcmVhZBIFd3JpdGUaFgoHbWVzc2FnZRIEcmVhZBIFd3JpdGUaFwoIb2ZmY2hhaW4SBHJlYWQSBXdyaXRlGhYKB29uY2hhaW4SBHJlYWQSBXdyaXRlGhQKBXBlZXJzEgRyZWFkEgV3cml0ZQAABiBsG0xskPH_9m_383wpzL5oaB-a_GXkMF9_gfs9HFocfw'

test('encodeCert (data)', async t => {
  t.plan(1)
  const certPath = path.join(__dirname, 'fixtures', 'tls.cert')
  const certFile = await readFile(certPath)
  const cert = encodeCert(certFile)
  t.equal(cert, ENCODED_CERT, 'encoded cert data')
})

test('encodeCert (path)', async t => {
  t.plan(1)
  const cert = encodeCert(CERT_PATH)
  t.equal(cert, ENCODED_CERT_PATH, 'encoded cert path')
})

test('decodeCert', async t => {
  t.plan(1)
  const decodedCert = decodeCert(ENCODED_CERT)
  t.equal(decodedCert, CERT, 'decoded cert')
})

test('decodeCert (path)', async t => {
  t.plan(1)
  const decodedCert = decodeCert(ENCODED_CERT_PATH)
  t.equal(decodedCert, CERT_PATH, 'decoded cert')
})

test('encodeMacaroon (data)', async t => {
  t.plan(1)
  const macaroonPath = path.join(__dirname, 'fixtures', 'admin.macaroon')
  const macaroonFile = await readFile(macaroonPath)
  const macaroon = encodeMacaroon(macaroonFile)
  t.equal(macaroon, ENCODED_MACAROON, 'encoded macaroon')
})

test('encodeMacaroon (path)', async t => {
  t.plan(1)
  const cert = encodeMacaroon(MACAROON_PATH)
  t.equal(cert, ENCODED_MACAROON_PATH, 'encoded macaroon path')
})

test('decodeMacaroon', async t => {
  t.plan(1)
  const decodedMacaroon = decodeMacaroon(ENCODED_MACAROON)
  t.equal(decodedMacaroon, MACAROON, 'decoded macaroon')
})

test('decodeMacaroon (path)', async t => {
  t.plan(1)
  const decodedMacaroon = decodeMacaroon(ENCODED_MACAROON_PATH)
  t.equal(decodedMacaroon, MACAROON_PATH, 'decoded macaroon')
})

test('format', t => {
  t.plan(1)
  const connectionString = format({ host: `${HOSTNAME}:${PORT}`, macaroon: ENCODED_MACAROON, cert: ENCODED_CERT })
  t.equal(connectionString, CONNECTION_STRING, 'generated expected connection string')
})

test('encode', t => {
  t.plan(1)
  const connectionString = encode({ host: `${HOSTNAME}:${PORT}`, macaroon: MACAROON, cert: CERT })
  t.equal(connectionString, CONNECTION_STRING, 'generated expected connection string')
})

test('decode (valid)', t => {
  t.plan(3)
  const connectionDetails = decode(CONNECTION_STRING)
  t.equal(connectionDetails.host, `${HOSTNAME}:${PORT}`, 'extracted host')
  t.equal(connectionDetails.cert, CERT, 'extracted cert')
  t.equal(connectionDetails.macaroon, MACAROON, 'extracted macaroon')
})

test('decode (invalid protocol)', t => {
  t.plan(1)
  t.throws(() => decode('111' + CONNECTION_STRING), /Invalid protocol/, 'throws an "Invalid protocol" error')
})
