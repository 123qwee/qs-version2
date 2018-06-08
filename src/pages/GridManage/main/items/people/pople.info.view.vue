<template>
    <div>
        <el-dialog title="人口信息" class="dialogPopleView" :visible.sync="dialogVisible" width="80%" top="10vh" append-to-body>
            <div style="height:660px;">
                <happy-scroll color="rgba(51,51,51,0.2)" v-if="dialogVisible" hide-horizontal resize size="8">
                    <div style="padding-right:20px;">
                        <!-- <vPopleBasicView ref="vPopleBasicView" :popleView="popleView" v-if="isEmpty"></vPopleBasicView>
                        <vPopleHouseOwner ref="vPopleHouseOwner" :ownerView="ownerView" v-if="hasOwner"></vPopleHouseOwner> -->
                        <div class="mainbar-title" style="margin-top: 12px;">
                            <span>家庭成员关系</span>
                        </div>
                        <el-table :data="tableData" height="240" border style="width: 100%">
                            <el-table-column prop="name" label="姓名" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="sex" label="性别" width="80">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.sex == '1' || scope.row.sex == '男性'">男</span>
                                    <span v-else>女</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="cardNumber" label="证件号码" width="170"></el-table-column>
                            <el-table-column prop="maritalStatus" label="婚姻状况">
                                <template slot-scope="scope">
                                    <span>{{handleCodeTransf("maritalStatus",scope.row.maritalStatus)}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="contact" label="联系方式"></el-table-column>
                            <el-table-column prop="nowlive" label="现居住地" width="180">
                                <template slot-scope="scope">
                                    <span>{{handleCodeTransf("regionDataUnorganized",scope.row.nowlive)}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="与户主关系">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.type == '1'">{{handleCodeTransf("householdrelationship",scope.row.alias5)}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="属性">
                                <template slot-scope="scope">
                                    <img v-if="scope.row.appearance == '01' || scope.row.appearance ==  '中共党员'" style="padding-right: 15px;" :src="party" />
                                    <img v-if="scope.row.gridCode != '000000000000000'" :src="keyPople" />
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" width="80">
                                <template slot-scope="scope">
                                    <el-button type="success" size="small" @click="handleView(scope.$index, scope.row)">查看</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </happy-scroll>              
            </div>
        </el-dialog>
    </div>
</template>

<script>
// import vPopleBasicView from "../../../../../components/pople/popleBasic.vue";
// import vPopleHouseOwner from "../../../../../components/pople/housesBasic.vue"
// import service from "../../../../people_room_manage/people_room_service.js";
import { HappyScroll } from "vue-happy-scroll";
export default {
  components: {
    // vPopleBasicView,
    // vPopleHouseOwner,
    HappyScroll
  },
  data() {
    return {
      dialogVisible: false, // 外侧dialog
      tableData: [],
      party: require("../../../../../assets/images/pople/party.png"),
      keyPople: require("../../../../../assets/images/pople/keyPople.png"),
      popleView: {},
      houseOwner:[],
      ownerView:[],
      isEmpty:Boolean,
      hasOwner:Boolean
    };
  },

  created() {},
  methods: {
    // 查看人员详情
    handleView(index, row) {
      this.popleView = row;
    },
    // 编码与文字转换
    handleCodeTransf(type, code) {
      return utilsOper.codeTransf(type, code);
    },
    handleQueryList(gridCode) {
         service.service.getOwnerInfo({
              roomCode:gridCode,
               successFunc: data => {
                   this.houseOwner=data.data
                   if(this.houseOwner.length>0){
                       this.hasOwner=true;
                       this.ownerView=this.houseOwner
                   }else{
                       this.hasOwner=false
                   }
               }
          })
      service.commonAjax.queryList({
        data: {
          page: 1,
          pageSize: 100,
          gridCode: gridCode ? gridCode : undefined
        },
        URL: "/manage/view/population/findPage",
        successFunc: data => {
            let that=this;
          if (data.code == 200 && data.data.list) {
            this.isEmpty=true
            this.tableData = data.data.list;
        service.service.getRoomInfo({
          cardNumber: that.tableData[0].cardNumber,
          successFunc: data => {
            if(data.code==200){
                that.popleView = that.tableData[0];
                that.popleView.hasHouses=data.data;
                that.dialogVisible = true;
            }
            }
          });
          } else if(this.houseOwner.length>0){
            this.tableData=[];
              that.dialogVisible = true;
              this.ownerView=that.houseOwner
              this.isEmpty=false
          }else{
            this.$popup.showNotification({ message: "此房屋暂无数据!" });
          }
        }
      });
    }
  }
};
</script>
<style>

</style>
