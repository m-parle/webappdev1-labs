"use strict";

import express from "express";
import logger from "./utils/logger.js";
import routes from "./routes.js";
import { create } from "express-handlebars";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const handlebars = create({
  extname: ".hbs",
  helpers: {
    uppercase: (inputString) => {
      return inputString.toUpperCase();
    },
    
    formatDate: (date) => {
      let dateCreated = new Date(date);
      let options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "2-digit",
      };
      return `${dateCreated.toLocaleDateString("en-IE", options)}`;
    },
    
    highlightPopular: (rating) => {
        let message = "";
        if (rating >= 4){
          message = "Popular with listeners!";
        }
        return message;
    } 
  },
});
app.engine(".hbs", handlebars.engine);
app.set("view engine", ".hbs");

app.use("/", routes);

app.listen(port, () => logger.info(`Your app is listening on port ${port}`));
