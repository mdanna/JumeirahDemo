define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.preShow = () => {
        if(!this.initDone){
          this.initDone = true;
        }
        this.setStatus();
      };

    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
            defineGetter(this, 'status', () => {
                return this._status;
            });
            defineSetter(this, 'status', value => {
                this._status = value;
                if (this.initDone) {
                    this.setStatus();
                }
            });
            /*defineGetter(this, 'apn', () => {
                return this._apn;
            });*/
            /*defineSetter(this, 'apn', value => {
                this._apn = value;
            });*/
        },

    setStatus(){
      this.view.flxApproved.isVisible = this.status === 'Approved';
      this.view.flxPending.isVisible = this.status === 'Pending';
      this.view.flxRejected.isVisible = this.status === 'Rejected';
    },
    
    onClickElement(){},

    onCickDelete(){}

  };
});