import router from '@/router'

export const checkUserLogin = () => {
  if (!localStorage.user_login || !localStorage.user_password || !localStorage.user_id || !localStorage.user_type) {
    localStorage.clear()
    return router.push('/login')
  }

  return `user ${localStorage.user_login} is currently logged in!`
}