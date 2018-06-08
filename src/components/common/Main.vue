<template>
  <div id="container" class="uk-flex uk-flex-column uk-flex-nowrap">
    <vHeader ref="header"></vHeader>
    <!-- 主页面 -->
    <div class="main uk-flex uk-flex-row uk-flex-nowrap uk-flex-item-1">
      <vSidebar ref="sidebar"></vSidebar>
      <transition name="fade" mode="out-in">
        <router-view ref="main" class="center uk-flex-item-1" :style="{
          width:isStatisMod ? mapWidth + 'px' : '320px',
          height:contentHeight,
          left:sidebarWidth +'px',
          top:isStatisMod ? '0' : '20px'}"></router-view>
      </transition>
      <vMap :style="{width:mapWidth + 'px'}"></vMap>
      <!-- 地图组件 -->
    </div>


  </div>
</template>
<script>
  import vHeader from './Header.vue';
  import vSidebar from './Sidebar.vue';
  import vMap from '@/pages/GridManage/GridManage.vue';
  import elementResizeEvent from 'element-resize-event';
  import loginOper from "@/assets/scripts/common/loginOper.js";

  import { mapGetters } from 'vuex';

  export default {
    components: {
      vHeader,
      vSidebar,
      vMap
    },
    data() {
      return {
      }
    },
    created() {
      // if (lscache.get("userId") == null) {
      //   this.getUserInfo();
      // } else 
      if (lscache.get("permissions") == null) {
        this.getPermission();
      } else {
        // this.eventService = new EventService();
      }
    },
    mounted() {
      let that = this;
      // 系统加载完成后默认判断一次宽度
      let width = $(window).width() - parseInt($('.header-logo').width() ? $('.header-logo').width() : '328') - 272;
      that.$bus.$emit('triMenuWidthChange', width);

      elementResizeEvent(this.$el, function (args) {
        that.$refs['sidebar'].isCollapse =
          document.body.scrollWidth >= 1600 ? false : true;
        // 可用于显示菜单的宽度、当前菜单页索引、当前菜单页菜单个数
        let width = $(window).width() - $('.header-logo').width() - 272;
        that.$bus.$emit('triMenuWidthChange', width);

        // let maps = window[this.mapname];
        // if (maps) {
        //   maps.olcusium.updateSize();
        // }
      });
    },
    methods: {
      // 获取当前用户信息
      getUserInfo() {
        let that = this;
        loginOper.getUserInfo({
          successFunc: data => {
            that.userId = lscache.get("userId");
            that.$bus.$emit("triSetUserInfo");
            /** 往首页发送当前系统的登录用户信息 */
            // that.$bus.$emit("SetHomePageUserInfo");
          }
        });
      },
      // 获取当前用户权限
      getPermission() {
        let that = this;
        loginOper.getPermission({
          userId: lscache.get("userId"),
          successFunc: data => {
            that.permissions = data;
            // 计算当前系统的加载菜单
            this.calMenus();
          }
        });
      },
      init() {
        // 地图加载完成后，赋值到全局变量，避免vue频繁脏检测导致性能问题
        // 该方法发送地图加载完毕的状态，相应的子组件应该设置方法来接收该状态
        VistualEmit.emit("mapinit", "mapinit");
      }
    },
    watch: {
      /** 监听浏览器窗口大小，改变时触发子页面调整函数 */
      screenHeight(val) {
        let that = this;

        if (!this.timer) {
          this.screenWidth = val;
          this.timer = true;

          setTimeout(function () {
            if (that.$refs['main'] && that.$refs['main'].onResizeEvent) {
              that.$refs['main'].onResizeEvent();
            }

            that.timer = false;
          }, 200)
        }
      }
    },
    computed: {
      ...mapGetters('systemInfo', [
        'sidebarWidth',
        'mapWidth',
        'contentHeight'
      ]),
      ...mapGetters('statisModels', [
        'isStatisMod',
      ])
    }
  };
</script>

<style scoped>
  #container {
    width: 100%;
    height: 100%;
  }

  .main {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .center {
    overflow-y: auto;
    /* padding: 10px; */
    box-sizing: border-box;
    background-color: #ffffff;

    position: absolute;
    z-index: 9999;
    top: 20px;
    width: 320px;

    will-change: width, height, left, top;
    transition-property: width, height, left, top;
    transition-duration: 4s, 4s, 4s, 4s;
    /* -webkit-transition: width,height,left,top 4000ms;
    transition: width,height,left,top 4000ms; */
  }
</style>