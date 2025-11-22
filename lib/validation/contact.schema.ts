import {z} from "zod";

export const contactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters long").max(100, "Name must be at most 100 characters long"),
    email: z.string().email("Invalid email address").max(100, "Email must be at most 100 characters long"),
    message: z.string().min(10, "Message must be at least 10 characters long").max(1000, "Message must be at most 1000 characters long"),
});