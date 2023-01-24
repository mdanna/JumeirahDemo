define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.preShow = () => {
        if(!this.initDone){
          this.view.buttonBack.onClickButton = () => {
            this.view.isVisible = false;
            this.targetForm && new voltmx.mvc.Navigation(this.targetForm).navigate();
          };
          this.initDone = true;
        }
      };

    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
      defineGetter(this, 'targetForm', () => {
        return this._targetForm;
      });
      defineSetter(this, 'targetForm', value => {
        this._targetForm = value;
      });
    },
    
    show(alertType, apn){
      switch(alertType){
        case 'submit':
          this.view.lblTitle.text = 'NOC Submitted';
          this.view.lblInfo.text = `You have successfully submitted your NOC request ${apn}.`;
          this.view.buttonBack.text = 'Back to Home';
          this.targetForm = 'frmMain';
          break;
        case 'error':
          this.view.lblTitle.text = 'Error';
          this.view.lblInfo.text = 'All required fields must be specified.';
          this.view.buttonBack.text = 'Back to NOC Form';
          this.targetForm = 'frmNOC';
          break;
        case 'saveError':
          this.view.lblTitle.text = 'Error';
          this.view.lblInfo.text = 'Unable to save data.';
          this.view.buttonBack.text = 'Close';
          this.targetForm = '';
          break;
        default:
          break;  
      }
      this.view.isVisible = true;
    }


  };
});