define(function() {
  const SKN_ENABLED = 'sknTxtWhite100';
  const SKN_DISABLED = 'sknTxtGrey100';

	return {
		constructor: function(baseConfig, layoutConfig, pspConfig) {
			this.view.preShow = () => {
              this.view.txtTextBox.skin = this.disabled ? SKN_DISABLED : SKN_ENABLED;
              if(!this.initDone){
                
                this.initDone = true;
              }
            };
		},
		//Logic for getters/setters of custom properties
		initGettersSetters: function() {

		}
	};
});