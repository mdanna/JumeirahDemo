define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      eventManager.subscribe(globals.EVT_SET_VALUE, ({id, value}) => {
        if(id === this.selectionListId) {
          this.view.isVisible = false;
        }
      });
      eventManager.subscribe(globals.EVT_SELECT_VALUE, ({selectionListId, selection, values}) => {
        this.selection = selection;
        this.values = values;
        this.selectionListId = selectionListId;
        this.show();
      });

      this.view.preShow = () => {
        if(!this.initDone){
          this.view.lblClose.onTouchEnd = () => this.view.isVisible = false;
          this.initDone = true;
        }
      };
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
      defineGetter(this, 'selection', () => {
        return this._selection;
      });
      defineSetter(this, 'selection', value => {
        this._selection = value;
      });
      defineGetter(this, 'values', () => {
        return this._values;
      });
      defineSetter(this, 'values', value => {
        this._values = value;
      });
      defineGetter(this, 'selectionListId', () => {
        return this._selectionListId;
      });
      defineSetter(this, 'selectionListId', value => {
        this._selectionListId = value;
      });
    },

    show(){
      this.view.flxList.removeAll();
      this.values.forEach((v) => {
        const item = new voltmx.ui.Label({
          id: `item${new Date().valueOf()}`,
          height: '50dp',
          left: '3%',
          width: '97%',
        }, {}, {});
        item.text = v.value;
        item.skin = this.selection === v.value ? 'sknLblRegularOrange110' : 'sknLblRegularWhite110';
        item.onTouchEnd = () => {
            eventManager.publish(globals.EVT_SET_VALUE, {
              id: this.selectionListId, 
              value: v.value
            });
        };
        this.view.flxList.add(item);
      });
      this.view.isVisible = true;
      this.view.flxList.forceLayout();
    }
  };
});