<template>
  <div class="home">
    <div class="func">
      <el-button type="primary" plain>新建文件夹</el-button>
      <el-upload
          class="upload-btn"
          action="#"
          :http-request="handleUpload"
          :limit="1"
          :on-exceed="handleExceed"
          :show-file-list="false"
      >
        <el-button type="primary">上传文件</el-button>
      </el-upload>
    </div>
    <!--  路径模块  -->
    <div class="filesAddress">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
            @click="toOpenFolder(item.id)"
            v-for="(item, index) in breadcrumbList"
            :key="index"
        >
          <template v-if="item.state=='folder'">
            <a href="javascript:;">{{ item.name }}</a>
          </template>
          <template v-else>{{ item.name }}</template>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--  文件展示模块  -->
    <div class="filesList">
      <el-table
        ref="multipleTableRef"
        :data="tableData"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column label="">
          <template #default="scope">
            <i class="iconfont icon-wenjianjia icon_folder" v-if="scope.row.type == '0'"></i>
            <i class="iconfont icon-wendang icon_pic" v-if="scope.row.type == '1'"></i>
            <i class="iconfont icon-tuxiang icon_file" v-if="scope.row.type == '2'"></i>
            <i class="iconfont icon-shipin icon_video" v-if="scope.row.type == '3'"></i>
            <i class="iconfont icon-yinpin icon_audio" v-if="scope.row.type == '4'"></i>
          </template>
        </el-table-column>
        <el-table-column property="name" label="名称" />
        <el-table-column property="type" label="类型" />
        <el-table-column property="expand" label="扩展名" />
        <el-table-column property="size" label="大小" />
        <el-table-column property="download" label="下载次数" />
        <el-table-column label="上传时间" width="200">
          <template #default="scope">{{ scope.row.date }}</template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import {useRoute} from "vue-router";
import {ref} from "vue";
import {onMounted, reactive} from "vue-demi";
import {toRefs} from "@vue/reactivity";
import { ElMessage } from 'element-plus';
import { uploadFile, getFolder } from "@/utils/modules/user.js";

export default {
  name: "allFiles",
  setup() {
    const state = reactive({
      // 文件列表
      tableData: [],
      // 路径列表
      breadcrumbList: [],
      // 当前页面类型 0：全部 1：文档 2：图像 3：视频 4：音频
      currentType: '0',
      fileList: [],
      currentFolderId: '0' //当前目录Id
    })

    onMounted(() => {
      getFolders(state.currentFolderId)
    })
    const route = useRoute()
    state.currentType=route.params.type;

    const multipleSelection = ref([])
    const handleSelectionChange = (val) => {
      multipleSelection.value = val
    }
    const handleUpload = (file) => {
      console.log(file)
      var formdata = new FormData()
      formdata.append('file', file.file)
      formdata.append('folder_id', state.currentFolderId)
      console.log(formdata)
      uploadFile(formdata).then(res => {
        console.log(res)
        getFolders(state.currentFolderId)
      })
    }

    const handleExceed = (files, uploadFiles) => {
      console.log(files, uploadFiles)
      ElMessage.warning(
          `The limit is 3, you selected ${files.length} files this time, add up to ${
              files.length + uploadFiles.length
          } totally`
      )
    }

    // 打开文件夹
    const toOpenFolder = (rootId) => {
      console.log(rootId)
      getFolders(rootId)
    }

    const getFolders = (rootId) => {
      getFolder(rootId).then(res => {
        console.log('folders',res)
        let data = res.data;
        let current_folder = data.current_folder;
        state.currentFolderId = current_folder?.id || '0';

        if(!current_folder) {
          state.breadcrumbList = [{
            name: "全部文件",
            id: 0,
            state: 'folder'
          }]
        }

        let folders = data.folders.map(item => {
          return {
            date: item.created_at,
            name: item.name,
            expand: '-',
            type: '0',
            size: '-',
            download: ''
          }
        })
        let files = data.files.map(item => {
          return {
            date: item.created_at,
            name: item.file_name,
            expand: item.postfix,
            type: item.type,
            size: item.size,
            download: item.download_num
          }
        })
        state.tableData = [...folders, ...files]
      })
    }
    return {
      ...toRefs(state),
      handleSelectionChange,
      toOpenFolder,
      handleUpload,
      handleExceed,
      getFolders
    }
  }
}
</script>

<style scoped lang="scss">
  .home {
    height: 100%;
    background: #fff;
    border-radius: 5px;
    padding: 10px 20px;
    box-sizing: border-box;
    .func {
      height: 40px;
      display: flex;
      .upload-btn {
        margin-left: 10px;
      }
    }
    .filesAddress {
      height: 50px;
      display: flex;
      align-items: center;
    }
    .filesList {
      height: calc(100% - 90px);
      .icon_folder {
        font-size: 26px;
        color:#ffcd00;
      }
      .icon_file {
        font-size: 24px;
        color: #d2c220;
      }
      .icon_pic {
        font-size: 24px;
        color: #68dd89;
      }
      .icon_video {
        font-size: 26px;
        color: #366dd2;
      }
      .icon_audio {
        font-size: 26px;
        color: #ff292f;
      }
    }
  }
</style>
