'use strict'

import test from 'tape-promise/tape'
import path from 'path'
import os from 'os'

import { encodeCert, encodeMacaroon, encode, decode } from '../src'

const HOST = '1.2.3.4:10009'
const CERT =
  'MIICuDCCAl6gAwIBAgIQeubXIhKzlGo_scDmWj9VtzAKBggqhkjOPQQDAjA_MR8wHQYDVQQKExZsbmQgYXV0b2dlbmVyYXRlZCBjZXJ0MRwwGgYDVQQDExN0aGVkZWF0aG1hY2hpbmUubGFuMB4XDTE5MDEwMjExMzUxOVoXDTIwMDIyNzExMzUxOVowPzEfMB0GA1UEChMWbG5kIGF1dG9nZW5lcmF0ZWQgY2VydDEcMBoGA1UEAxMTdGhlZGVhdGhtYWNoaW5lLmxhbjBZMBMGByqGSM49AgEGCCqGSM49AwEHA0IABFosqs1rkSPwi6gOtuKSd7jMx8XSgadnbjWTbAH14-wFKYP7710JfosoikHW2dwZlUEfbeFNs33T2ifMTqD3hVujggE6MIIBNjAOBgNVHQ8BAf8EBAMCAqQwDwYDVR0TAQH_BAUwAwEB_zCCAREGA1UdEQSCAQgwggEEghN0aGVkZWF0aG1hY2hpbmUubGFugglsb2NhbGhvc3SCBHVuaXiCCnVuaXhwYWNrZXSHBH8AAAGHEAAAAAAAAAAAAAAAAAAAAAGHEP6AAAAAAAAAAAAAAAAAAAGHEP6AAAAAAAAAEOe3k9fX-f6HBMCoVs2HEP6AAAAAAAAAvPC7__6rGHCHEP6AAAAAAAAA8JND8_hwxvqHEP6AAAAAAAAA6rX1aP4vsbaHEP6AAAAAAAAAlbtYbhCVtbeHEP6AAAAAAAAALZmwBSSILp-HEP6AAAAAAAAAKNvxGH98fU-HEP6AAAAAAAAAvOC7LgFuUZGHEP6AAAAAAAAArt5I__4AESIwCgYIKoZIzj0EAwIDSAAwRQIhALwsEmlLQfARQOca0gbF8XnTofXHqnjkBhyO0vTgTH5lAiB-GU2TVpSAsPAoKv6XopMG_oMolgo5T1YByHu202p9Uw'
const MACAROON =
  'AgEDbG5kArsBAwoQ_Dvl5gsNFAUTkjbCq4w1_hIBMBoWCgdhZGRyZXNzEgRyZWFkEgV3cml0ZRoTCgRpbmZvEgRyZWFkEgV3cml0ZRoXCghpbnZvaWNlcxIEcmVhZBIFd3JpdGUaFgoHbWVzc2FnZRIEcmVhZBIFd3JpdGUaFwoIb2ZmY2hhaW4SBHJlYWQSBXdyaXRlGhYKB29uY2hhaW4SBHJlYWQSBXdyaXRlGhQKBXBlZXJzEgRyZWFkEgV3cml0ZQAABiBsG0xskPH_9m_383wpzL5oaB-a_GXkMF9_gfs9HFocfw'
const CONNECTION_STRING =
  'lndconnect://1.2.3.4:10009?cert=MIICuDCCAl6gAwIBAgIQeubXIhKzlGo_scDmWj9VtzAKBggqhkjOPQQDAjA_MR8wHQYDVQQKExZsbmQgYXV0b2dlbmVyYXRlZCBjZXJ0MRwwGgYDVQQDExN0aGVkZWF0aG1hY2hpbmUubGFuMB4XDTE5MDEwMjExMzUxOVoXDTIwMDIyNzExMzUxOVowPzEfMB0GA1UEChMWbG5kIGF1dG9nZW5lcmF0ZWQgY2VydDEcMBoGA1UEAxMTdGhlZGVhdGhtYWNoaW5lLmxhbjBZMBMGByqGSM49AgEGCCqGSM49AwEHA0IABFosqs1rkSPwi6gOtuKSd7jMx8XSgadnbjWTbAH14-wFKYP7710JfosoikHW2dwZlUEfbeFNs33T2ifMTqD3hVujggE6MIIBNjAOBgNVHQ8BAf8EBAMCAqQwDwYDVR0TAQH_BAUwAwEB_zCCAREGA1UdEQSCAQgwggEEghN0aGVkZWF0aG1hY2hpbmUubGFugglsb2NhbGhvc3SCBHVuaXiCCnVuaXhwYWNrZXSHBH8AAAGHEAAAAAAAAAAAAAAAAAAAAAGHEP6AAAAAAAAAAAAAAAAAAAGHEP6AAAAAAAAAEOe3k9fX-f6HBMCoVs2HEP6AAAAAAAAAvPC7__6rGHCHEP6AAAAAAAAA8JND8_hwxvqHEP6AAAAAAAAA6rX1aP4vsbaHEP6AAAAAAAAAlbtYbhCVtbeHEP6AAAAAAAAALZmwBSSILp-HEP6AAAAAAAAAKNvxGH98fU-HEP6AAAAAAAAAvOC7LgFuUZGHEP6AAAAAAAAArt5I__4AESIwCgYIKoZIzj0EAwIDSAAwRQIhALwsEmlLQfARQOca0gbF8XnTofXHqnjkBhyO0vTgTH5lAiB-GU2TVpSAsPAoKv6XopMG_oMolgo5T1YByHu202p9Uw&macaroon=AgEDbG5kArsBAwoQ_Dvl5gsNFAUTkjbCq4w1_hIBMBoWCgdhZGRyZXNzEgRyZWFkEgV3cml0ZRoTCgRpbmZvEgRyZWFkEgV3cml0ZRoXCghpbnZvaWNlcxIEcmVhZBIFd3JpdGUaFgoHbWVzc2FnZRIEcmVhZBIFd3JpdGUaFwoIb2ZmY2hhaW4SBHJlYWQSBXdyaXRlGhYKB29uY2hhaW4SBHJlYWQSBXdyaXRlGhQKBXBlZXJzEgRyZWFkEgV3cml0ZQAABiBsG0xskPH_9m_383wpzL5oaB-a_GXkMF9_gfs9HFocfw'

test('encodeCert', async t => {
  t.plan(1)

  const certPath = path.join(__dirname, 'fixtures', 'tls.cert')
  const cert = await encodeCert(certPath)

  t.equal(cert, CERT, 'generated encoded cert')
})

test('encodeMacaroon', async t => {
  t.plan(1)

  const macaroonPath = path.join(__dirname, 'fixtures', 'admin.macaroon')
  const macaroon = await encodeMacaroon(macaroonPath)

  t.equal(macaroon, MACAROON, 'generated encoded macaroon')
})

test('encode', t => {
  t.plan(1)

  const connectionString = encode({ host: HOST, macaroon: MACAROON, cert: CERT })

  t.equal(connectionString, CONNECTION_STRING, 'generated expected connection string')
})

test('decode', t => {
  t.plan(3)

  const connectionDetails = decode(CONNECTION_STRING)

  t.equal(connectionDetails.host, HOST, 'extracted host')
  t.equal(connectionDetails.cert, CERT, 'extracted cert')
  t.equal(connectionDetails.macaroon, MACAROON, 'extracted macaroon')
})
