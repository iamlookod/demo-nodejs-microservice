require('dotenv').config();
const Koa = require("koa");
const router = require("@koa/router")();
const Mongoose = require("mongoose");
const db = require("./db.json");

const app = new Koa();

Mongoose.connect(process.env.MONGO_URL).then(() => console.log('Mongo conneted')).catch((e) => console.log(e));

// Log requests
app.use(function (ctx, next) {
  const start = new Date();
  const ms = new Date() - start;
  console.log("%s %s - %s", ctx.method, ctx.url, ms);
  next();
});

router.get("/api/posts/in-thread/:threadId", function* (ctx) {
  const id = parseInt(ctx.params.threadId);
  ctx.body = db.posts.filter((post) => post.thread == id);
});

router.get("/api/posts", function (ctx) {
  ctx.body = db.posts;
});

router.get("/api/posts/by-user/:userId", function (ctx) {
  const id = parseInt(ctx.params.userId);
  ctx.body = db.posts.filter((post) => post.user == id);
});

router.get("/api", function (ctx) {
  ctx.body = "API ready to receive requests";
});

router.get("/", function (ctx) {
  ctx.body = "Ready to receive requests";
});

app.use(router.routes());

app.listen(3000);

console.log("Worker started");
