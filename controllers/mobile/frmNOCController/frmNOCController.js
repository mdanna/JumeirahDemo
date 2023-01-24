define({ 
  tabs: ['Services', 'Plot', 'App', 'Details', 'Delivery'],

  onViewCreated(){
    eventManager.subscribe(globals.EVT_SELECT_TAB, (tabSelected) => {
      this.tabs.forEach((tab) => {
        this.view[`flx${tab}`].isVisible = tab === tabSelected;
      });
    });

    eventManager.subscribe(globals.EVT_SET_VALUE, ({id, value}) => {
      if(id === 'dropdownPlotNo'){
        switch(value){
          case 'Plot 1':
            this.view.textboxProject.text = 'Project 1';
            this.view.textboxPhase.text = 'Phase 1';
            this.view.textboxDistrict.text = 'District 1';
            break;
          case 'Plot 2':
            this.view.textboxProject.text = 'Project 2';
            this.view.textboxPhase.text = 'Phase 2';
            this.view.textboxDistrict.text = 'District 2';
            break;
          case 'Plot 3':
            this.view.textboxProject.text = 'Project 3';
            this.view.textboxPhase.text = 'Phase 3';
            this.view.textboxDistrict.text = 'District 3';
            break;
          default:
            break;
        }
      }
    });

    eventManager.subscribe(globals.EVT_SELECT_RADIO_BUTTON, ({family, radioButton}) => {
      switch(family){
        case 'serviceType':
          this.view.lblValueServiceType.text = radioButton;
          break;
        case 'plot':
          this.view.lblValuePlot.text = radioButton;
          break;
        default:
          break;
      }
      if(this.family === family){
        this.view.lblSelection.text = this.view.lblRadioButton.text === radioButton ? VALUE_SELECTED : VALUE_UNSELECTED;
      }
    });

    this.view.init = () => {
      this.view.buttonCancel.onClickButton = () => {
        eventManager.publish(globals.EVT_SELECT_TAB, this.tabs[0]);
        new voltmx.mvc.Navigation('frmMain').navigate();
      };

      this.view.buttonNextServices.onClickButton = () => eventManager.publish(globals.EVT_SELECT_TAB, this.tabs[1]);
      this.view.buttonNextPlot.onClickButton = () => eventManager.publish(globals.EVT_SELECT_TAB, this.tabs[2]);
      this.view.buttonNextApp.onClickButton = () => eventManager.publish(globals.EVT_SELECT_TAB, this.tabs[3]);
      this.view.buttonNextDocs.onClickButton = () => eventManager.publish(globals.EVT_SELECT_TAB, this.tabs[4]);
      this.view.buttonNextDelivery.onClickButton = () => {
        new voltmx.mvc.Navigation('frmSummary').navigate({
          serviceType: this.view.lblValueServiceType.text,
          plotNo: this.view.dropdownPlotNo.text,
          project: this.view.textboxProject.text,
          phase: this.view.textboxPhase.text,
          district: this.view.textboxDistrict.text,
          stage: this.view.lblValuePlot.text,
          contractor: this.view.dropdownConsultant.text,
          contactPerson: this.view.textboxContactPerson.text,
          email: this.view.textboxContactEmail.text,
          licenseNo: this.view.textboxLicenseNo.text,
          licenseExpiration: this.view.calendarLicenseExpiration.getDate()
        });
      };

      this.view.buttonPreviousPlot.onClickButton = () => eventManager.publish(globals.EVT_SELECT_TAB, this.tabs[0]);
      this.view.buttonPreviousApp.onClickButton = () => eventManager.publish(globals.EVT_SELECT_TAB, this.tabs[1]);
      this.view.buttonPreviousDocs.onClickButton = () => eventManager.publish(globals.EVT_SELECT_TAB, this.tabs[2]);
      this.view.buttonPreviousDelivery.onClickButton = () => eventManager.publish(globals.EVT_SELECT_TAB, this.tabs[3]);

      this.view.sectionOwnerDetails.onChange = (visible) => {
        this.view.flxOwnerDetails.isVisible = visible;
        this.view.forceLayout();
      };
      
      this.view.sectionConsultantDetails.onChange = (visible) => {
        this.view.flxConsultantDetails.isVisible = visible;
        this.view.forceLayout();
      };
      
    };

  }

});