import AWS from 'aws-sdk'
import CopyUsers from '../src/CopyUsers'
import S3ErrorFake from '../__mocks__/s3-error-fake'
import S3SuccessFake from '../__mocks__/s3-success-fake'

describe('CopyUsers', () => {
  const userList = [
    { Username: 'user1' },
    { Username: 'user2' },
  ]
  const copier = new CopyUsers(userList)

  describe('constructor()', () => {
    it('sets userListString', () => {
      expect(copier.userListString).toEqual("[{\"Username\":\"user1\"},{\"Username\":\"user2\"}]")
    })
    it('sets s3', () => {
      expect(copier.s3).toBeInstanceOf(AWS.S3)
    })
    it('sets objectKey', () => {
      // Matches: {ISO DATE}/{AWS_REGION}_{USER_POOL_ID}.json
      expect(copier.objectKey).toMatch(/\d{4}-\d{2}-\d{2}\/user-backup_\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d+Z_my-region-1_uSeRPoOlId\.json/)
    })
  })

  describe('copy()', () => {
    const logSpy = jest.spyOn(console, 'log')
    const errorSpy = jest.spyOn(console, 'error')

    describe('when successful', () => {
      beforeAll(() => {
        copier.s3 = new S3SuccessFake()
      })

      it('calls putObject() on this.s3 and logs a non-error message', () => {
        const s3Spy = jest.spyOn(copier.s3, 'putObject')
        copier.copy()
        expect(s3Spy).toHaveBeenCalledWith({
          Body: "[{\"Username\":\"user1\"},{\"Username\":\"user2\"}]",
          Bucket: 'my-bucket-name',
          // The key value includes an ISO representation of a timestamp, so
          // without gnarly date/time mocking, this is the best I could do here.
          Key: expect.any(String)
        }, expect.any(Function))
        expect(logSpy).toHaveBeenCalledWith('Users backed up to S3')
        expect(errorSpy).not.toHaveBeenCalled()
      })
    })

    describe('when it errors out', () => {
      beforeAll(() => {
        copier.s3 = new S3ErrorFake()
      })

      it('calls putObject() on this.s3 and logs an error', () => {
        const s3Spy = jest.spyOn(copier.s3, 'putObject')
        copier.copy()
        expect(s3Spy).toHaveBeenCalledWith({
          Body: "[{\"Username\":\"user1\"},{\"Username\":\"user2\"}]",
          Bucket: 'my-bucket-name',
          Key: expect.any(String)
        }, expect.any(Function))
        expect(logSpy).not.toHaveBeenCalled()
        expect(errorSpy).toHaveBeenCalledWith('error copying backup to S3: uh oh')
      })
    })
  })
})
