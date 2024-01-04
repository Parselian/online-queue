export const checkUserLogin = () => {
  if (localStorage.user_login && localStorage.user_password && localStorage.user_id) return true
  else {
    localStorage.clear()
    return false
  }
}