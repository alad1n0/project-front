import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';

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
            console.log('JWT callback', { user, account, token });
            return token;
        },
        async redirect({ url, baseUrl }) {
            if (url === baseUrl || url.startsWith(baseUrl)) {
                return baseUrl + '/profile';
            }
            return url;
        },
    },
};