import {z} from "zod"

export const signupInput=z.object({
    email:z.string().email(),
    password: z.string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .regex(/\d/, { message: "Password must contain at least one digit" }),
    name:z.string().optional()
})

export type SignupInput=z.infer<typeof signupInput>

export const signinInput=z.object({
    email:z.string().email(),
    password: z.string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .regex(/\d/, { message: "Password must contain at least one digit" }),

})

export type SigninInput=z.infer<typeof signinInput>

export const createPostInput=z.object({
     title:z.string(),
     content:z.string(),
})

export type CreatePostInput=z.infer<typeof createPostInput>

export const updatePostInput=z.object({
    title:z.string().optional(),
    content:z.string().optional()
})

export type UpdatePostInput=z.infer<typeof updatePostInput>;