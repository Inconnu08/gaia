export default {

  login (context, creds) {
    context.$http.post('/api/v1/users/login', creds)
      .then((response) => {
        var newSession = {
          'token': response.data.tokenstring,
          'display_name': response.data.display_name,
          'jwtexpiry': response.data.jwtexpiry
        }
        window.localStorage.setItem('session', JSON.stringify(newSession))
        context.$store.commit('setSession', newSession)
      })
      .catch((error) => {
        console.log(error)
      })
  },

  logout (context) {
    window.localStorage.removeItem('session')
    context.$store.commit('clearSession')
  },

  getSession () {
    let session = JSON.parse(window.localStorage.getItem('session'))
    if (!session) {
      return ''
    }
    return session
  },

  getToken () {
    let session = this.getSession()
    if (!session) {
      return ''
    }
    return session['token']
  },

  getAuthHeader () {
    return {
      'Authorization': 'Bearer ' + this.getToken()
    }
  }
}
