define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      eventManager.subscribe(globals.EVT_SET_FILE, (value) => {
        this.view.isVisible = false;
      });
      eventManager.subscribe(globals.EVT_SELECT_FILE, (path) => {
        if(path === '..'){
          const lastIndex = this.currentPath.lastIndexOf('/');
          const p = this.currentPath.substring(0, lastIndex - 1);
          this.show(p === voltmx.io.FileSystem.getApplicationDirectoryPath() ? 
                    null : this.currentPath.substring(0, lastIndex));
        } else {
          this.show(`${this.currentPath}/${path}`);
        }
      });

      this.view.preShow = () => {
        if(!this.initDone){
          this.view.lblClose.onTouchEnd = () => this.view.isVisible = false;
          this.initDone = true;
        }
      };
    },

    currentPath: null,
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {},

    show(currentPath){
      this.view.flxList.removeAll();
      const currentLoc = currentPath || voltmx.io.FileSystem.getApplicationDirectoryPath();
      this.currentPath = currentLoc;

      if(currentPath){
        const up = new voltmx.ui.Label({
          id: `item${new Date().valueOf()}`,
          height: '50dp',
          left: '3%',
          width: 'preferred',
        }, {}, {});
        up.text = '..';
        up.skin = 'sknLblRegularOrange110';
        up.onTouchEnd = () => {
          eventManager.publish(globals.EVT_SELECT_FILE, '..');
        };
        this.view.flxList.add(up);
      }

      const fileList = new voltmx.io.File(currentLoc).getFilesList();
      if(fileList){
        for(let i = 0; i < fileList.length; i++){
          const theFile = fileList.item(i);
          const fileName = theFile.name;
          const item = new voltmx.ui.Label({
            id: `item${new Date().valueOf()}`,
            height: '50dp',
            left: '3%',
            width: 'preferred',
          }, {}, {});
          item.text = fileName;
          item.skin = theFile.isDirectory() ? 'sknLblRegularOrange110' : 'sknLblRegularWhite110';
          item.onTouchEnd = () => {
            eventManager.publish(theFile.isDirectory() ? globals.EVT_SELECT_FILE : globals.EVT_SET_FILE, fileName);
          };
          this.view.flxList.add(item);
        }
      }
      this.view.flxList.forceLayout();
      this.view.isVisible = true;
    }
  };
});