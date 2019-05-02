import AWS from 'aws-sdk'
import config from 'config'
import { configureAWS } from './configureAWS'

export default class ExportUsers {
  constructor() {
    AWS.config = configureAWS(AWS.config)
    this.cognito = new AWS.CognitoIdentityServiceProvider()
  }

  async export() {
    const params = { UserPoolId: config.get('userPoolId') }

    const paginationCalls = async (exportedUsers = []) => {
      const { Users = [], PaginationToken } = await this.cognito.listUsers(params).promise()

      const combinedUsers = exportedUsers.concat(Users)

      if (PaginationToken) {
        params.PaginationToken = PaginationToken
        return await paginationCalls(combinedUsers)
      }

      return combinedUsers
    }

    const userList = await paginationCalls()
    console.log('Users exported from Cognito')
    return userList
  }
}
