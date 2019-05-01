import AWS from 'aws-sdk'
import { backupUsers } from 'cognito-backup-restore'
import config from 'config'
import fs from 'fs'

AWS.config.update({ region: config.get('awsRegion') })

AWS.config.credentials = new AWS.Credentials({
  accessKeyId: config.get('awsAccessKey'), secretAccessKey: config.get('awsAccessSecret')
})

const cognito = new AWS.CognitoIdentityServiceProvider();
const s3 = new AWS.S3()

const timestamp = new Date().toISOString()
const filename = `${config.get('userPoolId')}.json`
const objectKey = `${timestamp}/${filename}`

backupUsers(cognito, config.get('userPoolId'), '.')
  .then(() => {
    console.log(`Backup created`)
    s3.putObject({
      Body: fs.readFileSync(filename, 'utf8'),
      Bucket: config.get('s3BucketUri'),
      Key: objectKey
    }, error => {
      if (error) {
        console.error(`error copying backup to S3: ${error}`)
        return
      }
      console.log('Backup copied to S3')
    })
  })
  .catch(error => {
    console.error(`error running backup: ${error}`)
  })
