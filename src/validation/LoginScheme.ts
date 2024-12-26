import { z } from "zod";

export const LoginScheme = z.object({
  email: z.string().min(1).max(100).email(),
  password: z.string().min(1).max(100),
});
