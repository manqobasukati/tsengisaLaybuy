import { z } from 'zod';

export const UserZod = z.object({
  email: z.string().email(),
  phoneNumber: z.string(),
  userId: z.string().uuid(),
  password: z.string(),
  fullName: z.string(),
});

export const UserSignUpZod = z.object({
  email: z.string().email({message:'Email entered is invalid'}),
  phoneNumber: z.string().min(8,{message:'Phone number must contain atleast 8 digits'}),
  password: z
    .string()
    .min(6, { message: 'Password must have atleast five characters' }),
  fullName: z.string().min(6,{message:'Please enter a valid full name.'}),
});

export type User = z.infer<typeof UserZod>;
export type UserSignUp = z.infer<typeof UserSignUpZod>;
