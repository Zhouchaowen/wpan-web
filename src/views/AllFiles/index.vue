<template>
  <div class="home">
    <div class="func">
      <el-button type="primary" plain @click="flag=!flag">新建文件夹</el-button>
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
            @click="toOpenFolder(item)"
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
        @cell-mouse-enter="mouseEnter"
        @cell-mouse-leave="mouseLeave"
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
        <el-table-column width="280" label="名称">
          <template #default="scope">
            <div class="nameBox">
              <div class="name openStyle" @click="toOpenFolder(scope.row)" v-if="scope.row.type=='0'">{{ scope.row.name }}</div>
              <div class="name" v-else>{{ scope.row.name }}</div>
              <div class="func_icon" v-if="scope.row.isHover">
                <i class="iconfont icon-a-fenxiang2"></i>
                <i class="iconfont icon-biaoge-xiazai" @click="downloadImg(scope.row.id, scope.row.name, scope.row.postfix)"></i>
                <i class="iconfont icon-shanchu"></i>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column property="type" label="类型">
          <template #default="scope">
            <span v-if="scope.row.type == '0'">文件夹</span>
            <span v-if="scope.row.type == '1'">图像</span>
            <span v-if="scope.row.type == '2'">文档</span>
            <span v-if="scope.row.type == '3'">音频</span>
            <span v-if="scope.row.type == '4'">视频</span>
          </template>
        </el-table-column>
        <el-table-column property="expand" label="扩展名" />
        <el-table-column property="size" label="大小" />
        <el-table-column property="download" label="下载次数" />
        <el-table-column label="上传时间" width="200">
          <template #default="scope">{{ dayjs(scope.row.date).format('YYYY-MM-DD HH:mm:ss') }}</template>
        </el-table-column>
      </el-table>
    </div>
    <Dialog
        ref="dialogRef"
        :visible="flag"
        @close="closeDialog"
        @submit="onsubmit"
    ></Dialog>
  </div>
</template>

<script>
import {useRoute} from "vue-router";
import {ref} from "vue";
import {onMounted, reactive} from "vue-demi";
import {toRefs} from "@vue/reactivity";
import { ElMessage } from 'element-plus';
import { uploadFile, getFolder, addFolder } from "@/utils/modules/user.js";
import Dialog from "@/components/Dialog/index.vue";
import axios from 'axios';
var dayjs = require('dayjs')

export default {
  name: "allFiles",
  components: {
    Dialog
  },
  setup() {
    const state = reactive({
      // 文件列表
      tableData: [],
      // 路径列表
      breadcrumbList: [],
      // 当前页面类型 0：全部 1：文档 2：图像 3：视频 4：音频
      currentType: '0',
      fileList: [],
      currentFolderId: '0', //当前目录Id
      // filename: "" //文件夹名称
    })

    const flag = ref(false)

    const onsubmit = (data) => {
      flag.value = false
      let obj = {
        "parent_id": state.currentFolderId,
        "folder_name": data
      }
      addFolder(obj).then(res => {
        console.log(res)
        getFolders(state.currentFolderId)
      })
    }

    onMounted(() => {
      getFolders(state.currentFolderId)

    })
    const closeDialog = () => {
      flag.value = false
    }

    const route = useRoute()
    state.currentType=route.params.type;

    const multipleSelection = ref([])
    const handleSelectionChange = (val) => {
      multipleSelection.value = val
    }

    const mouseEnter = (row) => {
      let index = state.tableData.findIndex(item => item.id == row.id)
      state.tableData[index].isHover = true;
    }

    const mouseLeave = (row) => {
      let index = state.tableData.findIndex(item => item.id == row.id)
      state.tableData[index].isHover = false;
    }

    // 上传文件
    const handleUpload = (file) => {
      var formdata = new FormData()
      formdata.append('file', file.file)
      formdata.append('folder_id', state.currentFolderId)
      console.log(formdata)
      uploadFile(formdata).then(res => {
        console.log(res)
        getFolders(state.currentFolderId)
      })
    }

    const downloadImg = async (id, name, postfix) => {
      console.log(name)
      // const response = await axios.get('/download/fileA', {headers: {Authorization: 'Token xxxxxx'}});

      // downloadFolder(id).then(res => {
      //   const blob = new Blob([res], { type: 'application/x-png' });
      //   const url = window.URL.createObjectURL(blob);
      //   const a = document.createElement('a');
      //   a.href = url;
      //   a.download = [name];
      //   a.click();
      //   window.URL.revokeObjectURL(url);
      // })

      axios.defaults.headers['content-type'] = 'application/json;charset=UTF-8'
      axios.defaults.headers['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYzMwNDI5NmQtYzZhMi00ZDkyLWI2MjAtMjViOTY4YTQ1YzdhIiwidXNlcm5hbWUiOiJ6Y3cxIiwiZXhwIjoxNjg3MTg4ODA1LCJpc3MiOiJibHVlYmVsbCJ9.-dunMfu6UPzVqYMkTx-6S2D8m844hV-WmSPENyo2Al4'
      axios({
        method: 'get',
        url: '/api/user/download/'+id, // 请求地址
        responseType: 'blob' // 表明返回服务器返回的数据类型
      }).then(
          response => {
            let blob = new Blob([response.data], {
              type: 'application/x-png'
            })
            console.log(blob)
            let fileName = name + postfix
            if (window.navigator.msSaveOrOpenBlob) {
              // console.log(2)
              navigator.msSaveBlob(blob, fileName)
            } else {
              // console.log(3)
              var link = document.createElement('a')
              link.href = window.URL.createObjectURL(blob)
              link.download = fileName
              link.click()
              //释放内存
              window.URL.revokeObjectURL(link.href)
            }
          },
          err => {
            console.log(err)
          }
      )

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
    const toOpenFolder = (data) => {
      // console.log("面包屑",state.breadcrumbList)
      let index = state.breadcrumbList.findIndex(item => item.id==data.id);
      if(index>-1) {
        state.breadcrumbList.splice(index+1)
      } else {
        state.breadcrumbList.push({
          id: data.id,
          name: data.name,
          state: data.type=='0'?'folder': 'file'
        })
      }
        getFolders(data.id)
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
            download: '',
            id: item.id,
            isHover: false
          }
        })
        let files = data.files.map(item => {
          return {
            date: item.created_at,
            name: item.file_name,
            expand: item.postfix,
            type: item.type,
            size: item.size,
            download: item.download_num,
            id: item.id,
            isHover: false
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
      getFolders,
      onsubmit,
      closeDialog,
      mouseEnter,
      mouseLeave,
      downloadImg,
      flag,
      dayjs
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
      .nameBox {
        display: flex;
        justify-content: space-between;
        cursor: pointer;
        .name{
          &.openStyle {
            &:hover {
              text-decoration: underline;
              color: #79bbff;
            }
          }
          font-weight: bold;
        }
        .func_icon {
          width: 70px;
          display: flex;
          justify-content: space-between;
        }
      }
    }
  }
</style>
