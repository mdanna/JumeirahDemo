define(function() {
  const VALUE_UNSELECTED = 'y';
  const VALUE_SELECTED = 'z';

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      eventManager.subscribe(globals.EVT_SELECT_RADIO_BUTTON, ({family, radioButton}) => {
        if(this.family === family){
          this.view.lblSelection.text = this.view.lblRadioButton.text === radioButton ? VALUE_SELECTED : VALUE_UNSELECTED;
        }
      });

      this.view.preShow = () => {
        if(!this.initDone){
          this.selected && eventManager.publish(globals.EVT_SELECT_RADIO_BUTTON, {
            family: this.family,
            radioButton: this.label
          });
          this.view.onClick = () => this.selected = true;
          this.initDone = true;
        }
      };

    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
      defineGetter(this, 'family', () => {
        return this._family;
      });
      defineSetter(this, 'family', value => {
        this._family = value;
      });
      defineGetter(this, 'selected', () => {
        return this._selected;
      });
      defineSetter(this, 'selected', value => {
        this._selected = value;
        if(this.initDone && value){
          eventManager.publish(globals.EVT_SELECT_RADIO_BUTTON, {
            family: this.family,
            radioButton: this.label
          });
        }
      });
    }
  };
});