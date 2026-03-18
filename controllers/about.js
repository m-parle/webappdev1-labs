'use strict';

import logger from "../utils/logger.js";

const about = {
  createView(request, response) {
    logger.info("About page loading!");
    response.send('About the Playlist app');   
  },
};

<nav>
  <a href="/dashboard">Dashboard</a>
  <a href="/about">About</a>
</nav>

export default about;