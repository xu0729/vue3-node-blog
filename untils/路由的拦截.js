// 登录拦截
// 根据返回值决定是放行还是拦截
// und / true 直接放行
// false 拦截from地址
// 具体路径 或者路径对象 拦截到对应的地址
router.beforeEach((to, from) => {
    // 没有token 访问的是非登录页 其他情况正常放行
    const userStore = useUserStore()
    if (!userStore.token && to.path !== '/login') return '/login'
  
    return true
  })