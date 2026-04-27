'use strict';

import express from 'express';
const router = express.Router();
import logger from "./utils/logger.js";
import stats from './controllers/stats.js';


import start from './controllers/start.js';
import dashboard from './controllers/dashboard.js';
import about from './controllers/about.js';
import playlist from './controllers/playlist.js';
import accounts from './controllers/accounts.js';


router.get('/start', start.createView);
router.get('/dashboard', dashboard.createView);
router.get('/about', about.createView);
router.get('/playlist/:id', playlist.createView);
router.get('/playlist/:id/deletesong/:songid', playlist.deleteSong);
router.get('/dashboard/deleteplaylist/:id', dashboard.deletePlaylist);
router.get('/stats', stats.createView);
router.get('/searchCategory', dashboard.createView);
router.get('/sortData', dashboard.createView);

router.get('/error', (request, response) => response.status(404).end('Page not found.'));

router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);

router.post('/playlist/:id/addsong', playlist.addSong);
router.post('/dashboard/addplaylist', dashboard.addPlaylist);
router.post('/playlist/:id/updatesong/:songid', playlist.updateSong);

export default router;
