// Yes, this is gross, but this is the interface of the dependency we're faking.
export default class CognitoFake {
  listUsers() {
    return {
      promise: async () => {
        return new Promise(resolve => {
          return resolve(
            {
              Users: [
                { Username: 'user1' },
                { Username: 'user2' }
              ]
            }
          )
        })
      }
    }
  }
}
