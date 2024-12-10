const { exec } = require("child_process");

// Start Frontend
const startFrontend = exec("npm run start:frontend", {
  cwd: "./wallet-watch-frontend",
});

startFrontend.stdout.on("data", (data) => {
  console.log(`Frontend: ${data}`);
});

startFrontend.stderr.on("data", (data) => {
  console.error(`Frontend Error: ${data}`);
});

startFrontend.on("close", (code) => {
  console.log(`Frontend process exited with code ${code}`);
});

// Start Backend
const startBackend = exec("npm run start:backend", {
  cwd: "./wallet-watch-backend",
});

startBackend.stdout.on("data", (data) => {
  console.log(`Backend: ${data}`);
});

startBackend.stderr.on("data", (data) => {
  console.error(`Backend Error: ${data}`);
});

startBackend.on("close", (code) => {
  console.log(`Backend process exited with code ${code}`);
});
