const BackToLogin = (user) => {

  if (!user) {
    setTimeout(() => {
      // window.history.replaceState({}, '', '/')
    }, 2000);
  }
  return null
}

export default BackToLogin
