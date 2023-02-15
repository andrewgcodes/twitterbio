import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Format any date string with AI."
          />
          <meta property="og:site_name" content="twitterbio.com" />
          <meta
            property="og:description"
            content="Format any date string with AI."
          />
          <meta property="og:title" content="AI Date Formatter" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="AI Date Formatter" />
          <meta
            name="twitter:description"
            content="Format any date string with AI."
          />
          <meta
            property="og:image"
            content="https://cloud-b18edru2h-hack-club-bot.vercel.app/0towfiqu-barbhuiya-bwoaixlg0uc-unsplash.jpg"
          />
          <meta
            name="twitter:image"
            content="https://cloud-b18edru2h-hack-club-bot.vercel.app/0towfiqu-barbhuiya-bwoaixlg0uc-unsplash.jpg"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
