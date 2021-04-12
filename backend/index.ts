const app = require('./src/app');
require('dotenv').config();

app.listen(3000).then(() => {
  console.log('Server running at http://localhost:3000/');
});