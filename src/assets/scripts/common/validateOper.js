/**
 * @desc 当前文件存储表单验证相关方法
 * @author Originaljoy
 */


/**
 * 必填验证规则
 * @param {string} message
 * @param {string} type
 * @param {string} trigger
 */
const valiRequired = (message, trigger, type) => {
    return {
        required: true,
        message: message,
        trigger: trigger ? trigger : 'blur',
        type: type ? type : 'string'
    }
}

/**
 * 字符串最大长度验证规则
 * @param {double} max 最大长度
 */
const valiMaxLength = (max, trigger) => {
    return {
        max: max,
        validator: vLength,
        trigger: trigger ? trigger : 'blur'
    }
}

/**
 * 字符串长度验证 Validator
 * 说明：由于Js原生字符串长度判断将中文也当一个字符处理，
 *      而数据库中一个中文字符占三个字节；
 *      因此这里需要重新长度验证器。
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
const vLength = (rule, value, callback) => {
    if (value == undefined) {
        callback();
        return;
    }
    if (rule.max && !rule.min) {
        if (uLength(value) > rule.max) {
            callback(new Error('长度不能大于' + rule.max + ' 位字符!'));
        } else {
            callback();
        }
    } else if (!rule.max && rule.min) {
        if (uLength(value) < rule.min) {
            callback(new Error('长度不能小于' + rule.min + ' 位字符!'));
        } else {
            callback();
        }
    } else if (rule.max && rule.min) {
        if (uLength(value) < rule.min && uLength(value) > rule.max) {
            callback(new Error('长度应为' + rule.min + '到' + rule.max + ' 位字符!'));
        } else {
            callback();
        }
    }
}

/**
 * 最近日期验证规则
 * @param {*} value 
 * @param {*} trigger 
 */
const valiLastDate = (value, trigger) => {
    return {
        validator: vLastDate,
        trigger: trigger ? trigger : 'blur'
    }
}

/**
 * 最近选择时间验证 Validator
 * 说明：判断选择时间不能大于当前日期时间
 * @param {*} rule 
 * @param {*} value 
 * @param {*} callback 
 */
const vLastDate = (rule, value, callback) => {
    if (value > Date.now()) {
        callback(new Error('不能选择当前日期之后！'));
    } else {
        callback();
    }
};

/**
 * 正则验证身份证号
 * @param {*} trigger 
 */
const valiRegular = (message, trigger) => {
    return {
        validator: vRegular,
        trigger: trigger ? trigger : 'blur'
    }
}

/**
 * 正则验证
 */
const vRegular = (rule, value, callback) => {
    if (!value) {
        callback();
        return;
    }

    // const reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    if (!constants.REG_CARD_NUMBER.test(value)) {
        return callback(new Error('身份证号输入不正确！'));
    } else {
        callback();
    }
};

/**
 * 移动电话号码验证规则
 * @param {*} trigger 
 */
const valiTellPhone = (trigger) => {
    return {
        validator: vTellPhone,
        trigger: trigger ? trigger : 'blur'
    }
}

/**
 * 移动电话及固定电话号码验证 Validator
 * @param {*} rule 
 * @param {*} value 
 * @param {*} callback 
 */
const vTellPhone = (rule, value, callback) => {
    if (!value) {
        callback();
        return;
    }
    const reg = /(^((0\d{2,3}-\d{7,8})|(1[35874]\d{9}))$)/;
    if (!reg.test(value)) {
        return callback(new Error('电话号码输入不正确！'));
    } else {
        callback();
    }
};

/**
 *只能输入字母或数字 
 */
const valiNumLetterReg = (trigger) => {
    return {
        validator: vNumLetterReg,
        trigger: trigger ? trigger : 'blur'
    }
}
const vNumLetterReg = (rule, value, callback) => {
    if (!value) {
        callback();
        return;
    }
    const reg = /^([A-Za-z0-9])+$/;
    if (!reg.test(value)) {
        return callback(new Error('代码输入不正确！'));
    } else {
        callback();
    }
}

/**
 * 判断输入的是否是整数
 */
const valiNumber = (trigger) => {
    return {
        validator: vNumber,
        trigger: trigger ? trigger : 'blur'
    }
}
const vNumber = (rule, value, callback) => {
    if (!value) {
        callback();
        return;
    }
    const reg = /^[0-9]+$/;
    if (!reg.test(value)) {
        return callback(new Error('请输入数字！'))
    } else {
        callback();
    }
}
/**
 * 中文字符串长度计算
 * @param {any} text
 */
const uLength = (text) => {
    var len = 0;
    for (var i = 0; i < text.length; i++) {
        var code = text.charCodeAt(i);
        //单字节加1
        if ((code >= 0x0001 && code <= 0x007e) || (0xff60 <= code && code <= 0xff9f)) {
            len++;
        } else {
            len += 2;
        }
    }
    return len;
}

