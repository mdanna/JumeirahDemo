define(function() {
  const SKN_LIGHT = 'sknFlxLightGreyBorderRounded';
  const SKN_DARK = 'sknFlxDarkGreyBorderRounded';

	return {
		constructor: function(baseConfig, layoutConfig, pspConfig) {
			this.view.preShow = () => {
              if(!this.initDone){
                this.view.txtTextBox.onTextChange = () => {
                  this.view.flxTextBox.skin = this.view.txtTextBox.text ? 
                    SKN_DARK : SKN_LIGHT;
                };
                this.initDone = true;
              }
            };
		},
		//Logic for getters/setters of custom properties
		initGettersSetters: function() {

		}
	};
});