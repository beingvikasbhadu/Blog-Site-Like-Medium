import { Hono } from "hono";
import { verify } from "hono/jwt";

export const serviceRoute = new Hono<{
  Bindings: {
    JWT_SECRET: string;
  };
}>();

serviceRoute.get("/is-signin", async (c) => {
  const jwt = (c.req.header("Authorization") || "");
  const token = jwt.split(" ")[1];
  console.log(token)
  try{
    const payload = await verify(token, c.env.JWT_SECRET);
    
    return c.json({
        is_signin:true
    })
  }
  catch(e)
  {
    console.log("error:",e)
    return c.json({
        is_signin:false
    })
  }
  
});
