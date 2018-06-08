<template>
    <component :is="currentView" :mapname="mapname" :type="type" :keyword="keyword" :region="region" :code="code" :id="id">
      <!-- 非活动组件将被缓存！ -->
    </component>
</template>
<script>
/**
 * 这个对象用来处理逻辑事件，当模糊查询框改变查询的类型或者名称时
 * 这个组件根绝传入的类型和名称动态改变要渲染的要素
 */
import peopleInfoComponent from "./items/people/people.info.component";
import peopleComponent from "./items/people/people.component";
// 4-10日添加民房详情页面
import peopleCitizenInfoComponent from "./items/people/people.citizen.info.component";
import schoolInfoComponent from "./items/school/school.info.component";
import schoolComponent from "./items/school/school.component";
import businessInfoComponent from "./items/business/business.info.component";
import businessComponent from "./items/business/business.component";
import organizeInfoComponent from "./items/organize/organize.info.component";
import organizeComponent from "./items/organize/organize.component";
import partyWorkInfoComponent from "./items/party_work/partyWork.info.component";
import partyWorkComponent from "./items/party_work/partyWork.component";
import gridComponent from "./items/grid/grid.component";
import { VistualEmit } from "./vistual.emit";
import { QueueComponent } from "./queue.component";
import {
  addMarker as addMarkerOper,
  addMarkerByLonLat as addMarkerByPointsOper,
  removeMarker,
  clearFeatures
} from "./link.map";
export default {
  props: {
    // 获取地图加载要绑定的全局名称
    mapname: ""
  },
  components: {
    //要把组件写入到components里面，如果没有放的话在切换的时候就会找不到 组件
    peopleInfoComponent: peopleInfoComponent,
    peopleComponent: peopleComponent,
    peopleCitizenInfoComponent: peopleCitizenInfoComponent,
    schoolInfoComponent: schoolInfoComponent,
    schoolComponent: schoolComponent,
    businessInfoComponent: businessInfoComponent,
    businessComponent: businessComponent,
    organizeInfoComponent: organizeInfoComponent,
    organizeComponent: organizeComponent,
    partyWorkInfoComponent: partyWorkInfoComponent,
    partyWorkComponent: partyWorkComponent,
    gridComponent: gridComponent
  },
  data() {
    return {
      currentView: null,
      Observable: null,
      type: "",
      keyword: "",
      region: "",
      code: "",
      id: ""
    };
  },
  watch: {
    currentView(nValue, oValue) {
      // info组件设置staticmessage禁止展开
      if (nValue.indexOf("Info") !== -1) {
        this.$parent.staticMessageShouldOpen = false;
      } else {
        this.$parent.staticMessageShouldOpen = true;
      }
    }
  },
  created() {
    this.queueComponent = new QueueComponent(this.currentView);
  },
  mounted() {
    // 监听当前要显示的界面元素
    this.Observable = VistualEmit.getObservable("change").subscribe(event => {
      if (!event) {
        return;
      }
      this.search(
        event.keyword,
        event.type,
        event.region,
        event.code,
        event.id
      );
    });
    // 模糊搜索框的清空操作
    this.Observable1 = VistualEmit.getObservable("empty").subscribe(event => {
      // 清空组件队列
      this.queueComponent.clear();
      // 释放容器
      this.currentView = null;
      // 清除功能模块内添加的marker
      removeMarker();
      // 清除功能模块内添加的矢量
      clearFeatures();
    });
  },
  destroyed() {
    // 释放观察者
    this.Observable && this.Observable.isun && this.Observable.unsubscribe();
    this.Observable1 && this.Observable1.unsubscribe();
  },
  methods: {
    /**
     * 关键词，类型，区域，编码，编号
     */
    search(keyword, type, region, code, id) {
      if (type || type === "") this.type = type;
      if (keyword || keyword === "") this.keyword = keyword;
      if (region || region === "") this.region = region;
      if (code || code === "") this.code = code;
      if (id || id === "") this.id = id;
      if (type === "人房") {
        /**
         * 2018-4-10
         * 修改人房的判断条件，新增民房类别（庭院房、单元房）
         * 判断规则倒数第4位如果为0为开头是楼房，为1是片区
         */
        if (!keyword) {
          this.currentView = "peopleComponent";
        } else {
          if ((code + "").substr(15, 1) === "0") {
            this.currentView = "peopleInfoComponent";
          } else {
            this.currentView = "peopleCitizenInfoComponent";
          }
        }
      } else if (type === "学校") {
        if (!keyword) {
          this.currentView = "schoolComponent";
        } else {
          this.currentView = "schoolInfoComponent";
        }
      } else if (type === "工商") {
        if (!keyword) {
          this.currentView = "businessComponent";
        } else {
          this.currentView = "businessInfoComponent";
        }
      } else if (type === "组织") {
        if (!keyword) {
          this.currentView = "organizeComponent";
        } else {
          this.currentView = "organizeInfoComponent";
        }
      } else if (type === "党务") {
        if (!keyword) {
          this.currentView = "partyWorkComponent";
        } else {
          this.currentView = "partyWorkInfoComponent";
        }
      }
      if (type === "网格") {
        if (keyword) {
          this.currentView = "gridComponent";
        }
      }
      // 如果是相同的组件是不需要放进队列的，只需要改变存储的值
      if (
        this.queueComponent.getLast() &&
        this.queueComponent.getLast().element.currentview === this.currentView
      ) {
        this.queueComponent.getLast().element.type = this.type;
        this.queueComponent.getLast().element.keyword = this.keyword;
        this.queueComponent.getLast().element.region = this.region;
        this.queueComponent.getLast().element.code = this.code;
        this.queueComponent.getLast().element.id = this.id;
        return;
      }
      this.queueComponent.push({
        currentview: this.currentView,
        type: this.type,
        keyword: this.keyword,
        region: this.region,
        code: this.code,
        id: this.id
      });
    },
    /**
     * 返回上一级component
     * 返回操作流程：出队列=》如果不为空=》设置当前视图为此对象=》如果为空=》关闭面板=》设置面板为null
     */
    back() {
      let view = this.queueComponent.back();
      if (view !== null && view.currentview) {
        this.currentView = view.currentview;
      } else {
        this.$parent.handleClear();
        this.currentView = null;
      }
      // this.currentView = this[component.name];
    },
    /**
     * 传入id的数组集合
     */
    async addMarker(ids, type, fn) {
      return await addMarkerOper(type, window[this.mapname], ids, fn);
    },
    /**
     * 传入点集合数组添加点
     */
    addMarkerByPoints(pts, fn) {
      return addMarkerByPointsOper(window[this.mapname], pts, fn);
    },
    /**
     * 清空marker
     */
    removeMarker() {
      removeMarker();
    }
  }
};
</script>

<style>

</style>
