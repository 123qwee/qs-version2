/**
 * 之前的接口太过难用，所以就写了此接口，为了避免bug的产生
 */
// 引入lodash
import * as _ from 'lodash';
// 引入rxjs
import {
    Observable,
    Subject,
    BehaviorSubject
} from 'rxjs';
export class EventService {

    windowSize$ = new BehaviorSubject(getWindowSize());
    sizeHeight$ = new BehaviorSubject(0);
    sizeWidth$ = new BehaviorSubject(0);

    // 构造函数
    constructor() {
        this.bindListener();
    }

    bindListener() {
        Observable.fromEvent(window, 'resize')
            .map(getWindowSize).debounceTime(100).distinctUntilChanged()
            .subscribe(this.windowSize$);
        this.windowSize$.subscribe(e => {
            this.sizeHeight$.next(e.height);
            this.sizeWidth$.next(e.width);
        });
    }

    dispose() {

    }
}

function getWindowSize() {
    return {
        height: window.innerHeight,
        width: window.innerWidth
    };
};
