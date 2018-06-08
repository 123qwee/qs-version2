<template>
  <div v-if="visible" class="map-unitinfo-wrap" :style="{width:'450px'}">
    <div class="wrap-close">
      <el-button v-for="(item,index) in WG" :key="index" class="btn-common btn-wg" :class="active==item?'btn-ok':'btn-cancel'" @click="active=item" >{{item}}</el-button>
      <i class="el-icon-close" @click="handleClose"></i>
    </div>
    <div class="row-border">
      <el-row type="flex" justify="space-around">
        <el-col class="column-title" :span="5">网格编号</el-col>
        <el-col :span="19">412312</el-col>
      </el-row>
      <el-row type="flex" justify="space-around">
        <el-col class="column-title" :span="5">网格范围</el-col>
        <el-col :span="19">xxxxxxxxxx</el-col>
      </el-row>
      <el-row type="flex" justify="space-around">
        <el-col class="column-title" :span="5">一级网格长</el-col>
        <el-col :span="4">张三</el-col>
        <el-col class="column-title" :span="8">一级网格区域</el-col>
        <el-col :span="7">13411111111</el-col>
      </el-row>
      <el-row type="flex" justify="space-around">
        <el-col class="column-title" :span="5">二级网格长</el-col>
        <el-col :span="4">李四</el-col>
        <el-col class="column-title" :span="8">二级网格长电话</el-col>
        <el-col :span="7">13422222222</el-col>
      </el-row>
      <el-row type="flex" justify="space-around">
        <el-col class="column-title" :span="5">三级网格长</el-col>
        <el-col :span="4">王麻子</el-col>
        <el-col class="column-title" :span="8">三级网格长电话</el-col>
        <el-col :span="7">13433333333</el-col>
      </el-row>
      <el-row type="flex" justify="space-around">
        <el-col class="column-title" :span="5">网格员</el-col>
        <el-col :span="4">老王</el-col>
        <el-col class="column-title" :span="8">网格员电话</el-col>
        <el-col :span="7">13444444444</el-col>
      </el-row>
      <el-row type="flex" justify="space-around">
        <el-col class="column-title" :span="5">备注</el-col>
        <el-col :span="19">xxxxxxxxxxxxxx</el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 信息框可见性
    visible: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: "450"
    }
  },
  data() {
    return {
      // 当前激活网格编号
      active: "10",
      WG:["10","28"],
    };
  },
  computed: {},
  methods: {
    // 信息框关闭事件
    handleClose() {
      this.visible = false;
    },
  },
  watch: {}
};
</script>

<style>
.map-unitinfo-wrap {
  position: absolute;
  max-width: 450px;
  bottom: 10px;
  margin-left: 5px;

  background-color: #ffffff;
  padding: 20px 5px 5px 5px;
  bottom: 262px;
  right: 0;
}

.map-unitinfo-wrap .row-border .el-row {
  line-height: 2em;
  font-size: 12px;
}

.map-unitinfo-wrap .row-border .column-title {
  padding-left: 1px;
  padding-right: 1px;
}

.wrap-close {
  font-size: 8px !important;
  margin-top: -16px;
  text-align: right;

  cursor: pointer;
}

.btn-wg {
  float: left;
  padding: 2px 20px;
  margin-right: 10px;
}
</style>