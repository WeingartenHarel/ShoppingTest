const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const session = require('express-session')
const app = express()
const http = require('http').createServer(app);
        
// Express App Config
app.use(bodyParser.json());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))
         
// cors App config
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'public')));
} else {
  const corsOptions = {
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    credentials: true
  };
  app.use(cors(corsOptions));
}
  
// import routes from api folder
const userProduct = require('./api/user/product.routes')    
     
// config App routes
app.use('/api/product', userProduct)

app.get('/**', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

// log when server starts
const logger = require('./services/logger.service')
const port = process.env.PORT || 3030;
http.listen(port, () => {
  logger.info('Server is running on port:  ' + port)
});

          