import Layout from "components/templates/LayoutTemplate";
import BlogDetailComponent from "components/templates/BlogDetailTemplate";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import dataStatic from "../data.json";
import Head from "next/head";
const Slug = ({ repo, repoPost }) => {
  const router = useRouter();


  return (
    <>
      <Head>
        <title>{dataStatic.page.title}</title>
        <meta name="description" content={dataStatic.page.description} />
        <meta name="keywords" content="từ khóa1, từ khóa2, từ khóa3" />

        <meta property="og:title" content={dataStatic.page.title} />
        <meta property="og:description" content={dataStatic.page.description} />
        <meta name="twitter:title" content={dataStatic.page.title} />
        <meta name="twitter:description" content={dataStatic.page.description} />
      </Head>
      <Layout footer={true}>
        <div className="bg-white text-black min-h-screen">
          <BlogDetailComponent
            // data={repo}
            data={dataStatic}
            repoPost={repoPost}
          />
        </div>
      </Layout>
    </>
  );
};
export default Slug;

export const getServerSideProps = async ({ params }) => {
  const uri = params?.slug[0];
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${uri}`);
  const repo = await res.json();
  const resPost = await fetch("https://jsonplaceholder.typicode.com/posts");
  const repoPost = await resPost.json();

  return { props: { repo, repoPost } };
};
