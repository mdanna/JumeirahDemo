define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      eventManager.subscribe(globals.EVT_SET_VALUE, ({id, value}) => {
        if(id === this.view.id) {
          this.view.lblText.text = value;
        }
      });
      
      this.view.preShow = () => {
        if(!this.initDone){
          this.view.flxDropdown.onClick = () => {
            eventManager.publish(globals.EVT_SELECT_VALUE, {
              selectionListId: this.view.id,
              selection: this.view.lblText.text,
              values: this.options.data
            });
          };
          this.initDone = true;
        }
      };
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
      defineGetter(this, 'options', () => {
        return this._options;
      });
      defineSetter(this, 'options', value => {
        this._options = value;
      });
    }

  };
});