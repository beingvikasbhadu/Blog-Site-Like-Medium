import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { sign } from "hono/jwt";
import { signinInput, signupInput } from "@vikas_bhadu/common";
import { hashPassword, verifyPassword } from "../services/hashing";

export const userAuthRoute = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

const round = 10;

userAuthRoute.use("/auth/*", async (c, next) => {
  const jwt = c.req.header("jwt");
  if (!jwt) {
    await next();
  } else {
    return c.redirect("http://localhost:5173/dashboard");
  }
});
// POST:signUp
userAuthRoute.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const res = signupInput.safeParse(body);
  console.log(res);
  console.log(res.error);
  if (!res.success) {
    return c.json({ error: "invalid input" });
  }
  try {
    const hashed_password = await hashPassword(body.password);
    const user = await prisma.user.create({
      data: {
        ...body,
        password: hashed_password,
      },
    });
    const token = await sign(
      {
        id: user.id,
      },
      c.env.JWT_SECRET
    );
    return c.json({
      jwt: token,
    });
  } catch (e) {
    c.status(403);
    return c.json({ error: "error, while signing up" });
  }
});

// POST: signin
userAuthRoute.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = signinInput.safeParse(body);
  if (!success) {
    return c.json({ error: "invalid input" });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (!user) {
    c.status(403);
    return c.json({ error: "User not found!" });
  } else {
    const isPasswordMatch = await verifyPassword(user.password, body.password);
    if (!isPasswordMatch) {
      return c.json({ error: "password doesn't match!" });
    } else {
      const token = await sign(
        {
          id: user.id,
        },
        c.env.JWT_SECRET
      );

      return c.json({
        jwt: token,
      });
    }
  }
});
