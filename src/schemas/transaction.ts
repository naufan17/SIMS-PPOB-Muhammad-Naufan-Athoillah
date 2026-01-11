import { z } from "zod";

export const topUpSchema = z.object({
  amount: z.number({ error: "Nominal harus berupa angka" })
    .min(10000, "Minimal Top Up adalah Rp 10.000")
    .max(1000000, "Maksimal Top Up adalah Rp 1.000.000"),
});

export type TopUpFormValues = z.infer<typeof topUpSchema>;
