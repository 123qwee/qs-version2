function config() {
    // 版本号
    const version = '0.1.2';
    // 默认显示二维
    const DEFAULT_RENDER = SCENE;
    // 是否显示三维太阳
    const ENABLE_LIGTHING = true;
    let getVersion = () => {
        return this.version;
    }
};

export let Config = new config();

export const MAP = Symbol('MAP');
export const SCENE = Symbol('SCENE');
