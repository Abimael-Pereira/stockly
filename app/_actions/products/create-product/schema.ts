import { z } from "zod";

export const createProductSchema = z.object({
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
  
  export type CreateProductSchema = z.infer<typeof createProductSchema>;