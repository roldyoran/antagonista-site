import { defineConfig } from 'auth-astro';
import Twitch from '@auth/core/providers/twitch';

export default defineConfig({
  providers: [
    Twitch({
      clientId: import.meta.env.TWITCH_CLIENT_ID,
      clientSecret: import.meta.env.TWITCH_CLIENT_SECRET,
    }),
  ],
});
