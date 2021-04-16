// import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';
import Head from 'next/head';

// import { getPrismicClient } from '../../services/prismic';

// import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';
import { FiCalendar, FiUser } from 'react-icons/fi';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps) {
  return (
    <>
      <Head>
        <title>Home | spacetraveling.</title>
      </Head>

      <header className={styles.cover}>
        <img src="https://images.unsplash.com/photo-1564865878688-9a244444042a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y29kZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
          alt="Nome da Imagem" />
      </header>

      <article className={styles.container}>
        <div className={styles.content}>
          <h1>Aqui é o titulo</h1>
          <div className={styles.info}>
            <FiCalendar />
            <time>15 Mar 2021</time>

            <FiUser />
            <span>Joseph Climber</span>
          </div>

          <p>
            Aqui é o text
          </p>

        </div>
      </article>
    </>
  );
}

// export const getStaticPaths = async () => {
//   const prismic = getPrismicClient();
//   const posts = await prismic.query(TODO);

//   // TODO
// };

// export const getStaticProps = async context => {
//   const prismic = getPrismicClient();
//   const response = await prismic.getByUID(TODO);

//   // TODO
// };
