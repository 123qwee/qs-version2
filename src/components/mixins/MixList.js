import validateOper from '@/assets/scripts/common/validateOper.js';
import utilsOper from '@/assets/scripts/common/utilsOper.js';

export default {
  data() {
    return {
      /** 分页相关变量 */
      pageNum: 1,
      pageSize: 10,
      tableData: [],
      recordCount: 0,
      tableSelection: [],
      /* 日期快捷选择 */
      shortcutDateOptions: validateOper.shortcutDateOptions
    }
  },
  created() {
    // console.log("这是个混合测试！");
  },
  methods: {
    // 获取分页信息
    getPageInfo() {
      let pageNum, pageSize;

      // 获取已缓存的分页信息
      let pageInfo = lscache.get('pageInfo');

      if (pageInfo != null) {
        this.pageNum = pageInfo.pageNum / pageInfo.pageSize + 1;
        this.pageSize = pageInfo.pageSize;

        // 清空缓存的分页信息
        lscache.set('pageInfo', null);
        return pageInfo;
      } else {
        if (this.$refs['page'] == undefined) {
          pageNum = 0;
          pageSize = 10;
        } else {
          pageNum = (this.$refs['page'].internalCurrentPage - 1) * this.$refs['page'].internalPageSize;
          pageSize = this.$refs['page'].internalPageSize;
        }

        return {
          pageNum,
          pageSize
        }
      }
    },
    // 获取查询条件
    getCondition() {
      // 获取已缓存的查询条件
      let condition = lscache.get('condition');

      if (condition != null) {
        lscache.set('condition', null);
        return condition;
      }
    },
    /** 格式化出库日期 */
    formatDate(value) {
      if (_.compact([value]).length > 0) {
        return utilsOper.formatDate(value, 'YYYY-MM-DD');
      } else {
        return "";
      }
    },
    // 格式化字符串
    commonStrIntercept(str, num) {
      return _.truncate(str, {
        length: num
      });
    },
  },
  computed: {
    // checkAdminAuthority() {
    //   let roles = lscache.get('roles');
    //   // 如果当前用户拥有管理员权限
    //   return _.find(roles, {
    //     name: 'admin'
    //   }) ? true : false;
    // },
    // checkSuperAuthority() {
    //   let roles = lscache.get('roles');
    //   // 如果当前用户拥有超级管理员权限
    //   return _.find(roles, {
    //     name: 'super'
    //   }) ? true : false;
    // },
  }
}
