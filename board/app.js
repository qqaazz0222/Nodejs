var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var signinRouter = require("./routes/signin");
var signupRouter = require("./routes/signup");
var mypageRouter = require("./routes/mypage");
var cartRouter = require("./routes/cart");
var addressRouter = require("./routes/address");
var cardRouter = require("./routes/card");
var orderRouter = require("./routes/order");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use('/node_modules', express.static(path.join(__dirname, '/node_modules')));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/signin", signinRouter);
app.use("/signup", signupRouter);
app.use("/mypage", mypageRouter);
app.use("/cart", cartRouter);
app.use("/address", addressRouter);
app.use("/card", cardRouter);
app.use("/order", orderRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error", { signinStatus: false });
});

module.exports = app;
