import { LoginData, storeSession } from "@/server/authServer/authServer";
import axios from "axios";
import CredentialsProvider from "next-auth/providers/credentials";

export const options = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Custom Sign In",
      credentials: {},
      async authorize(credentials, req) {
        const platform = req.headers["sec-ch-ua-platform"] || "";
        const isMobile = req.headers["sec-ch-ua-mobile"] === '"?1"';
        const browser = req.headers["sec-ch-ua"];

        try {
          if (!credentials || !credentials.email || !credentials.password) {
            return null; // Return null if credentials are invalid
          }
          const { email, password } = credentials;
          const response = await LoginData(email, password);
          if (response.status) {
            const newip = await axios.get("http://ip-api.com/json/");
            if (newip.status === 200) {
              const data = await storeSession({
                ...newip.data,
                ...response.data,
                platform,
                browser,
                device: isMobile ? "Mobile" : "Desktop",
              });
              if (!data.status) throw new Error(data.message);
              return { ...response.data };
            }
          } else {
            throw new Error(response.message);
          }
        } catch (error) {
          throw new Error(error.message);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user._id;
        (token.name = user.name),
          (token.email = user.email),
          (token.role = user.role);
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) session.user._id = token.id;
      session.user.role = token.role;
      return session;
    },
  },
  pages: {
    signIn: "/auth",
  },
};
