// Allow populating ENV variables using not-check-in .env file (for secrets)
require('dotenv').config()

module.exports = {
  awsAccessKey: process.env.AWS_ACCESS_KEY_ID || '',
  awsAccessSecret: process.env.AWS_SECRET_ACCESS_KEY || '',
  s3BucketUri: process.env.S3_BUCKET_URI || ''
}
