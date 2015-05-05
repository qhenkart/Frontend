'use strict';

var keymirror = require('keymirror');

var AppConstants = keymirror({

  APP_AUTHENTICATE : null,
  APP_LOGOUT       : null,
  APP_DELETE       : null,
  TOGGLE_AGREEMENT : null,
  TRY_TO_SIGNUP : null,
  TOGGLE_FIELD : null,
  SAVE_NEW_CODE : null,
  GOTO_PERSONAL_PAGE : null,
});

module.exports = AppConstants;
