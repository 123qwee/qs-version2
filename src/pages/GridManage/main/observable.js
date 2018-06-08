import {
    VistualEmit
} from './vistual.emit';
// 导入service服务
import {
    PeopleService
} from './services/index';
import * as _ from 'lodash';
/**
 * 绑定当前组件所有的跨组件参数传递
 */
export class Observable_ {
    constructor(self) {
        this.self = self;
        this.listener()
    }

    listener() {
        let self = this;
        // 类型统计
        this.Observable1 = VistualEmit.getObservable(
            "changeType"
        ).subscribe(event => {
            PeopleService.getGridCountByType(event.type, (data) => {
                let result = _.map(data.data, (value, index) => {
                    value.select = false;
                    value.collapse = true;
                    _.map(value.children, (value1) => {
                        value1.select = false;
                    });
                    return value;
                });
                self.self.$refs["$vistualComponent"].queryResult = data.data;
            });
        });
    }
}
