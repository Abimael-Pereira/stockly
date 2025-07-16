import { z } from "zod";

export const upsertProductFormSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().trim().min(1, { message: "Nome é obrigatório." }),
  price: z.number().min(0.01, { message: "Preço é obrigatório." }),
  stock: z.coerce
    .number()
    .nonnegative({
      message: "Estoque não pode ser negativo.",
    })
    .int()
    .min(0, { message: "Estoque é obrigatório." }),
});

export const upserProductActionSchema = upsertProductFormSchema.extend({
  userId: z.string().cuid(),
});

export type UpsertProductFormSchema = z.infer<typeof upsertProductFormSchema>;
export type UpsertProductActionSchema = z.infer<typeof upserProductActionSchema>;
