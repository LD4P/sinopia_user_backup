[![CircleCI](https://circleci.com/gh/LD4P/sinopia_indexing_pipeline.svg?style=svg)](https://circleci.com/gh/LD4P/sinopia_indexing_pipeline)
[![Code Climate](https://codeclimate.com/github/LD4P/sinopia_indexing_pipeline/badges/gpa.svg)](https://codeclimate.com/github/LD4P/sinopia_indexing_pipeline)
[![Code Climate Test Coverage](https://codeclimate.com/github/LD4P/sinopia_indexing_pipeline/badges/coverage.svg)](https://codeclimate.com/github/LD4P/sinopia_indexing_pipeline/coverage)

# sinopia_user_backup

A Node application that backs up Cognito user pools for the Sinopia project.

## Testing

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
$ docker build -t ld4p/sinopia_user_backup:latest.
$ docker push ld4p/sinopia_user_backup:latest
```
