const express = require('express')
const app = express();

app.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});

app.get('/user/:id', function (req, res, next) {
    // if the user ID is 0, skip to the next route
    if (req.params.id == 0) next('route');
    // otherwise pass the control to the next middleware function in this stack
    else next(); //
  }, function (req, res, next) {
    // render a regular page
    res.send('regular');
  });
  
  // handler for the /user/:id path, which renders a special page
  app.get('/user/:id', function (req, res, next) {
    res.send('special');
  });
  
app.listen(3000, () => {
    console.log('server is runing on port 3000');
})
