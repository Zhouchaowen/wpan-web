<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <div class="layout">
    <el-container>
      <el-aside width="200px" class="aside">
        <div class="head">
            <span class="headTitle">风间网盘</span>
        </div>
<!--        <div class="line" />-->
        <el-menu
          :default-openeds="state.defaultOpen"
          active-text-color="#804bdd"
          background-color="#fff"
          class="el-menu-vertical-demo"
          :default-active="state.currentPath"
          text-color="#9d9d9d"
          :router="true"
        >
          <span class="groupTitle">预览</span>
          <el-menu-item index="/dashboard">
            <i class="iconfont icon-xitongyunzhuanqingkuang"></i>
            <span class="menuTitle">使用情况</span>
          </el-menu-item>
          <span class="groupTitle">所有文件</span>
          <el-menu-item index="/allFiles/0">
            <i class="iconfont icon-wenjianjia"></i>
            <span class="menuTitle">全部文件</span>
          </el-menu-item>
          <el-sub-menu index="4">
            <template #title>
              <i class="iconfont icon-icon_category"></i>
              <span class="menuTitle">分类文件</span>
            </template>
            <el-menu-item index="/allFiles/1">
              <i class="iconfont icon-wendang"></i>
              <span class="menuTitle">我的文档</span>
            </el-menu-item>
            <el-menu-item index="/allFiles/2">
              <i class="iconfont icon-tuxiang"></i>
              <span class="menuTitle">我的图像</span>
            </el-menu-item>
            <el-menu-item index="/allFiles/3">
              <i class="iconfont icon-shipin"></i>
              <span class="menuTitle">我的视频</span>
            </el-menu-item>
            <el-menu-item index="/allFiles/4">
              <i class="iconfont icon-yinpin"></i>
              <span class="menuTitle">我的音频</span>
            </el-menu-item>
          </el-sub-menu>
        </el-menu>
        <div class="logout">
          <i class="iconfont icon-tuichu"></i>退出登录
        </div>
      </el-aside>
      <el-container>
        <el-header height="100px">
          <home-header />
        </el-header>
<!--        <breadcrumb></breadcrumb>-->
        <div class="mainTitle">
          {{state.title}}
        </div>
        <el-main>
          <div class="main">
<!--            <transition name="fade-transform" mode="out-in">-->
              <router-view></router-view>
<!--            </transition>-->
          </div>
        </el-main>
        <el-footer>
          <home-footer />
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import HomeHeader from "./Header"
import HomeFooter from "./Footer"
import { reactive } from '@vue/reactivity'
import { onUnmounted } from '@vue/runtime-core'
import {useRoute, useRouter} from 'vue-router'
import { pathTitle } from '../utils/index.js'
import {onBeforeMount} from "vue";
// import breadcrumb from './Breadcrumb/index.vue'
export default {
  name: 'App',
  components: {
    HomeHeader,
    HomeFooter
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const state = reactive({
      defaultOpen: ['4'],
      currentPath: '/dashboard', // 默认选中页面
      title: ""
    })
    const unwatch = router.beforeEach((to, from, next) => {
      // console.log(to)
      // console.log(from)
      // console.log(next)
      if (to.path == '/login') {
        //如果路径是/login 则正常执行
        next()
      } else {
        // 如果不是/login,判断是否有token
        next()
      }
      // state.showMenu = !noMenu.includes(to.path)
      changeTitle(to.name,to.path,to.params.type)
    })
    const changeTitle = (name,path,type) => {
      console.log(name,type)
      state.currentPath = path
      if(name == 'dashboard') {
        document.title =  pathTitle[name]
        state.title = pathTitle[name];
      } else {
        switch (type) {
          case '0':
            document.title =  pathTitle['allFiles']
            state.title = pathTitle['allFiles'];
            break;
          case '1':
            document.title =  pathTitle['myDocument']
            state.title = pathTitle['myDocument'];
            break;
          case '2':
            document.title =  pathTitle['myPic']
            state.title = pathTitle['myPic'];
            break;
          case '3':
            document.title =  pathTitle['myVideo']
            state.title = pathTitle['myVideo'];
            break;
          case '4':
            document.title =  pathTitle['myAudio']
            state.title = pathTitle['myAudio'];
            break;
        }
      }
    }
    onUnmounted(() => {
      unwatch()
    })
    onBeforeMount(() => {
      changeTitle(route.name,route.path,route.params.type)
    })
    return {
      state
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/css/common.scss";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
}
.layout {
  max-height: 100vh;
  min-width: 1224px;
  .aside {
    min-height: 100vh;
    background: $whiteColor;
    .head {
      height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: $darkColor;
      .headTitle {
        font-size: 22px;
        font-weight: bold;
        color: #666;
      }
    }
    .line {
      height: 1px;
      background: #737373;
    }
    .groupTitle {
      //height: 30px;
      text-align: left;
      display: inline-block;
      width: calc(100% - 20px);
      padding: 5px 10px;
      color: #c4c4c4;
      font-size: 12px;
      font-weight: bold;
    }
    .logout {
      background: #f55b5b;
      height: 40px;
      width: 160px;
      border-radius: 20px;
      position: absolute;
      bottom: 50px;
      left: 20px;
      color: #fff;
      font-size: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
   /deep/ .el-menu {
     border-right: none;
     background-color: $whiteColor;
     .el-menu-item,
     .el-sub-menu__title{
       .menuTitle {
         font-weight: bold;
         margin-left: 5px;
       }
     }
     .el-menu-item:hover {
       background-color: $bgColor;

     }
    }
  }
  /deep/ .el-header {
    padding: 0;
  }
  /deep/ .el-main {
    max-height: calc(100vh - 120px);
    overflow: auto;
    background: $bgColor;
    padding: 0 var(--el-main-padding);
  }
  /deep/ .el-container {
    width: 100%;
    background: $bgColor;
  }
  .mainTitle {
    height: 60px;
    width: calc(100% - 60px);
    margin-left: 20px;
    background: #fff;
    color: #333;
    font-weight: bold;
    font-size: 22px;
    position: relative;
    top: -30px;
    line-height: 60px;
    padding-left: 20px;
    border-radius: 5px;
  }
  .main {
    //background: #fff;
    //box-shadow: 0 2px 12px 0 #0000001a;
    min-height: 400px;
    border-radius: 5px;
    height: 100%;
  }
  /deep/ .el-footer {
    padding: 0;
  }
}
</style>
