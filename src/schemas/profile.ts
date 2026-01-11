import { z } from "zod";

export const accountSchema = z.object({
  email: z.string().email(),
  first_name: z.string().min(1, "Nama depan tidak boleh kosong"),
  last_name: z.string().min(1, "Nama belakang tidak boleh kosong"),
});

export type AccountFormValues = z.infer<typeof accountSchema>;
