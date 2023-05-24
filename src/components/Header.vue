<template>
  <div class="wrap">
    <div class="left">
      {{ name }}
    </div>
    <div class="right">
      <div class="userMenuBox">
        <div class="userFunc" @click.stop="openMenus">
          <span>你好，ww</span>
          <i class="iconfont icon-xiajiantou" v-show="!isPull"></i>
          <i class="iconfont icon-shangjiantou" v-show="isPull"></i>
        </div>
        <transition name="el-zoom-in-top">
          <ul class="userLink" v-show="isPull">
<!--            <li>设置</li>-->
<!--            <li>修改密码</li>-->
            <li>退出</li>
          </ul>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
// import { CaretBottom, CaretTop, Position } from "@element-plus/icons";
import { reactive, toRefs } from "@vue/reactivity";
// import { useRouter } from "vue-router";
// import { pathTitle } from "@/utils/index.js";
import { onMounted, onUnmounted } from 'vue-demi';
export default {
  name: "Header",
  components: {
    // CaretBottom,
    // CaretTop,
    // Position,
  },
  setup() {
    // const router = useRouter();
    const state = reactive({
      name: "",
      isPull: false, //是否用户头像下拉
    });
    // router.afterEach((to) => {
    //   // console.log(to.name)
    //   state.name = pathTitle[to.name];
    // });
    onMounted(() => {
      //判断点击的是否是类型下拉区域
      document.addEventListener('click', bodyCloseMenus)
    })
    onUnmounted(() => {
      document.removeEventListener('click', bodyCloseMenus)
    })
    // 隐藏下拉选项
    const bodyCloseMenus = () => {
      if (state.isPull == true) {
        state.isPull = false
      }
    }
    const openMenus = () => {
      state.isPull = true
    }
    const closeMenus = () => {
      state.isPull = false
    }
    return {
      ...toRefs(state),
      openMenus,
      closeMenus
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/css/common.scss";
.wrap {
  height: 100px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
  background: $themeColor;
  .left {
    font-size: 18px;
  }
  .right {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .userMenuBox {
      position: relative;
    .userFunc {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      cursor: pointer;
      position: relative;
      width: 120px;
      margin-left: 10px;
      color: #fff;
      span {
        margin-right: 10px;
      }
    }
      .userLink {
        position: absolute;
        top: 45px;
        right: 0;
        margin: 0;
        padding: 0;
        border-radius: 5px;
        background: $themeColor;
        opacity: 0.8;
        z-index: 9;
        li {
          list-style: none;
          height: 40px;
          width: 100px;
          color: $whiteColor;
          margin: 0 10px;
          font-size: 14px;
          display: flex;
          align-items: center;
          cursor: pointer;
          & + li {
            border-top: 1px solid $whiteColor;
          }
        }
      }
    }

  }
}
</style>
