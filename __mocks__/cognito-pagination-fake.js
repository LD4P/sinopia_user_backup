// Yes, this is gross, but this is the interface of the dependency we're faking.

export default class CognitoPaginationFake {
  constructor() {
    // This attr makes sure we can split a result set into paginated chunks
    // without endless recursion.
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
