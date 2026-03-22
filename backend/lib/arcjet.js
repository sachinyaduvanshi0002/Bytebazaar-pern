import arcjet, { tokenBucket, shield, detectBot } from "@arcjet/node";
import "dotenv/config";

export const aj = arcjet({
  key: process.env.ARCJET_KEY,
  rules: [
    // Shield protects your app
    shield({ mode: "LIVE" }),

    // Bot detection
    detectBot({
      mode: "LIVE",
      allow: ["CATEGORY:SEARCH_ENGINE"],
    }),

    // Rate limiting
    tokenBucket({
      mode: "LIVE",
      refillRate: 30,
      interval: 5,
      capacity: 20,
    }),
  ],
});