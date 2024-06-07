import { z } from "zod"

export const signupValidation = z.object({
    name:z.string().min(2,{message:"Name is too short"}),
    username: z.string().min(2,{message:"Username is too short"}),
    email:z.string().email(),
    password:z.string().min(8,{message:"Password must be  atleast 8 characters long"})
  })

  export const signinValidation = z.object({
    email:z.string().email(),
    password:z.string().min(8,{message:"Password must be  atleast 8 characters long"})
  })  