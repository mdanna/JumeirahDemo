define(function() {

	return {
		constructor: function(baseConfig, layoutConfig, pspConfig) {
			this.view.preShow = () => {
              if(!this.initDone){
                
                this.initDone = true;
              }
            };
		},
		//Logic for getters/setters of custom properties
		initGettersSetters: function() {

		},
      
      getDate(){
        const fn = globals.formatNumber;
        let dc = this.view.calWidget.dateComponents;
        dc = !dc[0] ? null : dc;
        return dc ? `${fn(dc[0])}/${fn(dc[1])}/${fn(dc[2])}`: '';
      }
	};
});