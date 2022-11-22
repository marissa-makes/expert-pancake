import { gql, useQuery } from '@apollo/client';
import {
  Header,
  Hero,
  Footer,
  Main,
  Container,
  NavigationMenu,
  SEO,
} from '../../components';
import { getNextStaticProps } from '@faustwp/core';

export default function Page(props) {
  const { data } = useQuery(Page.query, {
    variables: {
        slug: props.slug
    },
  });

  return (
    <>
      <Main>
        <Container>
          <Hero title={data?.food.title} />
          <div className="text-center">
            <img src={data?.food.featuredImage.node.sourceUrl} />
            <div dangerouslySetInnerHTML={{__html: data?.food.description}}></div>
          </div>
        </Container>
      </Main>
    </>
  );
}

Page.query = gql`
  query GetPageData(
    $slug: ID!
  ) {
    food(id: $slug, idType: SLUG) {
        id
        origin
        title
        classification
        description
        featuredImage {
            node {
            sourceUrl
            }
        }
    }
  }
`;

Page.variables = () => {
  return {
    slug: "corndog"
  };
};

export function getStaticProps(ctx) {
  return getNextStaticProps(ctx, {Page, props: {slug: ctx?.params?.slug[0]}});
}

export async function getStaticPaths() {
    return {
      paths: [],
      fallback: 'blocking',
    };
  }