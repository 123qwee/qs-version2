/**
 * 流程活动类
 */
class Acitivity {
  // 构造函数
  constructor(activityJson) {
    if (activityJson != undefined) {
      this.setId(activityJson.activityId);

      this.properties = {};
      for (let propertyName in activityJson.properties) {
        this.setProperty(propertyName, activityJson.properties[propertyName]);
      }

      this.setX(activityJson.x);
      this.setY(activityJson.y);
      this.setWidth(activityJson.width);
      this.setHeight(activityJson.height);
    }
  }
}

Acitivity.prototype = {
  // 活动编号
  id: null,
  // 活动属性信息
  properties: {},
  // 绘图信息
  x: -1, // X坐标
  y: -1, // Y坐标
  width: -1, // 宽度
  height: -1, // 高度

  // Get和Set访问器
  setId: function (id) {
    this.id = id;
  },

  getId: function () {
    return this.id;
  },

  setProperty: function (name, value) {
    this.properties[name] = value;
  },
  getProperty: function (name) {
    return this.properties[name];
  },


  getX: function () {
    return this.x;
  },
  setX: function (x) {
    this.x = x;
  },

  getY: function () {
    return this.y;
  },
  setY: function (y) {
    this.y = y;
  },

  getWidth: function () {
    return this.width;
  },
  setWidth: function (width) {
    this.width = width;
  },

  getHeight: function () {
    return this.height;
  },
  setHeight: function (height) {
    this.height = height;
  },
}

export default Acitivity;