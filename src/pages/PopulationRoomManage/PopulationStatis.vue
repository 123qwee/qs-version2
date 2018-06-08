<template>
  <div class="key-pople-statis">
    <button @click="backMap">返回</button>
    <el-row type="flex" justify="space-around" style="height:calc(50% - 8px )">
      <el-col :span="12" class="col-2-width">
        <vCard :bodyStyle="defaultStyle" resizeEvent="triDealStats">
          <div slot="header">{{selectType}}年人口增长趋势</div>
          <div slot="actions">
            <i class="md-icon material-icons md-card-fullscreen-activate toolbar_fixed" title="最大化">&#xE5D0;</i>
          </div>
          <div id="PopleGrowthTrendChart" style="height:100%"></div>
        </vCard>
      </el-col>
      <el-col :span="12" class="col-2-width" style="margin-left:10px;">
        <vCard :bodyStyle="defaultStyle" resizeEvent="triDealStats">
          <div slot="header">{{selectType}}年人口年龄占比</div>
          <div slot="actions">
            <i class="md-icon material-icons md-card-fullscreen-activate toolbar_fixed" title="最大化">&#xE5D0;</i>
          </div>
          <div id="PopleAgeChart" style="height:100%"></div>
        </vCard>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around" style="margin-top:10px;height:calc(50% - 8px )">
      <el-col :span="12" class="col-2-width">
        <vCard :bodyStyle="defaultStyle" resizeEvent="triDealStats">
          <div slot="header">{{selectType}}年各区域人口数量</div>
          <div slot="actions">
            <i class="md-icon material-icons md-card-fullscreen-activate toolbar_fixed" title="最大化">&#xE5D0;</i>
          </div>
          <div id="PopleRegionChart" style="height:100%"></div>
        </vCard>
      </el-col>
      <el-col :span="12" class="col-2-width" style="margin-left:10px;">
        <vCard :bodyStyle="defaultStyle" resizeEvent="triDealStats">
          <div slot="header">{{selectType}}年各区域人口类型</div>
          <div slot="actions">
            <i class="md-icon material-icons md-card-fullscreen-activate toolbar_fixed" title="最大化">&#xE5D0;</i>
          </div>
          <div id="PopleTypeChart" style="height:100%"></div>
        </vCard>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  //默认年
  var year = "";
  let myDate = new Date(); //获取系统当前时间
  year = myDate.getFullYear().toString();
  //默认地区
  var region = "";
  //默认年龄区间
  var age = "";
  //趋势统计
  var trendList = [];
  //年龄统计
  var ageList = [];
  //区域统计
  var regionList = [];
  //人口类型统计
  var typeCompareList = [];

  import vCard from "@/components/card/Card.vue";
  import chartOptions from './statis_config.js';
  import service from "./people_room_service.js";

  import { mapMutations } from 'vuex'
  export default {
    components: {
      vCard
    },
    data() {
      return {
        //选种类型
        selectType: year,
        // card组件默认样式
        defaultStyle: {
          padding: 0,
          backgroundColor: "#fff"
        },
        PopleGrowthTrendChart: null, // 人口增长趋势
        PopleAgeChart: null, // 人口年龄占比
        PopleRegionChart: null, // 各区域人口数量
        PopleTypeChart: null, // 各区域人口类型占比
        PopleGrowthTrendOptions: _.cloneDeep(chartOptions.PopleGrowthTrendOptions),
        PopleRegionOptions: _.cloneDeep(chartOptions.PopleRegionOptions),
        pieOptions: _.cloneDeep(chartOptions.pieOptions),
      };
    },
    created() {
      let that = this;
      that.getPopGrowth(year);
      that.getAgePer(year);
      that.getTypeCompare(year);
      that.getRegionPop(year);
      setTimeout(function () {
        that.handleQueryPopleGrow();
        that.handleQueryAgeChart();
        that.handleQueryRegionNum();
        that.handleQueryTypeChart();
      }, 500);
    },
    mounted() {
      let that = this;
      // 人口增长趋势
      let PopulationGrowthTrendDom = this.$el.querySelector(
        "#PopleGrowthTrendChart"
      );
      this.PopleGrowthTrendChart = this.$echarts.init(PopulationGrowthTrendDom);
      // 人口年龄占比
      let PopleAgeDom = this.$el.querySelector("#PopleAgeChart");
      this.PopleAgeChart = this.$echarts.init(PopleAgeDom);
      // 各区域人口数量
      let PopleRegionDom = this.$el.querySelector("#PopleRegionChart");
      this.PopleRegionChart = this.$echarts.init(PopleRegionDom);
      // 各区域人口类型占比
      let PopleSexDom = this.$el.querySelector("#PopleTypeChart");
      this.PopleTypeChart = this.$echarts.init(PopleSexDom);
      // 初始化统计图自适应函数
      this.$bus.$on("triDealStats", () => {
        that.PopleGrowthTrendChart.resize();
        that.PopleAgeChart.resize();
        that.PopleRegionChart.resize();
        that.PopleTypeChart.resize();
      });
    },
    methods: {
      ...mapMutations('statisModels', [
        'backMap'
      ]),
      getPopGrowth() {
        service.service.popGrowth({
          data: {},
          successFunc: data => {
            if (data.code == 200) {
              trendList = [];
              _.map(data.data, (key, value) => {
                let peopleLine = {
                  year: "",
                  count: 0
                };
                peopleLine.year = value;
                peopleLine.count = key;
                trendList.push(peopleLine);
                return trendList;
              });
            }
          }
        });
      },
      getAgePer(year) {
        let that = this;
        service.service.popAgePer({
          data: {},
          form: year,
          successFunc: data => {
            if (data.code == 200) {
              ageList = [];
              _.map(data.data, (key, value) => {
                let agePie = {
                  name: "",
                  value: ""
                };
                agePie.name = utilsOper.AgeConversion(value);
                agePie.value = key;
                ageList.push(agePie);
                return ageList;
              });
            }
            that.handleQueryAgeChart();
          }
        });
      },
      getRegionPop(year, age) {
        let that = this;
        if (age == undefined) {
          age = ""
        }
        service.service.popRegion({
          data: {},
          form: year,
          ageForm: age,
          successFunc: data => {
            regionList = [];
            if (data.code == 200) {
              _.map(data.data, (key, value) => {
                _.map(key.children, (item, label) => {
                  let regionBar = {
                    name: "",
                    houseCount: "",
                    floatCount: "",
                    gridCode: ""
                  };
                  regionBar.name = label;
                  regionBar.houseCount = item.household;
                  regionBar.floatCount = item.float;
                  regionBar.gridCode = item.gridCode;
                  regionList.push(regionBar);
                });
                return regionList;
              });
            }
            that.handleQueryRegionNum();
          }
        });

      },
      getTypeCompare(year, age, region) {
        let that = this;
        if (age == undefined) {
          age = ""
        }
        if (region == undefined) {
          region = ""
        }
        service.service.popTypeCompare({
          data: {},
          form: year,
          ageForm: age,
          regionType: region,
          successFunc: data => {
            if (data.code == 200) {
              typeCompareList = [];
              _.map(data.data, (key, value) => {
                let typeCompare = {
                  name: "",
                  value: ""
                };
                typeCompare.name = utilsOper.TypeConversion(value);
                typeCompare.value = key;
                typeCompareList.push(typeCompare);
                return typeCompareList;
              });
            }
            that.handleQueryTypeChart();
          }
        });
      },
      //人口增长趋势统计图
      handleQueryPopleGrow() {
        let that = this;
        let data = trendList;
        that.PopleGrowthTrendOptions.xAxis.data = _.map(data, "year");
        that.PopleGrowthTrendOptions.series[0].data = _.map(data, "count");
        that.PopleGrowthTrendChart.setOption(that.PopleGrowthTrendOptions);
        that.PopleGrowthTrendChart.resize();
        this.PopleGrowthTrendChart.on("click", params => {
          if (params.name >= 2017) {
            let name = params.name;
            that.selectType = params.name;
            year = params.name;
            that.getRegionPop(year, "");
            that.getAgePer(year);
            that.getTypeCompare(year, "", "");
          }
        });
      },
      // 人口年龄统计
      handleQueryAgeChart() {
        let that = this,
          pieOptions = _.clone(this.pieOptions);
        that.PopleAgeChart.on("click", params => {
          age = utilsOper.AgeConversion(params.name);
          that.getRegionPop(year, age);
          that.getTypeCompare(year, age, "");
        });
        let data = ageList;
        pieOptions.legend.data = _.map(data, "name");
        pieOptions.series[0].name = "人口年龄占比";
        pieOptions.series[0].data = data;
        this.PopleAgeChart.setOption(pieOptions);
        this.PopleAgeChart.resize();
      },
      //重点人群区域分布统计图
      handleQueryRegionNum() {
        let that = this;
        let data = regionList;
        that.PopleRegionOptions.xAxis[0].data = _.map(data, "name");
        that.PopleRegionOptions.series[0].data = _.map(data, "houseCount");
        that.PopleRegionOptions.series[1].data = _.map(data, "floatCount");
        that.PopleRegionChart.setOption(that.PopleRegionOptions);
        that.PopleRegionChart.resize();
        that.PopleRegionChart.on("click", params => {
          let obj = _.find(data, { 'name': params.name })
          let region = obj.gridCode;
          that.getTypeCompare(year, age, region);
        });
      },
      // 各区域人口类型占比
      handleQueryTypeChart() {
        let that = this,
          pieOptions = _.clone(this.pieOptions);
        let data = typeCompareList;
        pieOptions.legend.data = _.map(data, "name");
        pieOptions.series[0].name = "霸下" + "人口类型占比";
        pieOptions.series[0].data = data;
        this.PopleTypeChart.setOption(pieOptions);
        this.PopleTypeChart.resize();
      }
    }
  };
</script>
<style>
  .key-pople-statis {
    height: 100%;
  }

  .key-pople-statis .col-2-width {
    width: calc(50% - 8px);
  }

  .key-pople-statis .col-3-width {
    width: calc(33% - 5px);
  }
</style>