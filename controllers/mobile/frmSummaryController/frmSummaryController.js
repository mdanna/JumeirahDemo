define({ 

  onViewCreated(){
    this.view.init = () => {
      this.view.buttonPrevious.onClickButton = () => new voltmx.mvc.Navigation('frmNOC').navigate();
      
      this.view.buttonSubmit.onClickButton = () => {
        const args = this.navigationContext;
        if(args.serviceType && args.plotNo && args.project && args.phase &&
           args.district && args.stage && args.contractor && args.contactPerson &&
           args.email && args.licenseNo && args.licenseExpiration){

          //voltmx.application.showLoadingScreen(null, null, constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true,{});
          const objSvc = VMXFoundry.getObjectService("NOCObjectService", {access: "online"});
          const dataObject = new kony.sdk.dto.DataObject("NOCObject");
          const apn = globals.getApn();
          dataObject.addField("id", apn);
          dataObject.addField("serviceType", args.serviceType);
          dataObject.addField("plotNo", args.plotNo);
          dataObject.addField("project", args.project);
          dataObject.addField("phase", args.phase);
          dataObject.addField("stage", args.stage);
          dataObject.addField("contractor", args.contractor);
          dataObject.addField("contactPerson", args.contactPerson);
          dataObject.addField("email", args.email);
          dataObject.addField("licenseNo", args.licenseNo);
          dataObject.addField("licenseExpiration", args.licenseExpiration);
          dataObject.addField("district", args.district);
          dataObject.addField("status", "Pending");
          objSvc.create({
            "dataObject": dataObject
          }, (response) => {
            this.view.cmpPopupAlert.show('submit', apn);
            this.view.forceLayout();
            //voltmx.application.dismissLoadingScreen();
          }, (error) => {
            this.view.cmpPopupAlert.show('saveError');
            this.view.forceLayout();
            //voltmx.application.dismissLoadingScreen();
          });
        } else {
          this.view.cmpPopupAlert.show('error');
        }
      };
      
      this.view.buttonHome.onClickButton = () => new voltmx.mvc.Navigation('frmMain').navigate();
    };
  },

  onNavigate(args){
    this.view.flxButtons.isVisible = !args.apn;
    this.view.flxButtonHome.isVisible = !!args.apn;
    this.view.fieldApn.isVisible = !!args.apn;
    
    this.view.fieldApn.text = args.apn || '';
    this.view.fieldServiceType.text = args.serviceType;
    this.view.fieldPlotNo.text = args.plotNo;
    this.view.fieldProject.text = args.project;
    this.view.fieldPhase.text = args.phase;
    this.view.fieldDistrict.text = args.district;
    this.view.fieldProjectStage.text = args.stage;
    this.view.fieldContractor.text = args.contractor;
    this.view.fieldContactPerson.text = args.contactPerson;
    this.view.fieldEmail.text = args.email;
    this.view.fieldLicenseNo.text = args.licenseNo;
    this.view.fieldLicenseExpiration.text = args.licenseExpiration;
  }

});