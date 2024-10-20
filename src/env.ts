import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod"; // used to validate environment variables

export const env = createEnv({
    server: {},
    client: {
        NEXT_PUBLIC_BASE_URL: z.string().url(), // check if this string url variable exists
        NEXT_PUBLIC_WIX_CLIENT_ID: z.string().min(1), // make sure this var is a string with at least 1 char
    },
    experimental__runtimeEnv: { // recieves the objects above
        NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL, 
        NEXT_PUBLIC_WIX_CLIENT_ID: process.env.NEXT_PUBLIC_WIX_CLIENT_ID, 
    }
});