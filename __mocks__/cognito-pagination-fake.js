export default class CognitoPaginationFake {
  constructor() {
    this.calledAlready = false
  }

  listUsers() {
    return {
      promise: async () => {
        return new Promise(resolve => {
          if (this.calledAlready) {
            return resolve(
              {
                Users: [
                  { Username: 'user2' }
                ]
              }
            )
          } else {
            this.calledAlready= true
            return resolve(
              {
                Users: [
                  { Username: 'user1' }
                ],
                PaginationToken: 'token'
              }
            )
          }
        })
      }
    }
  }
}
