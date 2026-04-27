"use strict";
import logger from "../utils/logger.js";
import playlistStore from "../models/playlist-store.js";
import accounts from './accounts.js';

const stats = {
    createView(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);

    if (loggedInUser) {
      logger.info("Stats page loading!");

      // app statistics calculations
      const playlists = playlistStore.getAllPlaylists();

      let numPlaylists = playlists.length;

      let numSongs = playlists.reduce((total, playlist) => total + playlist.songs.length, 0);

      let average = numPlaylists > 0 ? (numSongs / numPlaylists).toFixed(2) : 0;

      let totalRating = playlists.reduce((total, playlist) => total + parseInt(playlist.rating), 0);

      let avgRating = numPlaylists > 0 ? totalRating / numPlaylists : 0;

      let maxRating = playlists.length > 0 ? Math.max(...playlists.map(playlist => playlist.rating)) : 0;
      let maxRated = playlists.filter(playlist => playlist.rating === maxRating);
      let favTitles = maxRated.map(item => item.title);

      let longestSize = playlists.length > 0 ? Math.max(...playlists.map(playlist => playlist.songs.length)) : 0;
      let longestPlaylists = playlists.filter(playlist => playlist.songs.length === longestSize);
      let longestPlaylistTitles = longestPlaylists.map(item => item.title);
      
      const statistics = {
        displayNumPlaylists: numPlaylists,
        displayNumSongs: numSongs,
        displayAverage: average,
        displayAvgRating: avgRating,
        highest: maxRating,
        displayFav: favTitles,
        longest: longestSize,
        longestTitles: longestPlaylistTitles,
      };

      const viewData = {
        title: "Playlist App Statistics",
        stats: statistics,
        fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName
      };

      response.render("stats", viewData);
    }
    else response.redirect('/');
  },
};

export default stats;
