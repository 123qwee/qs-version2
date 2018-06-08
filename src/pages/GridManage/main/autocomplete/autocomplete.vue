<template>
  <div class="map_autocomplete" :style="{maxHeight:height+'px'}">
    <div ref="$top">
    <transition
      name="custom-classes-transition"
      enter-active-class="animated fadeInUp"
      leave-active-class="animated fadeOutDown">
      <div class="autocomplete_tag" v-if="tag_name">
        {{tag_name}}
      </div>
    </transition>
    <el-autocomplete
      ref="autocomplete"
      popper-class="my-autocomplete"
      v-model="state3"
      :fetch-suggestions="querySearch"
      placeholder="搜地点、找位置"
      :trigger-on-focus="false"
      @select="handleSelect">
      <i v-if="isNotNUll"
        class="el-icon-minus el-input__icon"
        slot="suffix"
        @click="handleClear">
      </i>
      <i v-if="isNotNUll"
        class="el-icon-close el-input__icon"
        slot="suffix"
        @click="handleClear">
      </i>
      <template slot-scope="props">
        <div class="el-autocomplete-content">
          <div class="tag_left">
            <div class="name">{{ props.item.value }}</div>
            <span class="addr">{{ props.item.address }}</span>
          </div>
          <div class="tag_right">
            <span class="tag"  v-bind:class="getClassByTag(props.item.type)">{{props.item.type}}</span>
          </div>
        </div>
      </template>
    </el-autocomplete><!--去间距 删了就不行了
    --><div class="map_autocomplete_search" @click="search()">
        <img :src="icon_search">
      </div>
    <transition
      name="custom-classes-transition"
      enter-active-class="animated fadeInUp"
      leave-active-class="animated fadeOutDown">
      <div v-if="isOnFocus" class="easy_search">
        <div class="search_border">
          <div class="search_item" v-for="(item, index) in toolDatas" :key="index" @click="searchByType(item)">
            <img :src="item.url">
            <div>{{item.title}}</div>
          </div>
        </div>
      </div>
    </transition>
    <transition
      name="custom-classes-transition"
      enter-active-class="animated fadeInUp"
      leave-active-class="animated fadeOutDown">
      <div v-if="isShowRegion" class="search_region">
        <div ref="resultStaticBar" class="region">
        <happy-scroll color="rgba(51,51,51,0.2)" hide-horizontal resize size="8">
          <div class="search_border">
            <div class="title">沁水县</div>
            <ul>
              <li v-for="(item,index) in queryResult" :key="index">
                <span class="icon" title="点击展开" @click="queryRegionCollapse(item)">
                  <a v-if="item.collapse">-</a>
                  <a v-if="!item.collapse">+</a>
                </span>
                <span class="title" @click="queryResultClick(item)" v-bind:class="getNoneClass(item)">{{index}}</span>
                &nbsp;
                <span class="count" @click="queryResultClick(item)">({{item.count}})</span>
                <ul v-if="item.collapse" v-for="(item1,index1) in item.children">
                  <li>
                    <span></span>
                    <span class="title" @click="queryResultClick(item1)" v-bind:class="getNoneClass(item1)">{{index1}}</span>
                    &nbsp;
                    <span class="count" @click="queryResultClick(item1)">({{item1.count}})</span>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </happy-scroll>
        </div>
        <div class="unfocus" style="opacity:0;display:none;"  ref="resultBar" :data-fold="staticMessage" @click="resultBarClick()">
        </div>
      </div>
    </transition>
    </div>
    <div v-if="isShowResult" ref="resultListBar" class="result" :style="{height:resultHeight+'px'}">
      <slot name="component"></slot>
    </div>
  </div>
</template>
<script>
import { Observable, Subject } from "rxjs";
import { TimelineMax, TweenMax, Power2 } from "gsap/src/minified/TweenMax.min";
import { data } from "./data";
import { tooldata, getTag } from "./tooldata";
import { regiondata } from "./regiondata";
import { HappyScroll } from "vue-happy-scroll";
import { MESSAGE, convertMessage } from "./message";
import { PeopleService } from "../services/people.service";
import elementResizeEvent from "element-resize-event";
const icon_search = require("../../../../assets/images/map/sebar_icon_search.png");
import { VistualEmit } from "../vistual.emit";

