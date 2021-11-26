const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');

const app = express();
const port = 5000;

app.use(express.json());

/* Solucionando error de cors y agregando limitaciones para puertos */

/* const whiteList = ['http://localhost:3000','http://localhost:4200'];
const options = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'))
    }
  }
} */

/* app.use(cors(options)); */
app.use(cors());
/* ... */

app.get('/', (req, res) => {
  res.send('Run express server');
});

routerApi(app);

app.listen(port, () => {
  console.log('mi port' + port);
})
