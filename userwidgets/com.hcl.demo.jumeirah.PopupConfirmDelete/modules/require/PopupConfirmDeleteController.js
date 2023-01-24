define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.preShow = () => {
        if(!this.initDone){
          this.view.buttonCancel.onClickButton = () => {
            this.view.isVisible = false;
          };
          this.view.buttonOk.onClickButton = () => {


            var objSvc = kony.sdk.getCurrentInstance().getObjectService("NOCObjectService", {"access": "online"});
            var dataObject = new kony.sdk.dto.DataObject("NOCObject");
            dataObject.addField("id", this.apn);
            dataObject.addField("primaryKeyField", "id");
            objSvc.deleteRecord({
              "dataObject": dataObject
            }, (response) => {
              this.view.isVisible = false;
              this.onDelete();
            }, (error) => {
              alert(JSON.stringify(error));
            });
          };
          this.initDone = true;
        }
      };

    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {},

    show(apn){
      this.view.lblTitle.text = `Delete ${apn}`;
      this.view.isVisible = true;
      this.apn = apn;
    },

    onDelete(){}


  };
});