export default {
  components: { HappyScroll }, //在组件内注册
  props: {
    // 获取地图加载要绑定的全局名称
    mapname: "",
    // 高度
    height: 0
  },
  data() {
    return {
      MESSAGE: MESSAGE,
      // 判定是否输入框有内容
      isNotNUll: false,
      // 查询类别
      queryType: null,
      // 是否获得焦点
      isOnFocus: false,
      isShowRegion: false,
      isShowResult: false,
      // 下拉框获得焦点显示的内容
      toolDatas: tooldata,
      // 分类查询结果
      queryResult: {},
      // 收起、打开动画
      animateT: null,
      // 统计显示文字
      staticMessage: "",
      // staticMessages是否可以展开
      staticMessageShouldOpen: true,
      // 查询显示文字
      queryMessage: "",
      restaurants: [],
      // 结果列表高度设置
      resultItemsHeight: 0,
      // 查询图标
      icon_search: icon_search,
      // tag显示文字
      tag_name: "",
      // result的样式高度
      resultHeight: 0,
      state3: "",
      // 选中对象
      select_item: null
    };
  },
  computed: {
    // queryMessage: () => {
    //   return "共查询到" + this.queryType === undefined
    //     ? ""
    //     : this.queryType + "的结果15条";
    // }
  },
  watch: {
    queryType(nValue, oValue) {
      // 设置显示文字
      this.setMessage(MESSAGE.STATIC_MESSAGE, this.queryType);
    },
    isShowResult(nValue, oValue) {
      if (nValue) {
        this.resultHeight = this.height - this.topCtl.clientHeight;
      }
    }
  },

  /**
   * 完成了 data 数据的初始化，el没有
   */
  created() {},

  /**
   * 组件加载完成后
   */
  mounted() {
    this.restaurants = this.loadAll();
    this.topCtl = this.$refs["$top"];
    // 自动完成框控件
    this.autocompleteCtl = this.$refs["autocomplete"];
    // 显示记录状态的面板
    this.resultBarCtl = this.$refs["resultBar"];
    // 显示查询统计结果面板
    this.resultStaticBarCtl = this.$refs["resultStaticBar"];
    // 结果面板
    this.resultListBarCtl = this.$refs["resultListBar"];
    // 监听输入的文本长度
    let inputCtl = this.autocompleteCtl.$refs.input.$refs.input;
    // 设置文本触发事件
    this.observableChange = new Subject();
    // 合并输入框的输入事件和输入框的监听器，可以手动触发输入框的数值改变
    Observable.fromEvent(inputCtl, "input")
      .merge(this.observableChange)
      .map(event => {
        // 判断event是否为null
        if (event === null) {
          event = {};
          event = this.queryType;
          return event;
        } else {
          return event.target.value;
        }
      })
      .do(val => {
        if (val.length > 0) {
          this.isOnFocus = false;
          this.isNotNUll = true;
        } else {
          this.handleClear("", true);
          this.isOnFocus = true;
        }
      })
      .distinctUntilChanged()
      .subscribe(event => {});
    // 监听输入框是否触发焦点
    Observable.fromEvent(inputCtl, "focus").subscribe(event => {
      if (!(this.state3 && this.state3.length >= 0)) {
        this.isOnFocus = true;
      }
    });
    Observable.fromEvent(inputCtl, "blur").subscribe(event => {
      this.isOnFocus = false;
    });
    if (this.topCtl) {
      elementResizeEvent(this.topCtl, event => {
        if (this.$refs["resultListBar"]) {
          this.$refs["resultListBar"].style.height =
            this.height - this.topCtl.clientHeight;
        }
        // this.isShowResult = false;
        // this.isShowResult = true;
      });
    }
  },

  methods: {
    // input 查询事件
    querySearch(queryString, cb) {
      if (queryString.length < 2) {
        cb([]);
        return;
      }
      // 判定输入框是否不为空
      PeopleService.getFuzz(queryString, data => {
        if (!data) {
          cb([]);
          return;
        }
        if (_.size(data) === 0) {
          cb([]);
          return;
        }
        // 调用 callback 返回建议列表的数据
        cb(data);
      });
    },
    loadAll() {
      return data;
    },
    // input 选中事件
    handleSelect(item) {
      // 在输入框写入tag_name
      this.tag_name = item.type;
      this.search(item.value, item.type, "", item.id, item.code);
    },
    // 推送新值到输入框中
    pushSelect(item) {
      this.state3 = item.value;
      this.observableChange.next({ target: { value: item.value } });
      // 在输入框写入tag_name
      this.tag_name = item.type;
      /**
       * 2018-4-11
       * 判定id是否为空，若不为空，需要传送该值
       */
      let id = item.id ? item.id : "";
      this.search(item.value, item.type, "", id, item.code);
    },
    // 清空输入框输入内容
    handleClear(ev, close) {
      this.tag_name = "";
      this.state3 = "";
      // 关闭下拉框
      if (!close) {
        this.autocompleteCtl.close();
      }
      if (this.animateT) {
        this.animateT.kill();
        this.animateT = null;
      }
      this.isNotNUll = false;
      this.isShowRegion = false;
      this.isShowResult = false;
      VistualEmit.emit("empty", "null");
    },

    /**
     * 根据关键词查询查询
     * @param {*} keyword 关键词
     * @param {*} type 类别
     * @param {*} region 区域
     * @param {*} id 唯一表示码
     * @param {*} code 网格编码
     */
    search(keyword, type, region, id, code) {
      if (type) {
        this.isShowResult = true;
        // 传出search事件
        this.$emit("search", keyword, type, region, id, code);
        return;
      }
    },
    searchByType(type) {
      this.state3 = type.title;
      this.queryType = type.title;
      this.$emit("searchByType", this.queryType);
      this.isShowRegion = true;
      this.observableChange.next(null);
    },
    resultBarClick() {
      if (!this.staticMessageShouldOpen) {
        return;
      }
      this.animateT.reverse();
      if (this.resultListBarCtl) {
        TweenMax.to(this.resultListBarCtl, 0.6, {
          height: this.height - 240
        });
      }
    },
    queryResultClick(item) {
      if (
        !(item.count === undefined || item.count === null) &&
        item.count === 0
      ) {
        return;
      }
      // 改变选中状态
      if (this.select_item) this.select_item.select = false;
      item.select = true;
      this.select_item = item;
      this.isShowResult = true;
      // 返回给业务组件，第一个为填入的值，第二个为查询类型，第三个为区域，第四个为数量
      this.search("", this.queryType, item.gridCode, item.count);
    },
    queryRegionCollapse(item) {
      item.collapse = !item.collapse;
    },
    animate() {
      this.topCtl = this.$refs["$top"];
      this.resultStaticBarCtl = this.$refs["resultStaticBar"];
      this.resultBarCtl = this.$refs["resultBar"];
      this.resultListBarCtl = this.$refs["resultListBar"];
      if (this.resultStaticBarCtl) {
        if (this.animateT) {
          // 播放动画
          this.animateT.play();
          if (this.resultListBarCtl) {
            TweenMax.to(this.resultListBarCtl, 0.5, {
              height: this.height - 110
            });
          }
          return;
        }
        // 定义时间轴
        this.animateT = new TimelineMax({});
        this.animateT.to(this.resultBarCtl, 0, { display: "block" });
        // 改变结果显示面板的高度
        this.animateT.to(this.resultStaticBarCtl, 0.5, { height: 15 });
        if (this.resultListBarCtl) {
          TweenMax.to(this.resultListBarCtl, 0.5, {
            height: this.height - 110
          });
        }
        // 改变结果显示面板透明度
        this.animateT.to(this.resultStaticBarCtl, 0.25, { opacity: 0 });
        // 改变文字显示面板透明度
        this.animateT.to(this.resultBarCtl, 0.25, { opacity: 1 });
      }
    },
    // 设置显示文本
    setMessage(message, ...params) {
      // 设置显示文字
      this.staticMessage = convertMessage(message, ...params);
    },
    getClassByTag(type) {
      return getTag(type);
    },
    getNoneClass(item) {
      return {
        // 如果当前的内容的count数为0
        noneselect: item.count === 0,
        // 是否被选中
        selected: item.select
      };
    }
  }
};
</script>
<style lang="sass">
@import "./autocomplete.scss";
</style>
