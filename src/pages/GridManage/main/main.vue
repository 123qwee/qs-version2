<template>
  <div class="map_main">
    <!-- <div class="map_search" icon="el-icon-tickets">
      <autocomplete ref='$vistualComponent' :mapname="mapname" :height="autoCompleteHeight" v-on:search="autoCompleteChange" v-on:searchByType="autoCompleteChangeByType">
        <vistualComponent slot="component" :mapname="mapname"></vistualComponent>
      </autocomplete>
    </div> -->
    <div v-if="statisModels.show" class="statis_modes" @click="handleStatisModels">
      <img :src="statisModels.img" alt="">
    </div>
    <div class="map_tools">
      <el-button @click="gridClick()">沁水
        <i ref='gridIcon' class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <transition name="custom-classes-transition" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
        <div class='grid_select' v-if="isShowGridPanel">
          <img class="arrow" :src="icon_tools_arrow">
          <el-checkbox-group v-model="grid" @change="gridItemClick">
            <el-row>
              <el-col>
                <el-checkbox label="grid1">一级网格</el-checkbox>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-checkbox label="grid2">二级网格</el-checkbox>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-checkbox label="grid3">三级网格</el-checkbox>
              </el-col>
            </el-row>
          </el-checkbox-group>
        </div>
      </transition>
      <el-button type="primary" @click="toolClick()">工具
        <i ref='toolIcon' class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <transition name="custom-classes-transition" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
        <div class='tool_select' v-if="isShowToolPanel">
          <img class="arrow" :src="icon_tools_arrow">
          <el-row>
            <el-col>
              <img :src="lineLogo">
              <el-button type="text" class="textBtn" @click="lineMeasure()">测距</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <img :src="areaLogo">
              <el-button type="text" class="textBtn" @click="areaMeature()">测面</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <img :src="refresh">
              <el-button type="text" class="textBtn" @click="Overlayclear()">清屏</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <img :src="reset">
              <el-button type="text" class="textBtn" @click="viewExtent()">全副</el-button>
            </el-col>
          </el-row>
          <hr style=" height:1px;border:none;border-top:1px solid #cccccc;" />
          <el-checkbox-group v-model="checked" @change="densityClick">
            <el-row>
              <el-col>
                <el-checkbox>人口分布</el-checkbox>
              </el-col>
            </el-row>
          </el-checkbox-group>
          <hr style=" height:1px;border:none;border-top:1px solid #cccccc;" />
          <el-checkbox-group v-model="nameList" @change="nameItemClick">
            <el-row>
              <el-col>
                <el-checkbox label="toolStreetName">道路名称</el-checkbox>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-checkbox label="toolHouseName">房屋名称</el-checkbox>
              </el-col>
            </el-row>
          </el-checkbox-group>
        </div>
      </transition>
    </div>
    <div class="map_change" v-bind:style="{top:windowHeight}">
      <div class="change_theme" v-bind:class="{activetheme:activetheme}">
        <div class="item" v-if="!activetheme" @click="themeActive('red')">
          <img :src="red">
        </div>
        <div class="item" v-if="!activetheme" @click="themeActive('yellow')">
          <img :src="yellow">
        </div>
        <div class="item" v-if="!activetheme" @click="themeActive('none')">
          <img :src="no_border">
        </div>
        <div ref="themeIcon" class="item" name="1" @click="themeActive('push')">
          <img :src="theme">
        </div>
      </div>
      <div class="change_type" @click="typeChange">{{selectMap}}</div>
      <div class="change_zoom">
        <div class="change_zoom_item waves-effect waves-light btn" @click="mapZoom('in')">
          +
        </div>
        <div class="change_line">
        </div>
        <div class="change_zoom_item" @click="mapZoom('out')">
          -
        </div>
      </div>
      <div class="change_map" ref="$change_map">
        <div class="item" @click="typeClick('1')">
          <img :src="getSL">
        </div>
        <div class="item" @click="typeClick('2')">
          <img :src="getYX">
        </div>
        <div class="item_btn">
          <img ref="$arrow" style="height:10px;" :src="icon_arrow" @click="arrowClick()">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  var pointList = [];
  import autocomplete from "./autocomplete/autocomplete";
  import vistualComponent from "./vistual.component";
  import service from "./services/density.js";
  import { TimelineMax, TweenMax, Power2 } from "gsap/src/minified/TweenMax.min";
  import {
    setEnabletype,
    setMapZoom,
    setLayerVisible,
    setLayerLight,
    activeMeature,
    activeArea,
    setFullExtent,
    clear,
    bindSceneSelect,
    setlayerStyle
  } from "./link.map";
  import { transformByLayerName, transform } from "./common/json.transform";
  import {
    icon_yinxiang_default,
    icon_shiliang_default,
    icon_yinxiang_select,
    icon_shiliang_select,
    icon_tool_map,
    icon_tools_arrow
  } from "./common/image";
  // 引入Observable对象
  import { VistualEmit } from "./vistual.emit";
  import { Observable_ } from "./observable";
  import { HeatOper } from "./heatOper.js";

  import { mapState, mapMutations } from 'vuex';
  let maps;
  export default {
    // 非vue变量
    wHeightObservable: null,
    components: {
      autocomplete,
      vistualComponent
    },
    props: {
      // 获取地图加载要绑定的全局名称
      mapname: "",
      // 地图组件配置文件（用来生成界面元素）
      layers: null
    },
    data() {
      return {
        // 窗体高度
        windowHeight: "0px",
        // AutoComplete 的高度
        autoCompleteHeight: 700,
        // 选择的地图渲染模式（可选2d、3d）
        selectMap: "2d",
        // 显示的地图背景图（可选shiliang,yingxiang）
        selectType: "shiliang",
        setLayerVisible: setLayerVisible,
        // 箭头图片
        icon_arrow: icon_tool_map,
        // 小三角
        icon_tools_arrow: icon_tools_arrow,
        // 是否收起
        $change_map_isvisible: false,
        // 是否显示网格显影控制面板
        isShowGridPanel: false,
        //是否显示工具显隐控制面板
        isShowToolPanel: false,
        lineLogo: require("../../../assets/images/main/lineMeasure.png"),
        areaLogo: require("../../../assets/images/main/areaMeasure.png"),
        refresh: require("../../../assets/images/main/refresh.png"),
        reset: require("../../../assets/images/main/reset.png"),
        theme: require("../../../assets/images/main/grid_icon_filp_left.svg"),
        theme1: require("../../../assets/images/main/grid_icon_filp_right.svg"),
        red: require("../../../assets/images/main/grid_icon_one.svg"),
        yellow: require("../../../assets/images/main/grid_icon_two.svg"),
        no_border: require("../../../assets/images/main/grid_icon_noborder.svg"),
        grid: [],
        nameList: [],
        densityList: [],
        checked: false,
        gridSelect: "",
        densitySelect: "",
        densityAry: [],
        t1: null,
        // 需要清理的观察者对象
        os1: null,
        os2: null,
        os3: null,
        os4: null,
        // 地图 theme切换
        activetheme: true
      };
    },
    /**
     * 完成了 data 数据的初始化，el没有
     */
    created() {
      let self = this;
      this.os1 = this.wHeightObservable = this.$parent.eventService.sizeHeight$.subscribe(
        e => {
          if (window[self.mapname]) {
            window[self.mapname].olcusium.updateSize();
          }
          this.windowHeight = e - 447 + "px";
        }
      );
      this.observable_ = new Observable_(this);
      this.getHeatPoint();
      // 监听map是否加载完毕
      this.os2 = VistualEmit.getObservable("mapinit").subscribe(evt => {
        // BehaviorSubject构建完成默认会推送一个空值过来
        if (!evt) {
          return;
        }
        maps = window[self.mapname];
        this.highlight = setLayerLight(self, maps);
        // 绑定地图焦点事件，触发autocomplete控件animate方法
        this.os3 = maps.getFocus().subscribe(event => {
          self.$refs["$vistualComponent"].animate();
        });
        // 绑定三维选择事件
        bindSceneSelect(self, maps);
      });
      // 监听非vue组件弹出气泡的事件
      this.os4 = VistualEmit.getObservable("popup").subscribe(evt => {
        if (!evt) {
          return;
        }
        this.$popup.showNotification({ message: evt });
      });
    },
    // 组件注销前还原操作状态
    beforeDestroy() { },
    /**
     * 组件加载完成后
     */
    mounted() {
      // 根绝ol的配置文件设置默认界面渲染参数
      this.selectMap = this.layers.DEFAULT_RENDER;
      // 首先在Virtual DOM渲染数据时，设置下背景图的高度．
      let that = this;
      // 工具栏中-沁水网格icon对象
      this.gridIcon = this.$refs["gridIcon"];
      this.toolIcon = this.$refs["toolIcon"];
      this.themeIcon = this.$refs["themeIcon"];
    },
    watch: {
      selectType(nValue, oValue) {
        let json = {
          shiliang: {
            show: false
          },
          yingxiang: {
            show: false
          },
          yingxiang1: {
            show: false
          }
        };
        json[nValue].show = true;
        if (nValue === "yingxiang") {
          json["yingxiang1"].show = true;
        }
        this.setLayerVisible(maps, json);
      }
    },
    computed: {
      ...mapState('statisModels', [
        'statisModels'
      ]),
      getSL: {
        cache: false,
        get() {
          if (this.selectType === "yingxiang") {
            return icon_shiliang_default;
          } else {
            return icon_shiliang_select;
          }
        }
      },
      getYX: {
        cache: false,
        get() {
          if (this.selectType === "yingxiang") {
            return icon_yinxiang_select;
          } else {
            return icon_yinxiang_default;
          }
        }
      }
    },
    methods: {
      ...mapMutations('statisModels', [
        'handleStatisModels'
      ]),
      // 切换地图、场景按钮点击事件
      typeClick(type) {
        if (type === "1") {
          this.selectType = "shiliang";
        } else {
          this.selectType = "yingxiang";
        }
      },
      /**
       * 是否切换地图样式
       */
      themeActive(type) {
        let maps = window[this.mapname];
        setlayerStyle(this, maps, "house", type);
        switch (type) {
          case "red":
            this.activetheme = "red";
            break;
          case "yellow":
            this.activetheme = "yellow";
            break;
          case "none":
            this.activetheme = "none";
            break;
          default:
            this.activetheme = !this.activetheme;
            if (!this.activetheme) {
              TweenMax.to(this.themeIcon, 0.4, {
                rotation: 180
              });
            } else {
              TweenMax.to(this.themeIcon, 0.4, {
                rotation: 0
              });
            }
            return;
        }
        TweenMax.to(this.themeIcon, 0.4, {
          rotation: 0
        });
      },
      /**
       * 二维三维切换
       */
      typeChange() {
        if (this.selectMap === "3d") {
          this.selectMap = "2d";
        } else {
          this.selectMap = "3d";
        }
        setEnabletype(maps, this.selectMap);
      },
      /**
       * 地图缩放
       */
      mapZoom(type) {
        setMapZoom(maps, type);
      },
      /**
       * 伸缩按钮点击事件
       * step1:收起，展开面板
       * step2:翻转arrow
       */
      arrowClick() {
        if (this.t1) {
          this.t1.pause();
          this.t1.kill();
        }
        this.tl = new TimelineMax({});
        if (!this.$change_map_isvisible) {
          this.tl.add(
            TweenMax.to(this.$refs["$change_map"], 0.6, {
              width: "40",
              marginLeft: "0"
            })
          );
          this.tl.add(
            TweenMax.to(this.$refs["$arrow"], 0.6, {
              rotation: 180
            })
          );
        } else {
          this.tl.add(
            TweenMax.to(this.$refs["$change_map"], 0.6, {
              width: "240",
              marginLeft: "-200"
            })
          );
          this.tl.add(
            TweenMax.to(this.$refs["$arrow"], 0.6, {
              rotation: 0
            })
          );
        }
        this.$change_map_isvisible = !this.$change_map_isvisible;
      },
      // 沁水网格按钮事件
      gridClick() {
        this.isShowToolPanel = false;
        if (this.isShowGridPanel) {
          TweenMax.to(this.gridIcon, 0.4, {
            rotation: 0
          });
        } else {
          TweenMax.to(this.gridIcon, 0.4, {
            rotation: 180
          });
        }
        this.isShowGridPanel = !this.isShowGridPanel;
      },
      toolClick() {
        this.isShowGridPanel = false;
        if (this.isShowToolPanel) {
          TweenMax.to(this.toolIcon, 0.4, {
            rotation: 0
          });
        } else {
          TweenMax.to(this.toolIcon, 0.4, {
            rotation: 180
          });
        }
        this.isShowToolPanel = !this.isShowToolPanel;
      },
      //测量距离
      lineMeasure() {
        activeMeature(this, maps);
      },
      // 测量面积
      areaMeature() {
        activeArea(this, maps);
      },
      // 清空
      Overlayclear() {
        clear(maps);
      },
      // 全副
      viewExtent() {
        setFullExtent(maps);
      },
      densityClick(checked) {
        if (checked) {
          maps.olcusium.addLayer(pointList);
        } else {
          maps.olcusium.removeLayer(pointList);
        }
      },
      getHeatPoint() {
        service.service.getDensity({
          successFunc: data => {
            let arr = [];
            _.map(data.data, obj => {
              if (obj.lon !== undefined && obj.lat !== undefined) {
                for (let i = 0; i < obj.both; i++) {
                  arr.push({
                    lon: obj.lon,
                    lat: obj.lat
                  });
                }
              }
            });
            this.densityAry = arr;
            pointList = HeatOper.addHeatMap(this.densityAry);
          }
        });
        return pointList;
      },
      gridItemClick(type) {
        if (type.length > 0) {
          this.gridSelect = type[type.length - 1];
          // checkbox多选控件需要传入数组
          // 保证每一次都选中一个对象，传入一个长度为1或者0的数组
          this.grid = [type[type.length - 1]];
          // 定义图层显影json，批量控制显影
          this.setLayerVisible(
            maps,
            transform(transformByLayerName(this.gridSelect), {
              house: { show: !(this.activetheme === "none") }
            })
          );
        } else {
          this.grid = [];
          this.gridSelect = 0;
          // 定义图层显影json，批量控制显影
          this.setLayerVisible(
            maps,
            transform(transformByLayerName(), {
              house: { show: !(this.activetheme === "none") }
            })
          );
        }
      },
      nameItemClick(type) {
        let json = {
          street: {
            show: false
          },
          building: {
            show: false
          }
        };
        this.setLayerVisible(maps, json);
        _.map(type, obj => {
          if (obj == "toolStreetName") {
            let json = {
              street: {
                show: true
              }
            };
            this.setLayerVisible(maps, json);
          } else if (obj == "toolHouseName") {
            let json = {
              building: {
                show: true
              }
            };
            this.setLayerVisible(maps, json);
          }
        });
      },
      /**
       * autocomplete内容改变事件
       */
      autoCompleteChange(keyword, type, region, id, code) {
        VistualEmit.emit("change", {
          keyword: keyword,
          type: type,
          region: region,
          id: id,
          code: code
        });
      },
      autoCompleteChangeByType(type) {
        VistualEmit.emit("changeType", {
          type: type
        });
      },
      /**
       * 截取屏幕
       */
      cutImg() {
        this.isShowToolPanel = false;
        this.isShowToolPanel = false;
        let cut = new cutImage();
        cut.config.name = "截图文件";
        cut.cut(cut.config.name);
      }
    },
    // 注销方法
    destroyed() {
      this.wHeightObservable.unsubscribe();
      maps.olcusium.removeLayer(pointList);
      this.os1.unsubscribe();
      this.os2.unsubscribe();
      this.os3.unsubscribe();
      this.os4.unsubscribe();
      VistualEmit.emit("change", "");
      VistualEmit.emit("mapinit", "");
    }
  };
</script>
<style lang="sass">
  @import "./main.scss";
</style>