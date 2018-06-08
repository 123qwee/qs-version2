<template>
    <div id="map1" ref="_map">
    </div>
  </template>
  
  <script>
  /**
   * 地图无法监视到加载成功的状态，避免vue的生命周期，采用同步的方式去发送同步加载后的事件
   */
  import mapApi from "./main";
  import { Observable } from "rxjs";
  
  export default {
    props: {
      // 设置绑定到的maps全局变量
      maps: "",
      // 图层layers
      layers: {}
    },
    data() {
      return {
        olconfig: this.layers,
        mapApi
      };
    },
    mounted() {
      if (this.maps) {
        // 获得的是map中的init 对象
        window[this.maps] = mapApi.init("map1", this.layers);
        this.$emit("afterinit");
      }
      // 绑定地图的激活、释放事件
      // this.map.global.notifyDataChanged("status", "focus");
      // this.map.olcusium.on("mousedown", () => {
      //   alert("11");
      // });
      // const mouseDown$ = Observable.fromEvent(
      //   this.$refs["_map"].children,
      //   "mousedown"
      // );
      // const mouseMove$ = Observable.fromEvent(
      //   this.$refs["_map"].children,
      //   "mousemove"
      // );
      // const mouseUp$ = Observable.fromEvent(
      //   this.$refs["_map"].children,
      //   "mouseup"
      // );
  
      // mouseDown$
      //   .do(() => {
      //     //alert("2");
      //   })
      //   .map(event => ({
      //     event
      //   }))
      //   .switchMap(initialState => {
      //     //alert("2");
      //     return mouseMove$.takeUntil(mouseUp$);
      //   })
      //   .subscribe(pos => {
      //     alert("123");
      //   });
    },
    // 组件销毁时销毁地图组件
    destroyed() {
      window[this.maps] = null;
    }
  };
  </script>
  
  <style scoped>
  #map {
    width: 100%;
    height: 100%;
  }
  </style>
  