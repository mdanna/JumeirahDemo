const globals = {
  EVT_SELECT_TAB: 'selectTab',
  EVT_SELECT_VALUE: 'selectValue',
  EVT_SET_VALUE: 'setValue',
  EVT_SELECT_FILE: 'selectFile',
  EVT_SET_FILE: 'setFile',
  EVT_SELECT_RADIO_BUTTON: 'selectRadioButton',

  getApn(){
    return `APN/${Math.floor(Math.random() * 10000) + 1}/${new Date().getFullYear()}`;
  },

  formatNumber(num) {
    return num < 10 ? `0${num}` : `${num}`;
  }

};