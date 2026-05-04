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
            return ((a.rating || 0) - (b.rating || 0)) * order;
          }

          return 0;
        });
      }

      const viewData = {
        title: "Playlist App Dashboard",
        fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
        playlists: sorted,
        search: searchTerm,
        titleSelected: sortField === "title",
        ratingSelected: sortField === "rating",
        ascSelected: request.query.order === "asc",
        descSelected: request.query.order === "desc",
      };

      response.render('dashboard', viewData);
    } else {
      response.redirect('/');
    }
  },

  addPlaylist(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);

    const newPlaylist = {
      id: uuidv4(),
      userid: loggedInUser.id,
      title: request.body.title,
      date: new Date(),
      rating: 0,
      songs: [],
    };

    playlistStore.addPlaylist(newPlaylist);
    response.redirect('/dashboard');
  },

  deletePlaylist(request, response) {
    const playlistId = request.params.id;
    logger.debug(`Deleting Playlist ${playlistId}`);
    playlistStore.removePlaylist(playlistId);
    response.redirect("/dashboard");
  },
};

export default dashboard;