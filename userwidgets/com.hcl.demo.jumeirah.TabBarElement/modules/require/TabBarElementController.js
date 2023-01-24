define(function() {
  const SKN_LBL_SELECTED = 'sknLblRegularOrange100';
  const SKN_FLX_SELECTED = 'sknFlxOrangeNoBorder';
  const SKN_LBL_UNSELECTED = 'sknLblRegularWhite100';
  const SKN_FLX_UNSELECTED = 'sknFlxWhiteNoBorder';

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      eventManager.subscribe(globals.EVT_SELECT_TAB, (tabBarElement) => {
        this.view.lblTabBarElement.skin = this.view.lblTabBarElement.text === tabBarElement ? SKN_LBL_SELECTED : SKN_LBL_UNSELECTED;
        this.view.flxBar.skin = this.view.lblTabBarElement.text === tabBarElement ? SKN_FLX_SELECTED : SKN_FLX_UNSELECTED;
      });

      this.view.preShow = () => {
        if(!this.initDone){
          this.selected && eventManager.publish(globals.EVT_SELECT_TAB, this.view.lblTabBarElement.text);
          this.view.onClick = () => this.selected = true;
          this.initDone = true;
        }
      };

    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
      defineGetter(this, 'selected', () => {
        return this._selected;
      });
      defineSetter(this, 'selected', value => {
        this._selected = value;
        if(this.initDone && value){
          eventManager.publish(globals.EVT_SELECT_TAB, this.view.lblTabBarElement.text);
        }
      });
    }
  };
});