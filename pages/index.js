import Head from "next/head";
import Link from "next/link";

let client = require("contentful").createClient({
  space: process.env.NEXT_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_CONTENTFUL_ACCESS_TOKEN,
});

export async function getStaticProps() {
  let data = await client.getEntries({
    content_type: "article",
  });

  return {
    props: {
      articles: data.items,
    },
    revalidate: 1,
  };
}

export default function Home({ articles }) {
  console.log(articles);

  return (
    <div>
      <Head>
        <title>Next.js + Contentful</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <ul>
          {articles.map((article) => (
            <li key={article.sys.id}>
              <Link href={"/articles/" + article.fields.slug}>
                <a>{article.fields.title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
