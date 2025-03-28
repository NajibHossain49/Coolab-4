import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // Changed to string to match the actual type
      email: string;
    };
  }

  interface User {
    id: string; // Changed to string
    email: string;
  }
}

// Define the NextAuth Options for authentication
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials!;

        // In-memory user data (replace with DB in production)
        const users = [
          {
            id: "1", // Changed to string
            email: process.env.ADMIN_EMAIL as string,
            password: process.env.ADMIN_PASSWORD as string,
          },
        ];

        // Find user matching the email and password
        const user = users.find(
          (user) => user.email === email && user.password === password
        );

        // Return user if valid
        if (user) {
          return { id: user.id, email: user.email };
        } else {
          return null;
        }
      },
    }),
  ],

  // Custom sign-in page
  pages: {
    signIn: "/",
  },

  session: {
    strategy: "database",
  },

  callbacks: {
    async session({ session, user }) {
      if (user) {
        session.user.id = user.id; // Now this should work with string type
        session.user.email = user.email;
      }
      return session;
    },
  },
};