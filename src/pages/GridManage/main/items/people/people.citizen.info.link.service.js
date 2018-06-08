import {
    PeopleService
} from "../../services/people.service";
/**
 * 2018-04-11
 * 这里根据业务模型去判定要请求的服务
 * 民房数据不同于楼房，民房数据存在片区编码和民房编码
 * 这里如果没有传入id默认查询片区，如果传入id，需要查询民房
 * @param {*} type 类型（人房、学校..）
 * @param {*} code 网格片区编码
 * @param {*} id id编号
 * @return {*} 两种查询结果返回是一致的
 */
export function linkHouseService(type, code, id, callback) {
    /**
     * 规则：id后六位为民房编码
     * 其中：头两位区分民房庭院房和民房单元房
     *      后四位为民房编码
     */
    if (id !== "") {
        /**
         * 当需要查询民房时，调用此接口，可以查询到该片区的信息和传入的民房信息
         */
        // 民房全六位编码
        let house_code = id.substring(id.length, id.length - 6);
        // 民房类型
        let house_type = "庭院房";
        if (house_code.split("")[0] + house_code.split("")[1] !== "00") {
            house_type = "单元房";
        }
        PeopleService.getHouseLayers(
            type, //查询类型
            code, //片区编码
            house_code.substr(2, 4), //民房编码
            house_type, //  民房类型
            data => {
                callback(data);
            }
        );
    } else {
        /**
         * 当只是查询片区，调用此接口，默认查询第一条民房记录
         */
        PeopleService.getHouseById(type, code, data => {
            callback(data);
        });
    }
}

/**
 * 获得房屋类型
 * @param {*} type 类型（人房,学校..）
 * @param {*} id 编码
 */
export function getHousetype(type, id) {
    if (type === '人房') {
        /**
         * 规则：id后六位为民房编码
         * 其中：头两位区分民房庭院房和民房单元房
         *      后四位为民房编码
         */
        if (id !== "") {
            /**
             * 当需要查询民房时，调用此接口，可以查询到该片区的信息和传入的民房信息
             */
            // 民房全六位编码
            let house_code = id.substring(id.length, id.length - 6);
            // 民房类型
            let house_type = 0;
            if (house_code.split("")[0] + house_code.split("")[1] !== "00") {
                house_type = 1;
            }
            return house_type;
        }
        return 0;
    }
    return 0;
}
