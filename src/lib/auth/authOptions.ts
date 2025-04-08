import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import { AuthService } from "@/services/auth/auth.service";

declare module "next-auth" {
    interface Session {
        access_token?: string;
        refresh_token?: string;
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_KEY!,
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID!,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
            authorization: {
                params: {
                    scope: 'email public_profile',
                },
            },
        }),
    ],
    callbacks: {
        async jwt({ user, account, token }) {
            if (account && account.provider) {
                const oauthData = {
                    provider: account.provider,
                    providerId: account.providerAccountId,
                    email: user?.email || "",
                };

                try {
                    const response = await AuthService.oauth(oauthData);
                    const { access_token, refresh_token } = response.data.data;

                    if (access_token && refresh_token) {
                        token.access_token = access_token;
                        token.refresh_token = refresh_token;
                    }
                } catch (error) {
                    console.error("OAuth error:", error);
                }
            }

            return token;
        },
        async session({ session, token }) {
            if (session && token) {
                session.access_token = token.access_token as string;
                session.refresh_token = token.refresh_token as string;
            }

            console.log(session)

            return session;
        },
        async redirect({ url, baseUrl }) {
            if (url === baseUrl || url.startsWith(baseUrl)) {
                return baseUrl + '/profile';
            }
            return url;
        },
    },

    secret: process.env.JWT_SECRET,

    session: {
        maxAge: 3 * 30 * 24 * 60 * 60,
        updateAge: 30 * 24 * 60 * 60,
    },
};