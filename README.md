[![CircleCI](https://circleci.com/gh/LD4P/sinopia_user_backup.svg?style=svg)](https://circleci.com/gh/LD4P/sinopia_user_backup)
[![Code Climate](https://codeclimate.com/github/LD4P/sinopia_user_backup/badges/gpa.svg)](https://codeclimate.com/github/LD4P/sinopia_user_backup)
[![Code Climate Test Coverage](https://codeclimate.com/github/LD4P/sinopia_user_backup/badges/coverage.svg)](https://codeclimate.com/github/LD4P/sinopia_user_backup/coverage)

# sinopia_user_backup

A Node application that backs up AWS Cognito user pools to AWS S3. The application stores backups in S3 with the following structure: `{DATESTAMP}/user-backup_{TIMESTAMP}_{USER_POOL_ID}.json`

Requires configuration via environment variables:

* `AWS_ACCESS_KEY_ID`: The AWS access key associated with an account that has access to both Cognito and S3
* `AWS_SECRET_ACCESS_KEY`: The AWS access secret associated with an account that has access to both Cognito and S3
* `AWS_REGION`: The AWS region Cognito and S3 are running within
* `S3_BUCKET`: The S3 bucket into which user backup data should be copied
* `COGNITO_USER_POOL_ID`: The Cognito user pool to backup

## Testing

A `docker-compose` configuration is included to mimic how the app would be run in a container-based production environment. To run the app, use:

```shell
# Add -d flag to run in the background
$ docker-compose up
```

### Run the linter

```shell
$ npm run lint
```

### Run unit tests

```shell
$ npm test
```

## Build and push image

The CircleCI build is configured to perform these steps automatically on any successful build on the `master` branch. If you need to manually build and push an image, you can do this:

```shell
$ docker build -t ld4p/sinopia_user_backup:latest .
$ docker push ld4p/sinopia_user_backup:latest
```
