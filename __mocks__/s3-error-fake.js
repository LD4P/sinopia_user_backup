export default class S3ErrorFake {
  putObject(_, callback) {
    callback('uh oh')
  }
}
