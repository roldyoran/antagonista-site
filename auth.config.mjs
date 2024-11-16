import { defineConfig } from 'auth-astro';
import Google from '@auth/core/providers/google';

// export default defineConfig({
//   providers: [
//     Google({
//       clientId: import.meta.env.GOOGLE_CLIENT_ID,
//       clientSecret: import.meta.env.GOOGLE_CLIENT_SECRET,
//       // Configuración adicional para procesar el perfil
//       profile(profile) {
//         return {
//           id: profile.sub, // 'sub' es el identificador único de Google
//           name: profile.name,
//           email: profile.email,
//           image: profile.picture,
//         };
//       },
//     }),
//   ],
// });

export default defineConfig({
  providers: [
    Google({
      clientId: import.meta.env.GOOGLE_CLIENT_ID,
      clientSecret: import.meta.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.id, // Este será consistente ahora
      },
    }),
    jwt: ({ token, account }) => {
      // Aseguramos que el id sea consistente
      if (account) {
        // console.log(account);
        token.id = account.providerAccountId; // Google asigna este ID como único
      }
      return token;
    },
  },
});
