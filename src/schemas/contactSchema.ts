import * as z from 'zod';

export const contactSchema = z.object({
  name: z
    .string({required_error: 'required_field_error'})
    .nonempty('required_field_error')
    .min(3, 'name_min_length_error')
    .max(50, 'name_max_length_error'),
  email: z
    .string({required_error: 'required_field_error'})
    .nonempty('required_field_error')
    .email('email_field_error'),
  message: z
    .string({required_error: 'required_field_error'})
    .nonempty('required_field_error')
    .min(5, 'message_min_length_error')
    .max(1000, 'message_max_length_error'),
});

export type ContactFormDataType = z.infer<typeof contactSchema>;
