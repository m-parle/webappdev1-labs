'use strict';

import logger from "../utils/logger.js";
import playlistStore from "../models/playlist-store.js";
import { v4 as uuidv4 } from 'uuid';
import accounts from './accounts.js';

const dashboard = {
    createView(request, response) {
    logger.info("Dashboard page loading!");

    const loggedInUser = accounts.getCurrentUser(request);

    if (loggedInUser) {
      const searchTerm = request.query.searchTerm || "";

      const playlists = searchTerm
        ? playlistStore.searchUserPlaylists(searchTerm, loggedInUser.id)
        : playlistStore.getUserPlaylists(loggedInUser.id);

      const sortField = request.query.sort;
      const order = request.query.order === "desc" ? -1 : 1;

      let sorted = playlists;

      if (sortField) {
        sorted = playlists.slice().sort((a, b) => {
          if (sortField === "title") {
            return a.title.localeCompare(b.title) * order;
          }

          if (sortField === "rating") {
            return (a.rating - b.rating) * order;
          }

          return 0;
        });
      }

      const viewData = {
        title: "Playlist App Dashboard",
        fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
        playlists: sortField ? sorted : playlists,
        search: searchTerm,
        titleSelected: request.query.sort === "title",
        ratingSelected: request.query.sort === "rating",
        ascSelected: request.query.order === "asc",
        descSelected: request.query.order === "desc",
      };
      
      logger.info('about to render' + viewData.playlists);
      
      response.render('dashboard', viewData);
    }
    else response.redirect('/');

  }
};

    const viewData = {
      title: "Playlist App Dashboard",
      playlists: sortField ? sorted : playlists,
      search: searchTerm,
      titleSelected: request.query.sort === "title",
      ratingSelected: request.query.sort === "rating",
      ascSelected: request.query.order === "asc",
      descSelected: request.query.order === "desc",
    };

    logger.debug(viewData.playlists);

    response.render("dashboard", viewData);

  addPlaylist(request, response); {
    const timestamp = new Date();
    
    const newPlaylist = {
      id: uuidv4(),
      title: request.body.title,
	  date: timestamp,
      songs: []
    };
    playlistStore.addPlaylist(newPlaylist);
    response.redirect('/dashboard');
}

deletePlaylist(request, response); {
    const playlistId = request.params.id;
    logger.debug(`Deleting Playlist ${playlistId}`);
    playlistStore.removePlaylist(playlistId);
    response.redirect("/dashboard");
};


export default dashboard;
