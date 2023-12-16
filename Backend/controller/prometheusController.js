const prometheus = require("prom-client");
const register = new prometheus.Registry();
const Flight = require("../models/flightModel");
register.setDefaultLabels({
  app: "aves-air",
});

prometheus.collectDefaultMetrics({ register });

const http_request_counter = new prometheus.Counter({
  name: "myapp_http_request_count",
  help: "Count of HTTP requests made to my app",
  labelNames: ["method", "route", "statusCode"],
});

const http_request_duration = new prometheus.Histogram({
  name: "myapp_http_request_duration",
  help: "Duration of HTTP requests in ms",
  labelNames: ["method", "route", "statusCode"],
  buckets: [0.1, 5, 15, 50, 100, 500],
});

const total_bookings_today = new prometheus.Counter({
  name: "myapp_total_bookings_today",
  help: "Total number of bookings made today",
});

const total_no_of_flights = new prometheus.Gauge({
  name: "myapp_total_no_of_flights",
  help: "Total number of flights",
});

const total_no_of_economy_seats_booked = new prometheus.Gauge({
  name: "myapp_total_no_of_economy_seats_booked",
  help: "Total number of economy seats booked",
});

const total_no_of_premium_class_seats_booked = new prometheus.Gauge({
  name: "myapp_total_no_of_premium_class_seats_booked",
  help: "Total number of premium class seats booked",
});

const total_no_of_first_class_seats_booked = new prometheus.Gauge({
  name: "myapp_total_no_of_first_class_seats_booked",
  help: "Total number of first class seats booked",
});

const total_no_of_users_daily_login = new prometheus.Gauge({
  name: "myapp_total_no_of_users_daily_login",
  help: "Total number of users daily login",
});

const total_no_tickets_cancelled = new prometheus.Gauge({
  name: "myapp_total_no_tickets_cancelled",
  help: "Total number of tickets cancelled",
});

const getTodalNoOfFlights = async () => {
  const flights = await Flight.find();
  total_no_of_flights.set(flights.length);
};

// getTodalNoOfFlights();

register.registerMetric(http_request_counter);
register.registerMetric(http_request_duration);
register.registerMetric(total_bookings_today);
register.registerMetric(total_no_of_flights);
register.registerMetric(total_no_of_economy_seats_booked);
register.registerMetric(total_no_of_premium_class_seats_booked);
register.registerMetric(total_no_of_first_class_seats_booked);
register.registerMetric(total_no_of_users_daily_login);
register.registerMetric(total_no_tickets_cancelled);

module.exports = {
  register,
  http_request_counter,
  http_request_duration,
  total_bookings_today,
  total_no_of_flights,
  total_no_of_economy_seats_booked,
  total_no_of_premium_class_seats_booked,
  total_no_of_first_class_seats_booked,
  total_no_of_users_daily_login,
  total_no_tickets_cancelled,
};
