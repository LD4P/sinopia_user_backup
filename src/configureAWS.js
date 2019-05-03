import AWS from 'aws-sdk'
import config from 'config'

export const configureAWS = configuration => {
  configuration.update({ region: config.get('awsRegion') })

  configuration.credentials = new AWS.Credentials({
    accessKeyId: config.get('awsAccessKey'), secretAccessKey: config.get('awsAccessSecret')
  })

  return configuration
}
