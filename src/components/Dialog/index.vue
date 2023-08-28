<template>
  <div class="hello">
    <el-dialog title="提示" v-model="dialogVisble" width="30%" :before-close="close">
      <el-input v-model="filename" placeholder="请输入文件夹名称" />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="close">取 消</el-button>
          <el-button type="primary" @click="confirm">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import { ref, watch } from 'vue'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  setup(props, ctx) {
    const dialogVisble = ref(false)
    const filename = ref(null)
    const close = () => {
      filename.value = '';
      ctx.emit("close", false);
    };
    const confirm = () => {
      filename.value = '';
      ctx.emit("submit", filename.value);
    }
    watch(() => props.visible, (val) => {
      dialogVisble.value = val
    });
    return {
      dialogVisble,
      confirm,
      close,
      filename
    }
  }
}
</script>
