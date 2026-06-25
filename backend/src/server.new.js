require("dotenv").config();

const app = require("./app");

const port = process.env.BACKEND_PORT || 3001;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
