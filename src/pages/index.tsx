import { GetStaticProps } from 'next';
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

import { FiCalendar, FiUser } from 'react-icons/fi';
import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({ postsPagination }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | spacetraveling.</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>

          <Link href="/">
            <a href="/">
              <strong>Como utilizar Hooks</strong>
              <p>Pensando em sincronização em vez de ciclos de vida.</p>
            </a>
          </Link>

          <div className={styles.info}>
            <FiCalendar />
            <time>15 Mar 2021</time>

            <FiUser />
            <span>Joseph Climber</span>
          </div>
        </div>

        <div className={styles.posts}>

          <Link href="/">
            <a href="/">
              <strong>Criando um app CRA do zero</strong>
              <p>Tudo sobre como criar a sua primeira aplicação utilizando Create React App.</p>
            </a>
          </Link>

          <div className={styles.info}>
            <FiCalendar />
            <time>15 Mar 2021</time>

            <FiUser />
            <span>Joseph Climber</span>
          </div>
        </div>
      </main>
    </>
  );
}

// export const getStaticProps = async () => {
//   // const prismic = getPrismicClient();
//   // const postsResponse = await prismic.query(TODO);

//   // TODO
// };
