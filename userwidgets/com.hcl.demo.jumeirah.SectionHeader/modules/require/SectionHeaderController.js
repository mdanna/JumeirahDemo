define(function() {

	return {
		constructor: function(baseConfig, layoutConfig, pspConfig) {
			this.view.preShow = () => {
              if(!this.initDone){
                this.view.flxOpen.onClick = () => {
                  this.view.flxOpen.isVisible = false;
                  this.view.flxClose.isVisible = true;
                  this.onChange(true);
                };
                this.view.flxClose.onTouchEnd = () => {
                  this.view.flxClose.isVisible = false;
                  this.view.flxOpen.isVisible = true;
                  this.onChange(false);
                };
                this.initDone = true;
              }
            };
		},
		//Logic for getters/setters of custom properties
		initGettersSetters: function() {

		},
      
      onChange(){}
	};
});