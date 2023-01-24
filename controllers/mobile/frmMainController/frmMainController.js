define({ 

  onViewCreated(){
    this.view.init = () => {
      this.view.cmpPopupConfirmDelete.onDelete = () => this.reloadData();
      this.view.requestButton.onClickButton = () => new voltmx.mvc.Navigation('frmNOC').navigate();
    };
  },

  onNavigate(){
    this.reloadData();
  },
  
  reloadData(){
    voltmx.application.showLoadingScreen(null, null, constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true,{});

    var objSvc = kony.sdk.getCurrentInstance().getObjectService("NOCObjectService", {
      "access": "online"
    });

    var dataObject = new kony.sdk.dto.DataObject("NOCObject");
    //var odataUrl = "$filter=fieldname eq value";
    //dataObject.odataUrl = odataUrl;
    objSvc.fetch({
      "dataObject": dataObject
    }, (response) => {
      this.view.flxNOCList.removeAll();
      response.records.forEach((record, index) => {
        const nocElement = new com.hcl.demo.jumeirah.NOCElement({
          id: `element${new Date().valueOf()}`,
          top: index ? '10dp' : '0'
        }, {}, {});
        
        const lud  = new Date(record.LastUpdatedDateTime);
        const fn = globals.formatNumber;
		nocElement.serviceType = record.serviceType;
        nocElement.requestNo = `Request No: ${record.id}`;
        nocElement.lastUpdated = `Last updated on ${fn(lud.getDate())}/${fn(lud.getMonth() + 1)}/${fn(lud.getFullYear())}`;
        nocElement.status = record.status;
        nocElement.onClickElement = () => {
          new voltmx.mvc.Navigation('frmSummary').navigate({
            apn: record.id,
            serviceType: record.serviceType,
            plotNo: record.plotNo,
            project: record.project,
            phase: record.phase,
            district: record.district,
            stage: record.stage,
            contractor: record.contractor,
            contactPerson: record.contactPerson,
            email: record.email,
            licenseNo: record.licenseNo,
            licenseExpiration: record.licenseExpiration
          });
        };
        nocElement.onClickDelete = () => {
          this.view.cmpPopupConfirmDelete.show(record.id);
        };
        this.view.flxNOCList.add(nocElement);
      });
      this.view.flxNOCList.forceLayout();
      voltmx.application.dismissLoadingScreen();
    }, (error) => {
      alert(JSON.stringify(error));
      voltmx.application.dismissLoadingScreen();
    });
  }

});