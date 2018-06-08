/**
 * 原始的emit太烂了，接受不到之前发送的值，所有实现此方法
 */
import {
    Observable,
    // 异步监听器
    Subject,
    // 同步监听器
    BehaviorSubject
} from "rxjs";
export class VistualEmit {
    // 每个监听器指定唯一的名称，为了记录所有已知的对象
    // getGridInfo  监听查询网格信息
    // changeByType 监听查询类型统计
    // change 监听关键字查询统计
    // popup 监听要弹出气泡的事件
    // 用来接受autocompete的事件
    static changeObservable = new BehaviorSubject();
    static changeMapInitObservable = new BehaviorSubject();
    static changeTypeObservable = new Subject();
    static changeEmptyObservable = new Subject();
    static changePopupObservable = new Subject();
    static emit(type, value) {
        if (type === 'change') {
            VistualEmit.changeObservable.next(value);
        } else if (type === 'changeType') {
            VistualEmit.changeTypeObservable.next(value);
        } else if (type === 'empty') {
            VistualEmit.changeEmptyObservable.next(value);
        } else if (type === 'mapinit') {
            VistualEmit.changeMapInitObservable.next(value);
        } else if (type === 'popup') {
            VistualEmit.changePopupObservable.next(value);
        }
    }
    static getObservable(type) {
        if (type === 'change') {
            return VistualEmit.changeObservable;
        } else if (type === 'changeType') {
            return VistualEmit.changeTypeObservable;
        } else if (type === 'empty') {
            return VistualEmit.changeEmptyObservable;
        } else if (type === 'mapinit') {
            return VistualEmit.changeMapInitObservable;
        } else if (type === 'popup') {
            return VistualEmit.changePopupObservable;
        }
    }


}
