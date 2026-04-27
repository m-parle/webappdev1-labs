'use strict';

import logger from "../utils/logger.js";
import appStore from "../models/app-store.js";
import accounts from './accounts.js';

const start = {
  createView(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    logger.info("Start page loading!");
    
    if (loggedInUser) {
      const viewData = {
        title: "Welcome to the Playlist app!",
        info: appStore.getAppInfo(),
        fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      };
      response.render('start', viewData);
    }
    else response.redirect('/');    
},
};

export default start;
