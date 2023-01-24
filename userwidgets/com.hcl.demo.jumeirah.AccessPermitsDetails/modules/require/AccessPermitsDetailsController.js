define(function() {
  const fileData = [{value: 'picture.png'},{value: 'passport.pdf'},{value: 'license.pdf'},{value: 'certificate_of_birth.pdf'}];
  const rbFamily = 'serviceType';
  const rbText = 'Access Permits';

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      eventManager.subscribe(globals.EVT_SET_VALUE, ({id, value}) => {
        if(id === this.view.id) {
          this.view.lblFileName.text = value;
          this.view.flxUpload.isVisible = false;
          this.view.flxView.isVisible = true;
          this.view.flxButtons.forceLayout();
        }
      });
      
      eventManager.subscribe(globals.EVT_SELECT_RADIO_BUTTON, ({family, radioButton}) => {
        if(rbFamily === family){
          this.view.isVisible = rbText === radioButton;
          //rbText === radioButton || (this.reset());
        }
      });


      this.view.preShow = () => {
        if(!this.initDone){
          this.view.flxUpload.onClick = () => {
            eventManager.publish(globals.EVT_SELECT_VALUE, {
              selectionListId: this.view.id,
              selection: this.view.lblFileName.text,
              values: fileData
            });
          };
          this.initDone = true;
        }
      };

    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {},

    reset(){
      this.view.lblFileName.text = '';
      this.view.flxUpload.isVisible = true;
      this.view.flxView.isVisible = false;
      this.view.forceLayout();
    }

  };
});