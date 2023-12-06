const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const globalErrorHandler = require("./controller/errorController");
const AppError = require("./utils/appError");
const {
  register,
  http_request_counter,
  http_request_duration,
} = require("./controller/prometheusController");
const userRoutes = require("./routes/userRoutes");
const flightRoutes = require("./routes/flightRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const swaggerStats = require("swagger-stats");

const app = express();

app.use(function (req, res, next) {
  http_request_counter
    .labels({
      method: req.method,
      route: req.originalUrl,
      statusCode: res.statusCode,
    })
    .inc();
  next();
});

app.use(function (req, res, next) {
  const end = http_request_duration.startTimer();
  res.on("finish", function () {
    end({
      method: req.method,
      route: req.originalUrl,
      statusCode: res.statusCode,
    });
  });
  next();
});

app.use(swaggerStats.getMiddleware());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
  })
);

app.get("/metrics", function (req, res) {
  res.setHeader("Content-Type", register.contentType);
  register.metrics().then((data) => res.status(200).send(data));
});
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/flights", flightRoutes);
app.use("/api/v1/bookings", bookingRoutes);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
