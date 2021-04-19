import format from 'date-fns/format';
import Head from 'next/head';
import { ptBR } from 'date-fns/locale';
import { GetStaticPaths, GetStaticProps } from 'next';
import { FiCalendar, FiUser, FiClock } from 'react-icons/fi';
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { getPrismicClient } from '../../services/prismic';
import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';
import Header from '../../components/Header';

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

export default function Post({ post }: PostProps): JSX.Element {
  const route = useRouter();

  if (route.isFallback) {
    return <p>Carregando...</p>;
  }

  const timeTotal = post.data.content.reduce((acc, time) => {
    const total = RichText.asText(time.body).split(' ');

    const min = Math.ceil(total.length / 200);
    console.log(acc + min);
    return acc + min;
  }, 0);

  return (
    <>
      <Head>
        <title>spacetraveling | {post.data.title}</title>
      </Head>
      <Header />

      <img className={styles.banner} src={post.data.banner.url} alt="banner" />
      <main className={styles.postContainer}>
        <strong>{post.data.title}</strong>
        <div className={styles.postInfo}>
          <time>
            <FiCalendar />
            {format(new Date(post.first_publication_date), 'dd MMM yyyy', {
              locale: ptBR,
            })}
          </time>

          <span>
            <FiUser />
            {post.data.author}
          </span>

          <span>
            <FiClock />
            {timeTotal} min
          </span>
        </div>

        <section className={styles.postContent}>
          {post.data.content.map(p => (
            <div key={p.heading}>
              <strong>{p.heading}</strong>
              <div
                dangerouslySetInnerHTML={{ __html: RichText.asHtml(p.body) }}
              />
            </div>
          ))}
        </section>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient();
  const posts = await prismic.query(Prismic.predicates.at['type.posts']);

  // TODO
  const paths = posts.results.map(post => {
    return {
      params: { slug: post.uid },
    };
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async context => {
  const { slug } = context.params;
  const prismic = getPrismicClient();
  const response = await prismic.getByUID('posts', String(slug), {});

  // TODO
  const post = {
    uid: response.uid,
    first_publication_date: response.first_publication_date,
    data: {
      ...response.data,
    },
  };
  return {
    props: {
      post,
    },
    revalidate: 60 * 30, // 30 minutos
  };
};
