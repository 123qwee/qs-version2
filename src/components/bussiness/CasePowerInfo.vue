<template>
  <div class="power-info-wrap">
    <div v-if="item.applyType!=1" v-for="(item,index) in powerInfo" :key="index" class="row-border" style="margin-top:10px;">
      <el-row type="flex" justify="space-around">
        <el-col class="column-title" :span="4">申请类型</el-col>
        <el-col :span="8">{{getType(item.applyType)}}</el-col>
        <el-col class="column-title" :span="4">{{getKeyName(item.applyType)}}</el-col>
        <el-col :span="8">{{item.applyKeyCode}}</el-col>
      </el-row>
      <el-row type="flex" justify="space-around">
        <el-col class="column-title" :span="4">申请人</el-col>
        <el-col :span="8">{{item.applyUserName}}</el-col>
        <el-col class="column-title" :span="4">申请时间</el-col>
        <el-col :span="8">{{item.applyTime}}</el-col>
      </el-row>
      <el-row type="flex" justify="space-around">
        <el-col class="column-title" :span="4">申请原因</el-col>
        <el-col :span="20">{{item.applyContent}}</el-col>
      </el-row>
      <el-row v-if="item.approvalTime!=null" type="flex" justify="space-around">
        <el-col class="column-title" :span="4">审批人</el-col>
        <el-col :span="4">{{item.approvalUserName}}</el-col>
        <el-col class="column-title" :span="4">审批时间</el-col>
        <el-col :span="6">{{item.approvalTime}}</el-col>
        <el-col class="column-title" :span="4">是否通过</el-col>
        <el-col :span="2">{{item.isAllow==1?'是':'否'}}</el-col>
      </el-row>  
      <el-row v-if="item.approvalTime!=null" type="flex" justify="space-around">
        <el-col class="column-title" :span="4">审批意见</el-col>
        <el-col :span="20">{{item.approvalContent}}</el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    powerInfo: {
      type: Array,
      default: []
    }
  },
  methods: {
    // 获取申请类型
    getType(type) {
      if (type == 2) {
        return "延期申请";
      } else if (type == 3) {
        return "转办申请";
      } else if (type == 4) {
        return "挂账申请";
      } else if (type == 6) {
        return "作废申请";
      }
    },
    // 根据申请类型获取存储key值类型
    getKeyName(type) {
      if (type == 2) {
        return "延期时间";
      } else if (type == 3) {
        return "转办人";
      }
    }
  }
};
</script>

<style>
.power-info-wrap {
  width: 100%;
  height: 100%;
}
</style>