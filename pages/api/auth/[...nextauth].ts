import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Reference: https://github.com/nextauthjs/next-auth-typescript-example/blob/main/pages/api/auth/[...nextauth].ts
export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET !== undefined ? process.env.GOOGLE_CLIENT_SECRET : undefined,
        }),
        // add more providers here
    ],
    callbacks: {
        async session({ session, token }) {
            session.user.tag = session.user?.name
                .split(" ")
                .join("")
                .toLocaleLowerCase();
            session.user.id = token.sub;
            // let tag = session.user?.name !== undefined ? session.user.name : undefined;
            // if (tag) {
            //     tag
            //         .split(" ")
            //         .join("")
            //         .toLocaleLowerCase();
            // }
            // session.user?.name !== undefined ? token.sub : undefined;
            return session;
        },
    },
    // session: {
    //     strategy: 'jwt'
    // },
    jwt: {},
    pages: {},
    events: {},
});
