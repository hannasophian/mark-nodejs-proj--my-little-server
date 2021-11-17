import express from "express";
import ponyData from "../data/ponies.json";
import { seasonOneEpisodes } from "./episodes";
import { pickRandom } from "./random";
import { history } from "./history";



const app = express();
const serverStartDate = new Date();
let serverHitCount = 0;

app.get("/", (req, res) => {
  history.routes = [...history.routes, "/"]

  res.send(
    "This is the default path - and it isn't very interesting, sorry. \nTry visiting localhost:4000/creation-time, localhost:4000/current-time"
  );
});

app.get("/creation-time", (req, res) => {
  history.routes = [...history.routes, "/creation-time"]

  res.json({
    message: `The server was started at ${serverStartDate.toTimeString()}`,
    utc: serverStartDate.toUTCString(),
    countedAsHit: false,
  });
});

app.get("/current-time", (req, res) => {
  const dateOfRequestHandling = new Date();
  history.routes = [...history.routes, "/current-time"]

  res.json({
    message: `The current date is ${dateOfRequestHandling.toTimeString()}`,
    utc: dateOfRequestHandling.toUTCString(),
    countedAsHit: false,
  });
});

app.get("/hits", (req, res) => {
  serverHitCount += 1;
  history.routes = [...history.routes, "/hits"]

  res.json({
    note: "We've registered your hit!",
    currentTotal: serverHitCount,
    countedAsHit: true,
  });
});

app.get("/hits-stealth", (req, res) => {
  res.json({
    note: "Oooh, you ninja. We didn't count that hit.",
    currentTotal: serverHitCount,
    countedAsHit: false,
  });
});

app.get("/ponies", (req, res) => {
  history.routes = [...history.routes, "/ponies"]
  res.json({
    message: "Loaded dummy JSON data:",
    data: ponyData,
    countedAsHit: false,
  });
});

app.get("/history", (req, res) => {
  history.routes = [...history.routes, "/history"]
  res.json(history);
})

app.get("/season-one", (req, res) => {
  history.routes = [...history.routes, "/season-one"]

  res.json({
    countedAsHit: false,
    data: seasonOneEpisodes,
  });
});

app.get("/hello-world", (req, res) => {
  history.routes = [...history.routes, "/hello-world"]

  res.json({
    "english": "Hello world!",
    "esperanto": "Saluton mondo!",
    "hawaiian": "Aloha Honua",
    "turkish": "Merhaba Dünya!"
  });
});

app.get("/ponies/random", (req, res) => {
  history.routes = [...history.routes, "/ponies/random"]

  res.json(pickRandom(ponyData.members));
});

app.get("/season-one/random", (req, res) => {
  history.routes = [...history.routes, "/season-one/random"]

  const randomEpisode = pickRandom(seasonOneEpisodes);
  res.json({
    countedAsHit: false,
    data: randomEpisode,
  });
});

// using 4000 by convention, but could be changed
const PORT_NUMBER = 5050;

app.listen(PORT_NUMBER, () => {
  console.log(
    `If you can see this message in the console, this means that you successfully started the server! \n\nYou can see what comes back by visiting localhost:${PORT_NUMBER} in your browser. \n\nChanges will not be processed unless you restart your server (close and restart). \n\nThe server is currently listening for requests - press Ctrl + C to quit.`
  );
});
