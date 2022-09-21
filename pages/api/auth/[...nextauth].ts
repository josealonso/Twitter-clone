import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";
import LinkedinProvider from "next-auth/providers/linkedin";

// Reference: https://github.com/nextauthjs/next-auth-typescript-example/blob/main/pages/api/auth/[...nextauth].ts
export default NextAuth({
    providers: [
        GoogleProvider({
            // @ts-ignore
            clientId: process.env.GOOGLE_CLIENT_ID,
            // @ts-ignore
            clientSecret: process.env.GOOGLE_CLIENT_SECRET !== undefined ? process.env.GOOGLE_CLIENT_SECRET : undefined,
        }),
        // TwitterProvider({
        //     // @ts-ignore
        //     clientId: process.env.TWITTER_CLIENT_ID,
        //     // @ts-ignore
        //     clientSecret: process.env.TWITTER_CLIENT_SECRET !== undefined ? process.env.TWITTER_CLIENT_SECRET : undefined,
        // }),
        // LinkedinProvider({
        //     // @ts-ignore
        //     clientId: process.env.LINKEDIN_CLIENT_ID,
        //     // @ts-ignore
        //     clientSecret: process.env.LINKEDIN_CLIENT_SECRET !== undefined ? process.env.LINKEDIN_CLIENT_SECRET : undefined,
        //     authorizationUrl: `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.LINKEDIN_CLIENT_ID}&redirect_uri=${process.env.CALLBACK_URL}&state=a_random_string_that_is_really_difficult_and_random_2341344&scope=r_liteprofile%20r_emailaddress`,
        //     // https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id={your_client_id}&redirect_uri={your_callback_url}&state=foobar&scope=r_liteprofile%20r_emailaddress
        // }),

        // add more providers here
    ],

    secret: process.env.JWT_SECRET,

    // session: {
    //     strategy: "jwt"
    // },
    // jwt: {
    //     secret: process.env.SECRET,
    // },
    // pages: {},
    // callbacks: {
    //     async session({ session, token }) {
    //         let userTag = session?.user?.name?.
    //             split(" ").join("").toLowerCase();
    //         // session?.user?.tag = session?.user?.name
    //         let tokenId = token.sub;
    //         Object.defineProperty(String, "tag", userTag);
    //         let str = session.user.tag;
    //         console.log("tokenId: ", tokenId);
    //         // session.user.id = token.sub;
    //         return session;
    //     },
    // },
    events: {},
    debug: true,
});