// 日期选择控件快捷按钮设置
const shortcutDateOptions = {
    shortcuts: [{
        text: '今天',
        onClick(picker) {
            const end = new Date();
            const start = new Date();
            // start.setTime(start.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', [start, end]);
        }
    }, {
        text: '最近一周',
        onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
        }
    }, {
        text: '最近一个月',
        onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
        }
    }, {
        text: '最近三个月',
        onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
        }
    }]
};


// 户号验证（必填 九位）
const valiDomNumReg = (trigger) => {
    return {
        validator: vDomNumReg,
        trigger: trigger ? trigger : 'blur'
    }
}

/**
 * 正则验证
 */
const vDomNumReg = (rule, value, callback) => {
    if (!value) {
        callback();
        return;
    }

    const reg = /^([A-Za-z0-9]){9}$/;
    if (!reg.test(value)) {
        return callback(new Error('户号输入不正确！'));
    } else {
        callback();
    }
};

/**
 * 流动人口-证件号码22位验证
 */
const valiIdNumberReg = (trigger) => {
    return {
        validator: vIdNumberReg,
        trigger: trigger ? trigger : 'blur'
    }
}
/**
 * 正则验证
 */
const vIdNumberReg = (rule, value, callback) => {
    if (!value) {
        callback();
        return;
    }

    const reg = /^([A-Za-z0-9]){0,22}$/;
    if (!reg.test(value)) {
        return callback(new Error('证件号码输入不正确！'));
    } else {
        callback();
    }
};

/**
 * 社区矫正人员编号-16位数字
 */
const valiIdRedressIdReg = (trigger) => {
    return {
        validator: vRedressIdReg,
        trigger: trigger ? trigger : 'blur'
    }
}
/**
 * 正则验证
 */
const vRedressIdReg = (rule, value, callback) => {
    if (!value) {
        callback();
        return;
    }

    const reg = /^([0-9]){16}$/;
    if (!reg.test(value)) {
        return callback(new Error('矫正人员编号输入不正确！'));
    } else {
        callback();
    }
};
// ip验证
const valiIP = (trigger) => {
    return {
        validator: vRedressIP,
        trigger: trigger ? trigger : 'blur'
    }
}
/**
 * 正则验证
 */
const vRedressIP = (rule, value, callback) => {
    if (!value) {
        callback();
        return;
    }

    const reg = /^(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)$/;
    if (!reg.test(value)) {
        return callback(new Error('IP地址输入不正确！'));
    } else {
        callback();
    }
};
// 经度
const valilon = (trigger) => {
    return {
        validator: vRedressLON,
        trigger: trigger ? trigger : 'blur'
    }
}
/**
 * 正则验证
 */
const vRedressLON = (rule, value, callback) => {
    if (!value) {
        callback();
        return;
    }

    const reg = /^-?((0|1?[0-7]?[0-9]?)(([.][0-9]{1,15})?)|180(([.][0]{1,15})?))$/;
    if (!reg.test(value)) {
        return callback(new Error('经度输入不正确！'));
    } else {
        callback();
    }
};

// 纬度
const valilat = (trigger) => {
    return {
        validator: vRedressLAT,
        trigger: trigger ? trigger : 'blur'
    }
}
/**
 * 正则验证
 */
const vRedressLAT = (rule, value, callback) => {
    if (!value) {
        callback();
        return;
    }

    const reg = /^-?((0|[1-8]?[0-9]?)(([.][0-9]{1,15})?)|90(([.][0]{1,15})?))$/;
    if (!reg.test(value)) {
        return callback(new Error('纬度输入不正确！'));
    } else {
        callback();
    }
};

// 端口号
const valiPort = (trigger) => {
    return {
        validator: vRedressPort,
        trigger: trigger ? trigger : 'blur'
    }
}
/**
 * 正则验证
 */
const vRedressPort = (rule, value, callback) => {
    if (!value) {
        callback();
        return;
    }

    const reg = /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/;
    if (!reg.test(value)) {
        return callback(new Error('端口输入不正确'));
    } else {
        callback();
    }
};
const valiUserNameReg = (trigger) => {
    return {
        validator: vRegUserName,
        trigger: trigger ? trigger : 'blur'
    }
}
/**
 * 正则验证
 */
const vRegUserName = (rule, value, callback) => {
    if (!value) {
        callback();
        return;
    }
    const reg = /^([A-Za-z0-9])+$/;
    if (!reg.test(value)) {
        return callback(new Error('用户名输入不正确！'));
    } else {
        callback();
    }
}
export default {
    valiRequired,
    valiMaxLength,
    valiTellPhone,
    valiLastDate,
    shortcutDateOptions,
    valiRegular,
    valiNumber,
    valiDomNumReg,
    valiIdNumberReg,
    valiNumLetterReg,
    valiIdRedressIdReg,
    valiIP,
    valilon,
    valilat,
    valiPort,
    valiUserNameReg,
}
