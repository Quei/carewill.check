import Link from 'next/link';
import commerce from '@lib/api/commerce';
import { useIntlMessage } from '@lib/hooks/useIntlMessage';
import { Layout } from '@components/common';
import { Grid, Hero, Container } from '@components/ui';
// import HomeAllProductsGrid from '@components/common/HomeAllProductsGrid'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next';

export async function getStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  const config = { locale, locales };
  const { products } = await commerce.getAllProducts({
    variables: { first: 12 },
    config,
    preview,
  });
  const { categories, brands } = await commerce.getSiteInfo({
    config,
    preview,
  });
  const { pages } = await commerce.getAllPages({ config, preview });

  return {
    props: {
      products,
      categories,
      brands,
      pages,
    },
    revalidate: 14400,
  };
}

export default function Home({
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const f = useIntlMessage();
  return (
    <>
      <Hero>
        <div>
          <p className="text-4xl leading-10 font-extrabold sm:text-5xl sm:leading-none sm:tracking-tight lg:text-6xl">
            Release Details: The Yeezy BOOST 350 V2 ‘Natural'
          </p>
        </div>
      </Hero>
      <section>
        <h2>store</h2>
        <Container>
          <div>
            <p>
              The Yeezy BOOST 350 V2 lineup continues to grow. We recently had
              the ‘Carbon’ iteration, and now release details have been locked
              in for this ‘Natural’ joint. Revealed by Yeezy Mafia earlier this
              year, the shoe was originally called ‘Abez’, which translated to
              ‘Tin’ in Hebrew. It’s now undergone a name change, and will be
              referred to as ‘Natural’.
            </p>
          </div>
          <Grid>
            <Link href="/product">
              <a>
                <h3>{f('product')}</h3>
              </a>
            </Link>
            <Link href="/custom-order">
              <a>
                <h3>{f('customOrder')}</h3>
              </a>
            </Link>
            <Link href="/collaboration">
              <a>
                <h3>{f('collaboration')}</h3>
              </a>
            </Link>
            <Link href="/haute-couture">
              <a>
                <h3>{f('hauteCouture')}</h3>
              </a>
            </Link>
            {/* {products.slice(0, 3).map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              imgProps={{
                width: i === 0 ? 1080 : 540,
                height: i === 0 ? 1080 : 540,
              }}
            />
          ))} */}
          </Grid>
        </Container>
      </section>
      <section>
        <Hero>
          <div>
            <p className="text-4xl leading-10 font-extrabold sm:text-5xl sm:leading-none sm:tracking-tight lg:text-6xl">
              Release Details: The Yeezy BOOST 350 V2 ‘Natural'
            </p>
          </div>
        </Hero>
        <h2>labo</h2>
        <div>
          <p>
            The Yeezy BOOST 350 V2 lineup continues to grow. We recently had the
            ‘Carbon’ iteration, and now release details have been locked in for
            this ‘Natural’ joint. Revealed by Yeezy Mafia earlier this year, the
            shoe was originally called ‘Abez’, which translated to ‘Tin’ in
            Hebrew. It’s now undergone a name change, and will be referred to as
            ‘Natural’.
          </p>
        </div>
      </section>
      <section>
        <h2>about us</h2>
        <div>
          <p>
            The Yeezy BOOST 350 V2 lineup continues to grow. We recently had the
            ‘Carbon’ iteration, and now release details have been locked in for
            this ‘Natural’ joint. Revealed by Yeezy Mafia earlier this year, the
            shoe was originally called ‘Abez’, which translated to ‘Tin’ in
            Hebrew. It’s now undergone a name change, and will be referred to as
            ‘Natural’.
          </p>
        </div>
      </section>
      {/* <HomeAllProductsGrid
        newestProducts={products}
        categories={categories}
        brands={brands}
      /> */}
    </>
  );
}

Home.Layout = Layout;
