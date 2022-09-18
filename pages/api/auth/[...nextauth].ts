import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";
import LinkedinProvider from "next-auth/providers/linkedin";

// Reference: https://github.com/nextauthjs/next-auth-typescript-example/blob/main/pages/api/auth/[...nextauth].ts
export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET !== undefined ? process.env.GOOGLE_CLIENT_SECRET : undefined,
        }),
        TwitterProvider({
            clientId: process.env.TWITTER_CLIENT_ID,
            clientSecret: process.env.TWITTER_CLIENT_SECRET !== undefined ? process.env.TWITTER_CLIENT_SECRET : undefined,
        }),
        LinkedinProvider({
            clientId: process.env.LINKEDIN_CLIENT_ID,
            clientSecret: process.env.LINKEDIN_CLIENT_SECRET !== undefined ? process.env.LINKEDIN_CLIENT_SECRET : undefined,
            authorizationUrl: `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.LINKEDIN_CLIENT_ID}&redirect_uri=&state=a_random_string_that_is_really_difficult_and_random_2341344&scope=r_liteprofile%20r_emailaddress`,
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
