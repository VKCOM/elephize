import * as express from 'express';
const app = express();
const port = 3300;

app.use(express.static('www'));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
