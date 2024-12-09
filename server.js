const express = require("express");
const path = require("path");
const app = express();

// Serve static files from the Angular dist directory
app.use(express.static(path.join(__dirname, "wallet-watch-frontend/dist")));

// For all other routes, send the index.html file from the dist directory
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "wallet-watch-frontend/dist/index.html"));
});

// Set port to 8080 (or any port you prefer)
const port = process.env.PORT || 4200;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
