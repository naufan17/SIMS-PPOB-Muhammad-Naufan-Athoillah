import { z } from "zod";

export const loginSchema = z.object({
  email: z.string()
    .min(1, { message: "Email tidak boleh kosong" })
    .email({ message: "Format email tidak valid" }),
  password: z.string()
    .min(1, { message: "Password tidak boleh kosong" })
    .min(8, { message: "Password minimal 8 karakter" })
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  email: z.string()
    .min(1, { message: "Email tidak boleh kosong" })
    .email({ message: "Format email tidak valid" }),
  first_name: z.string()
    .min(1, { message: "Nama depan tidak boleh kosong" }),
  last_name: z.string()
    .min(1, { message: "Nama belakang tidak boleh kosong" }),
  password: z.string()
    .min(1, { message: "Password tidak boleh kosong" })
    .min(8, { message: "Password minimal 8 karakter" }),
  confirm_password: z.string()
    .min(1, { message: "Konfirmasi password tidak boleh kosong" })
}).refine((data) => data.password === data.confirm_password, {
  message: "Password tidak cocok",
  path: ["confirm_password"]
});

export type RegisterFormValues = z.infer<typeof registerSchema>;
