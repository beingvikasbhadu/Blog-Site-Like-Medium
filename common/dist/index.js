"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePostInput = exports.createPostInput = exports.signinInput = exports.signupInput = void 0;
const zod_1 = require("zod");
exports.signupInput = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string()
        .min(6, { message: "Password must be at least 6 characters long" })
        .regex(/\d/, { message: "Password must contain at least one digit" }),
    name: zod_1.z.string().optional()
});
exports.signinInput = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string()
        .min(6, { message: "Password must be at least 6 characters long" })
        .regex(/\d/, { message: "Password must contain at least one digit" }),
});
exports.createPostInput = zod_1.z.object({
    title: zod_1.z.string(),
    content: zod_1.z.string(),
});
exports.updatePostInput = zod_1.z.object({
    title: zod_1.z.string().optional(),
    content: zod_1.z.string().optional()
});
