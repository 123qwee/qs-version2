/**
 * @desc 当前文件存储附件相关方法
 * @author Originaljoy
 */

import ajaxOper from './ajaxOper.js';
import popupOper from '../common/popupOper.js';

/**
 * 删除指定文件
 * @param {*} ids 文件编号
 * @param successFunc 删除成功回调函数 
 */
const fileDeleteOne = (params) => {
  ajaxOper.ajaxHttp({
    type: 'post',
    url: constants.DELETE_FILE_URL + "?ids=" + params.ids,
    successFunc: (data) => {
      if (data.code == 200) {
        // 提示删除成功
        popupOper.showSuccessNoti({
          message: "删除成功!"
        });

        params.successFunc && params.successFunc(data);
      }
    }
  })
}

/**
 * 获取文件访问路径
 * @param {*} id 文件编号
 */
const fileReadOne = (id) => {
  return constants.READ_FILE_URL + "/" + id;
}

export default {
  fileDeleteOne,
  fileReadOne
}