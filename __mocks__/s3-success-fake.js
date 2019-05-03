export default class S3SuccessFake {
  putObject(_, callback) {
    callback()
  }
}
