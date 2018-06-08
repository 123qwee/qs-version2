/**
 * 简单实现的状态管理器，苏大神不让用状态管理机
 * 而且最坑爹的是es6不支持导出静态变量
 */
import {
    Subject
} from 'rxjs/Subject';
export class GlobalState {

    _data = new Subject();
    _dataStream$ = this._data.asObservable();

    _subscriptions = new Map();

    constructor() {
        this._dataStream$.subscribe((data) => this._onEvent(data));
    }

    notifyDataChanged(event, value) {

        let current = this._data[event];
        if (current !== value) {
            this._data[event] = value;

            this._data.next({
                event: event,
                data: this._data[event]
            });
        }
    }

    subscribe(event, callback) {
        let subscribers = this._subscriptions.get(event) || [];
        subscribers.push(callback);

        this._subscriptions.set(event, subscribers);
    }

    _onEvent(data) {
        let subscribers = this._subscriptions.get(data['event']) || [];

        subscribers.forEach((callback) => {
            callback.call(null, data['data']);
        });
    }
}
