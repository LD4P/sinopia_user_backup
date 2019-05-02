import AWS from 'aws-sdk'
import ExportUsers from '../src/ExportUsers'
import CognitoFake from '../__mocks__/cognito-fake'
import CognitoPaginationFake from '../__mocks__/cognito-pagination-fake'

describe('ExportUsers', () => {
  const exporter = new ExportUsers()

  describe('constructor()', () => {
    it('sets cognito', () => {
      expect(exporter.cognito).toBeInstanceOf(AWS.CognitoIdentityServiceProvider)
    })
  })

  describe('export()', () => {
    const logSpy = jest.spyOn(console, 'log')

    describe('without pagination', () => {
      beforeAll(() => {
        exporter.cognito = new CognitoFake()
      })

      it('logs a message', async () => {
        await exporter.export()
        expect(logSpy).toHaveBeenCalledWith('Users exported from Cognito')
      })

      it('returns a list of users', async () => {
        const userList = await exporter.export()
        expect(userList).toEqual([{"Username":"user1"},{"Username":"user2"}])
      })
    })

    describe('with pagination', () => {
      // NOTE: Using beforeEach instead of beforeAll because the pagination fake stores the state of whether listUsers() has been called already
      beforeEach(() => {
        exporter.cognito = new CognitoPaginationFake()
      })

      it('logs a message', async () => {
        await exporter.export()
        expect(logSpy).toHaveBeenCalledWith('Users exported from Cognito')
      })

      it('returns a list of users', async () => {
        const userList = await exporter.export()
        expect(userList).toEqual([{"Username":"user1"},{"Username":"user2"}])
      })
    })
  })
})
