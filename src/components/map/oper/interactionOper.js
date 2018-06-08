import olSelect from 'ol/interaction/Select';
import olCondition from 'ol/events/condition';

class interactionOper {
  constructor(map) {
    this.map = map;

    this.selectAction = null;
  }

  /**
   * 添加选择要素交互
   * @param {*} params 
   */
  addSelectAction(params) {
    this.removeSelectAction();

    this.selectAction = new olSelect({
      layers: params.layers,
      // condition: olCondition.pointerMove
    });

    this.map.addInteraction(this.selectAction);

    this.selectAction.on('select', (event) => {
      params.selectFunc && params.selectFunc(event);
    }, this);

    return this.selectAction;
  }

  // 移除选择要素交互
  removeSelectAction() {
    if (this.selectAction != null) {
      this.map.removeInteraction(this.selectAction);
    }
  }
}

export default interactionOper