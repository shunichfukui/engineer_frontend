import React from "react";
import { GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType, NextPage } from 'next';
import { TPost } from "types";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Home: NextPage<Props> = (props) => {
  return (
    <div>
      <h2>POSTの一覧</h2>
      <ul>
        {props.posts.map((post) =>
          <li key={post.id}>
            <p>{post.id}.</p>
            <p>{post.title}</p>
          </li>
        )}
      </ul>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
  const response = await fetch("http://api:3000/posts", {method: "GET"});
  const posts: TPost[] = await response.json();
  
  if (!posts) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      posts: posts
    },
    revalidate: 10,
  };
};

export default Home;