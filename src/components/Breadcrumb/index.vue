<template>
    <el-breadcrumb separator="/">
        <transition-group name="breadcrumb">
            <el-breadcrumb-item v-for="(item, index) in state.levelList" :key="index">
                <span v-if="index == state.levelList.length-1">{{ item.meta.title }}</span>
                <a v-else @click="handleLink(item.path)">{{ item.meta.title }}</a>
            </el-breadcrumb-item>
        </transition-group>
    </el-breadcrumb>
</template>
<script>
import { reactive, watch } from 'vue-demi'
import { useRoute , useRouter } from 'vue-router'
export default ({
    setup() {
        const state = reactive({
            levelList: null
        })
        const router = useRouter() // 用于跳转
        let route = useRoute() // 获取路由参数
        const getBreadcrumb = () => {
            // console.log(router.getRoutes())
            console.log(route)
            let matched = route.matched.filter(item => item.meta && item.meta.title)
            // console.log(matched)
            state.levelList = matched
        }
        // 面包屑跳转
        const handleLink = (path) => {
            router.push(path)
        }
        watch(() =>router.currentRoute.value.path,() => {
            getBreadcrumb()
        },{ immediate: true })
        return {
            state,
            getBreadcrumb,
            handleLink
        }
    }
})
</script>

<style scoped lang="scss">
    .el-breadcrumb {
        padding: 10px 10px 0 10px;
    }
</style>
