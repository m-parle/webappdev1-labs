'use strict';

import logger from "../utils/logger.js";
import empStore from "../models/emp-store.js";
import accounts from './accounts.js';

const about = {
  createView(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    logger.info("About page loading!");

    if (loggedInUser) {
      const viewData = {
        title: 'About the Playlist App',
        fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
        employees: empStore.getEmpInfo(),
      };
      response.render('about', viewData);
    } else {
      response.redirect('/');
    }
  },
};

export default about;