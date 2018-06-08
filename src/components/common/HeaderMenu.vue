<template>
  <div class="header-menu-content">
    <div v-show="leftVisibility" class="header-menu-control header-menu-left">
      <img :src="compImages.imgMenuLeft" @click="handleLeft">
    </div>
    <div v-show="rightVisibility" class="header-menu-control header-menu-right">
      <img :src="compImages.imgMenuRight" @click="handleRight">
    </div>
    <div class="header-menu-slider" :style="{width:menuWidth+'px'}">
      <ul :style="{width:filtermenus.length * 120+'px',marginLeft:menuLeft+'px'}">
        <li class="slider-menu" :class="{ 'slider-menu-selected': index === selectedIndex }" v-for="(menu, index) in filtermenus"
          :key="index" @click="handleMenuChange(menu,index)">
          <img :src="menu.img">
          <div class="slider-menu-caption">{{menu.name}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  /** 导入菜单配置 */
  import menus from '@/assets/scripts/config/menu_config.js';

  export default {
    data() {
      return {
        menus: menus,
        selectedIndex: 0,
        menuIndex: 0,
        compImages: {
          imgMenuLeft: require('@/assets/images/header/menu_left.png'),
          imgMenuRight: require('@/assets/images/header/menu_right.png')
        },
        /** 浏览器窗口宽度 */
        screenWeight: document.body.clientWeight,
        /** 菜单宽度 */
        menuWidth: menus.length * 120,
        /** 菜单向右滑动距离 */
        menuLeft: 0,
        leftVisibility: false,
        rightVisibility: false
      };
    },
    created() {
      let that = this;
      this.calMenuIndex();

      /** 一级菜单改变，触发左侧菜单树变化 */
      this.$bus.$on('triMenuWidthChange', function (menuWidth) {
        that.menuWidth = menuWidth;
        that.calMenuWidth(menuWidth);
      });
      this.$bus.$on('MyTaskMenuChange', function (index) {
        that.selectedIndex = index;
        that.$bus.$emit('triMenuChange', index, false);
      });
    },
    mounted() {
      if (lscache.get("permissions")) {
        this.$bus.$emit('triMenuChange', this.selectedIndex);
      };
    },
    methods: {
      handleMenuChange: function (menu, index) {
        /** 设置选中一级菜单索引 */
        this.selectedIndex = index;
        this.$bus.$emit('triMenuChange', index);
      },
      /** 菜单左滑事件 */
      handleLeft() {
        this.menuIndex = this.menuIndex - 1 < 0 ? 0 : this.menuIndex - 1;
        this.menuLeft =
          this.menuLeft + this.menuWidth > 0 ? 0 : this.menuLeft + this.menuWidth;

        if (this.menuLeft == 0) {
          this.leftVisibility = false;
        }
        this.rightVisibility = true;
      },
      /** 菜单右滑事件 */
      handleRight: function () {
        this.menuIndex++;
        this.menuLeft = this.menuLeft - this.menuWidth;

        if (this.menuLeft - this.menuWidth + this.menus.length * 120 <= 0) {
          this.rightVisibility = false;
        }
        this.leftVisibility = true;
      },
      calMenuWidth(width) {
        let menuCount = this.menus.length,
          startIndex = -this.menuLeft / 100,
          curCount =
            parseInt(width / 100) > menuCount ? menuCount : parseInt(width / 100),
          sliderWidth = curCount * 120;

        this.menuWidth = sliderWidth;

        // 如果可显示全部菜单，隐藏左右控制按钮
        if (width >= this.menus.length * 120) {
          this.leftVisibility = false;
          this.rightVisibility = false;
          this.menuLeft = 0;
          this.menuIndex = 0;
        } else {
          if (this.menuIndex == 0) {
            this.leftVisibility = false;
            this.rightVisibility = true;
          } else if (startIndex + parseInt(width / 100) >= menuCount) {
            this.rightVisibility = false;
            this.menuIndex = 1;
          } else {
            this.rightVisibility = true;
          }
        }
      },
      /** 计算菜单索引 */
      calMenuIndex() {
        let path = this.$route.path.split('/')[1];
        let menuIndex = 0,
          menus = this.calMenus();

        _.map(menus, (item, index) => {
          let menu = _.find(item.children, subItem => {
            return subItem.path == path;
          });

          menu && (menuIndex = index);

          if (!menu) {
            _.map(item.children, subItem => {
              let submenu = _.find(subItem.children, trdItem => {
                return trdItem.path == path;
              });

              submenu && (menuIndex = index);
            });
          }
        });

        this.menuIndex = menuIndex;
        this.selectedIndex = menuIndex;
      },
      /** 计算实际加载的菜单 */
      calMenus() {
        let permissions = lscache.get('pmsOne');

        let menus = _.filter(this.menus, menu => {
          let permission = _.find(permissions, item => {
            if (item.name == menu.name && item.type == '1') {
              return true;
            }
          });
          return permission ? true : false;
        });
        return menus;
      }
    },
    computed: {
      filtermenus() {
        return this.calMenus();
        // return this.menus;
      }
    }
  };
</script>

<style>
  @import url('../../assets/styles/header-menu.css');
</style>