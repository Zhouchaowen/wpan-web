<template>
    <div class="home">
       <div class="totalNum">
         <div class="folderBox">
           <div class="totalNumIcon">
             <i class="iconfont icon-wenjianjia"></i>
           </div>
           <div class="totalNumContent">
             <span class="top">文件夹</span>
             <span class="bottom">2</span>
           </div>
         </div>
         <div class="fileBox">
           <div class="totalNumIcon">
             <i class="iconfont icon-wendang"></i>
           </div>
           <div class="totalNumContent">
             <span class="top">文件</span>
             <span class="bottom">2</span>
           </div>
         </div>
       </div>
      <div class="category">
        <div class="fileDetail">
          <span class="title">文件明细情况</span>
          <div class="fileDetailContainner" id="fileDetailContainner"></div>
        </div>
        <div class="storage">
          <span class="title">已使用/剩余容量(单位: MB)</span>
          <div class="storageContainner" id="storageContainner"></div>
        </div>
      </div>
    </div>
</template>

<script>
import {onMounted} from "vue-demi";
import * as echarts from 'echarts';
import {ref} from "vue";

export default {
    name: 'dashboard',
    setup() {
      const myChart = ref(null)
      onMounted(() => {
        fileDetailPieInit()
        storagePieInit()
      })

      const fileDetailPieInit = () => {
        var chartDom = document.getElementById('fileDetailContainner');
        myChart.value = echarts.getInstanceByDom(document.getElementById("fileDetailContainner"))
        if(myChart.value!=null&&myChart.value!=''&&myChart.value!=undefined) {
          myChart.value.dispose()
        }
        myChart.value = echarts.init(chartDom);
        var option = {
          title: {
            text: 'Referer of a Website',
            subtext: 'Fake Data',
            left: 'center'
          },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'vertical',
            left: 'left'
          },
          series: [
            {
              name: 'Access From',
              type: 'pie',
              radius: '50%',
              data: [
                { value: 1048, name: 'Search Engine' },
                { value: 735, name: 'Direct' },
                { value: 580, name: 'Email' },
                { value: 484, name: 'Union Ads' },
                { value: 300, name: 'Video Ads' }
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };
        option && myChart.value.setOption(option);
      }

      const storagePieInit = () => {
        var chartDom = document.getElementById('storageContainner');
        let myChart = echarts.getInstanceByDom(document.getElementById("storageContainner"))
        if(myChart!=null&&myChart!=''&&myChart!=undefined) {
          myChart.dispose()
        }
        myChart = echarts.init(chartDom);

        var option = {
          tooltip: {
            trigger: 'item'
          },
          legend: {
            top: '5%',
            left: 'center'
          },
          series: [
            {
              name: 'Access From',
              type: 'pie',
              radius: ['40%', '70%'],
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: 'center'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: 40,
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: false
              },
              data: [
                { value: 1048, name: 'Search Engine' },
                { value: 735, name: 'Direct' },
                { value: 580, name: 'Email' },
                { value: 484, name: 'Union Ads' },
                { value: 300, name: 'Video Ads' }
              ]
            }
          ]
        };
        option && myChart.setOption(option);
      }
       return {
       }
    },
}
</script>

<style scoped lang="scss">
@import "../../assets/css/common.scss";
@import '../../style/mixin.scss';
.home {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .totalNum {
    @include setWAndH(100%,30%);
    display: flex;
    justify-content: space-between;
    .folderBox {
      @include bgWhite;
      @include setWAndH(38%,100%);
      border-radius: 5px;
    }
    .fileBox {
      @include bgWhite;
      @include setWAndH(38%,100%);
      border-radius: 5px;
    }
    .folderBox,
    .fileBox {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 5%;
      .totalNumIcon {
        background: $themeColor;
        width: 80px;
        height: 80px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: $whiteColor;
        i {
          font-size: 36px;
        }
      }
      .totalNumContent {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: space-between;
        height: 50px;
        .top {
          color: #767676;
          font-size: 14px;
        }
        .bottom{
          font-size: 22px;
          font-weight: bold;
        }
      }
    }
    .fileBox {
      .totalNumIcon {
        background: #ff5f5f;
      }
    }

  }
  .category {
    @include setWAndH(100%,calc(70% - 30px));
    display: flex;
    justify-content: space-between;
    .fileDetail {
      @include bgWhite;
      @include setWAndH(48%,100%);
      border-radius: 5px;
      .fileDetailContainner {
        height: calc(100% - 60px);
        padding: 10px;
      }
    }
    .storage {
      @include bgWhite;
      @include setWAndH(48%,100%);
      border-radius: 5px;
      .storageContainner {
        height: calc(100% - 40px);
      }
    }
    .fileDetail,
    .storage {
      .title {
        font-size: 14px;
        font-weight: bold;
        height: 40px;
        border-bottom: 1px solid #ddd;
        display: inline-block;
        line-height: 40px;
        width: 100%;
        padding-left: 10px;
        box-sizing: border-box;
      }
    }
  }
}

</style>
