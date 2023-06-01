<template>
  <el-dialog
    v-model="props.dialogVisible"
    title="新建文件夹"
    width="30%"
    :before-close="handleClose"
  >
    <el-input v-model="props.filename" placeholder="Please input" />
    <template #footer>
          <span class="dialog-footer">
            <el-button @click="props.dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="onsubmit()">
              确定
            </el-button>
          </span>
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: "Dialog",
  props: ['filename','dialogVisible'],
  setup(props) {
    console.log(props)
    const handleClose = () => {

    }
    return {
      handleClose,
      props
    }
  }
}
</script>

<style scoped>

</style>
