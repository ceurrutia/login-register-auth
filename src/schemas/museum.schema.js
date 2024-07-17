import { z } from 'zod'

export const createMuseumSchema = z.object({
    image: z.string({
        required_error: "Image is required"
    }),
    museumName: z.string({
        required_error: "Museum name is required"
    }),
    address: z.string({
        required_error: "Address is required"
    }),
    description: z.string({
        required_error: "Description is required"
    }),
    day_free: z.string({
        required_error: "day free is required"
    }),
    hour_free: z.string({
        required_error: "Hour free is required"
    }),
    city:z.string({
        required_error: "City is required"
    }),
    country: z.string({
        required_error: "Country is required"
    }),
    how_go:z.string({
        required_error: "Link to google map is required"
    })


})