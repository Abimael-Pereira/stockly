import { z } from "zod";

export const upsertProductSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().trim().min(1, { message: "Nome é obrigatório." }),
  price: z.number().min(0.01, { message: "Preço é obrigatório." }),
  stock: z.coerce
    .number()
    .positive({
      message: "Estoque não pode ser negativo.",
    })
    .int()
    .min(0, { message: "Estoque é obrigatório." }),
});

export type UpsertProductSchema = z.infer<typeof upsertProductSchema>;
