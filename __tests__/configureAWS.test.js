import AWS from 'aws-sdk'
import cloneDeep from 'lodash/cloneDeep'
import { configureAWS } from '../src/configureAWS'

describe('configureAWS', () => {
  let configuration = AWS.config

  describe('initial', () => {
    test('region is undefined', () => {
      expect(configuration.region).toBeUndefined()
    })
    test('credentials are null', () => {
      // NOTE: If this test fails for you, it's because the `import AWS` above
      // auto-loaded credentials from ~/.aws/credentials. This is why the `npm
      // test` script includes `AWS_PROFILE=foobarbazquux`, to cause this
      // auto-loading to fail.
      expect(configuration.credentials).toBeNull()
    })
  })
  describe('changed configuration', () => {
    // Avoid mutating global state since these tests can run before the ones above
    const newConfig = configureAWS(cloneDeep(configuration))

    it('has a region', () => {
      expect(newConfig.region).toEqual('my-region-1')
    })
    it('has updated credentials', () => {
      expect(newConfig.credentials.accessKeyId).toEqual('key')
      expect(newConfig.credentials.secretAccessKey).toEqual('secret')
    })
  })
})
