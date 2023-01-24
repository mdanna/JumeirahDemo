define({ 

	onViewCreated(){
      this.view.init = () => {
        this.view.loginButton.onClickButton = () => new voltmx.mvc.Navigation("frmMain").navigate();
      };
    }

});