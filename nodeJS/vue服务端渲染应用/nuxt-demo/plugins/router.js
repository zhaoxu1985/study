export default ({
  app,
  store,
  redirect,
  route
}) => {
  app.router.beforeEach((to, from, next) => {
    // 设置条件
    if (to.name === "index") {
      return redirect('/login')
    }
    // if (to.name === "home") {
    //   return redirect('/home/a1')
    // }
    next()
  })
}
