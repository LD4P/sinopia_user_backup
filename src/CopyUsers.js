import AWS from 'aws-sdk'
import config from 'config'
import { configureAWS } from './configureAWS'

export default class CopyUsers {
  constructor(userList) {
    AWS.config = configureAWS(AWS.config)
    this.userListString = JSON.stringify(userList)
    this.s3 = new AWS.S3()
    const timestamp = new Date().toISOString()
    const datestamp = timestamp.slice(0, 10)
    this.objectKey = `${datestamp}/user-backup_${timestamp}_${config.get('userPoolId')}.json`
  }

  copy() {
    this.s3.putObject({
      Body: this.userListString,
      Bucket: config.get('s3Bucket'),
      Key: this.objectKey
    }, error => {
      if (error) {
        console.error(`error copying backup to S3: ${error}`)
        return
      }
      console.log('Users backed up to S3')
    })
  }
}
