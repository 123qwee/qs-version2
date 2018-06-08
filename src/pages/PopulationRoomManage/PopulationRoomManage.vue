<template>
  <!-- <el-tabs type="border-card" v-model="activeName" class="content" @tab-click="handleTabClick">
    <el-tab-pane label="人口查询" class="list" name="PopulationList">
      <vPopulationList></vPopulationList>
    </el-tab-pane>
    <el-tab-pane label="房屋查询" class="list" name="housesInquiry">
      <vHousesInquiry></vHousesInquiry>
    </el-tab-pane>
    <el-tab-pane label="上报审批" class="list" name="examine">
      <vReportExamine></vReportExamine>
    </el-tab-pane>
    <el-tab-pane label="人口统计" class="list" name="popleStatis">
      <vPopleStatis v-if="popleStatisBool"></vPopleStatis>
    </el-tab-pane>
  </el-tabs> -->
  <div>
    <span>123</span>
  </div>
</template>

<script>
  import vPopulationList from "./populationList.vue";
  import vPopleStatis from './PopulationStatis.vue';
  export default {
    components: {
      vPopulationList,
      vPopleStatis,
    },
    data() {
      return {
        activeName: "PopulationList",
        popleStatisBool: false,
      };
    },

    created() { },

    mounted() { },

    methods: {
      handleTabClick(tab) {
        if (tab.name == "popleStatis") {
          this.popleStatisBool = true;
        } else {
          this.popleStatisBool = false;
        }
      }
    }
  };
</script>