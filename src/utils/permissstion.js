import router from '../router'

router.beforeEach(async(to, from, next) => {
    //状态管理工具 pinia
    const store = useStore()
    //flag标记是否请求过路由数据，可以保存在pinia或者vuex中，不必缓存
    //判断flag=0并且router不存在
      if(store.flag==0 && !router.getRoutes().filter(it=>it.path==to.path).length){
        //try防止接口报错
        try{
            //获取路由接口数据，并且把 store.flag=1
            //menuList用来缓存从接口获取的路由
            store.menuList=await GetRouters();
            store.flag=1
            //重新进入to界面,replace: true表示浏览器不需要记录本次历史
            next({ ...to, replace: true })
        }catch(e){
            console.log('获取菜单失败',e);
            store.flag=0;
            
            store.menuList=[];
            //获取菜单失败，跳转登陆界面
            next('/login')
        }
      }else{
        next()
      }
      console.log('已有路由',router.getRoutes());
})