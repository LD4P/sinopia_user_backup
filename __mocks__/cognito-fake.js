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
