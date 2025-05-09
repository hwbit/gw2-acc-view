
import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import createError from 'http-errors';


import indexRouter from './routes/index.route';
import accRouter from './routes/acc.route';
import utilRouter from './routes/util.route';

const app = express();

// view engine setup
app.set('views', 'views');
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use('/', indexRouter);
app.use('/acc', accRouter);
app.use('/util', utilRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
  });
  
  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

export default app