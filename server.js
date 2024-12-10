const express = require("express");
const path = require("path");
const app = express();

// Serve static files from the Angular dist directory
app.use(
  express.static(
    path.join(__dirname, "wallet-watch-frontend/dist/wallet-watch/browser")
  )
);

// For all other routes, send the index.html file from the dist directory
app.get("*", (req, res) => {
  res.sendFile(
    path.join(
      __dirname,
      "wallet-watch-frontend/dist/wallet-watch/browser/index.html"
    )
  );
});

// Set port to 8080 (or any port you prefer)
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
