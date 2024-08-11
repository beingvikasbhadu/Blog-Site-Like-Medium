import { Hono } from "hono";
import { userAuthRoute } from "./routes/userAuth";
import { blogRoute } from "./routes/blog";
import { cors } from "hono/cors";
import { serviceRoute } from "./services/authcheck";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

app.use("*", cors());

app.route("/api/v1/blog", blogRoute);
app.route("/api/v1/user", userAuthRoute);
app.route("/api/v1/service",serviceRoute);

export default app;
