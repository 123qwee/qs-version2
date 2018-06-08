import {
    run
} from './src/index';

class mapApi {
    constructor() {}
    init(dom, config) {
        // 开始地图场景初始化
        return run(dom, config);
    }
}

export default new mapApi();
