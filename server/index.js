const express = require("express");
const app = express();
const path = require("path");

const filePath = path.join(__dirname, "../app/dist");
const serveStatic = express.static(filePath);
app.use(serveStatic);

// Middleware function for logging route requests
const logRoutes = (req, res, next) => {
  const time = new Date().toLocaleString();
  console.log(`${req.method}: ${req.originalUrl} - ${time}`);
  next(); // Passes the request to the next middleware/controller
};

// Register the logRoutes middleware globally to log all requests
app.use(logRoutes);

// Other endpoints and controllers
const tellJoke = (req, res) => {
  res.json({
    setup: "What do you call a pile of kittens?",
    punchline: "A meowtain!",
  });
};

const getPicture = (req, res) => {
  res.send(
    "https://www.weforum.org/stories/2023/09/every-sector-must-play-their-part-in-contributing-towards-a-nature-positive-future-here-s-how/"
  );
};

const rollDie = (req, res) => {
  let quantity = parseInt(req.query.quantity, 10); // Parse the query parameter

  // Validate quantity: If it's not a valid number or less than 1, default to 1
  if (isNaN(quantity) || quantity < 1) {
    quantity = 1;
  }

  // Roll the dice
  const rolls = Array.from(
    { length: quantity },
    () => Math.floor(Math.random() * 6) + 1
  );

  res.json({ rolls });
};

// Endpoints
app.get("/api/joke", tellJoke);
app.get("/api/picture", getPicture);
app.get("/api/rollDie", rollDie);

const PORT = 8180;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
