/**
 * @desc 当前文件存储登录及权限相关方法
 * @author Originaljoy
 */

import menus from '../config/menu_config.js'
import popupOper from '../common/popupOper.js'
import ajaxOper from '../ajax/ajaxOper.js'

/**
 * 获取用户信息，并存储在本地
 */
const getUserInfo = (params) => {
    ajaxOper.ajaxHttp({
        type: 'get',
        url: constants.SERVER_URL + '/permission/user/currentAll',
        successFunc: (data) => {
            const userInfo = data.data;

            if (!userInfo) {
                popupOper.showModalAlert({
                    message: "用户登录已过期，请重新登录!",
                    sureFunc: () => {
                        // 设置用户重新登录
                        userLogout();
                    }
                })

                return;
            }

            if (lscache.get('userId') == null) {
                lscache.set('userId', userInfo.id, constants.SESSION_LIMIT); // 用户编号
                lscache.set('userAccount', userInfo.account, constants.SESSION_LIMIT); // 用户账号
                lscache.set('userName', userInfo.userName, constants.SESSION_LIMIT); // 用户姓名
                lscache.set('roles', userInfo.roleList, constants.SESSION_LIMIT); // 用户角色信息
                lscache.set('depts', userInfo.deptList, constants.SESSION_LIMIT); // 用户部门信息

                // 判断用户是否为系统管理员或部门管理员
                if (_.find(userInfo.roleList, (item) => {
                        return item.type == constants.ROLE_SYS_ADMIN
                    })) {
                    lscache.set('isSysRole', true, constants.SESSION_LIMIT);
                } else if (
                    _.find(userInfo.roleList, (item) => {
                        return item.type == constants.ROLE_DEPT_ADMIN
                    })
                ) {
                    lscache.set('isDeptRole', true, constants.SESSION_LIMIT);
                }
            }

            params.successFunc && params.successFunc(userInfo);
        },
        errorFunc: (data) => {
            // 获取用户信息失败，返回到登录页面
            popupOper.showModalAlert({
                message: "用户登录已过期，请重新登录!",
                sureFunc: () => {
                    // 设置用户重新登录
                    userLogout();
                }
            })
        }
    })
}

/**
 * 获取指定用户权限信息
 * @param userId 用户编号
 * @param successFunc 成功回调函数
 */
const getPermission = (params) => {
    ajaxOper.ajaxHttp({
        type: 'get',
        // url: constants.SERVER_URL + '/permission/permission/listByUserId?type=1&userId=' + params.userId,
        url:constants.SERVER_URL + '/list',
        successFunc: (data) => {
            // 获取一级菜单
            let pmsOne = _.filter(data.data, (item) => {
                return item.parentPerId == constants.SYSTEM_ID;
            })
            // 获取二级菜单
            let pmsTwo = _.filter(data.data, (item) => {
                return _.map(pmsOne, 'id').indexOf(item.parentPerId) >= 0;
            })

            const pmsInfo = _.union(pmsOne, pmsTwo);

            // 存储用户权限
            lscache.set('pmsOne', pmsOne, constants.SESSION_LIMIT);
            lscache.set('pmsTwo', pmsTwo, constants.SESSION_LIMIT);
            lscache.set('permissions', pmsInfo, constants.SESSION_LIMIT);

            params.successFunc && params.successFunc(pmsInfo);
        },
        errorFunc: (data) => {
            // 获取用户信息失败，返回到登录页面
            // 设置用户重新登录
            // userLogout();
        }
    })
}

/**
 * 用户注销
 */
const userLogout = () => {
    // 清楚本地缓存设置
    lscache.flush();
    window.location.href = constants.CAS_LOGOUT_URL + "?service=" + window.location.origin + "/logout";
    // 用户注销
    // ajaxOper.ajaxHttp({
    //   type: "get",
    //   url: constants.CAS_LOGOUT_URL +
    //   "?service=" +
    //   window.location.origin +
    //   "/logout",
    //   successFunc: data => {
    // window.location.href = window.location.origin;
    //       window.location.href =constants.CAS_LOGOUT_URL + "?service=" + window.location.origin + "/logout";

    //     }
    //   });
}

const getDefaultMenu = () => {
    return menus;
}

/**
 * 判断用户本地用户Session是否过期
 * @param {*} params
 */
const isLoginByNative = (params) => {
    let userid = lscache.get('userid');


}

/**
 * 判断当前用户是否登录
 * @param {*} params
 */
const isLoginByRemote = (params) => {

}


export default {
    defaultMenus: menus,
    getDefaultMenu,
    isLoginByNative,
    getUserInfo,
    getPermission,
    userLogout,
}
