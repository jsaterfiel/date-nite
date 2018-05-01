const Cookies = {
  setCookie: (name, value, seconds) => {
    const d = new Date()
    d.setTime(d.getTime() + (seconds * 1000))
    var expires = 'expires=' + d.toUTCString()
    document.cookie = name + '=' + value + ';' + expires + ';path=/'
  },
  getCookie: (name) => {
    const cname = name + '='
    var decodedCookie = decodeURIComponent(document.cookie)
    var ca = decodedCookie.split(';')
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i]
      while (c.charAt(0) === ' ') {
        c = c.substring(1)
      }
      if (c.indexOf(cname) === 0) {
        return c.substring(cname.length, c.length)
      }
    }
    return ''
  }
}

export default Cookies
