// Allow populating ENV variables using not-check-in .env file (for secrets)
require('dotenv').config()

module.exports = {
  awsAccessKey: process.env.AWS_ACCESS_KEY_ID || '',
  awsAccessSecret: process.env.AWS_SECRET_ACCESS_KEY || '',
  awsRegion: process.env.AWS_REGION || 'us-west-2',
  s3BucketUri: process.env.S3_BUCKET_URI || 'sinopia-cognito-development',
  userPoolId: process.env.COGNITO_USER_POOL_ID || 'us-west-2_CGd9Wq136'
}
