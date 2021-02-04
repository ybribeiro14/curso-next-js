import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router'
import { Title } from '../../../styles/pages/Home'

interface iProducts {
  id: string;
  title: string;
}

interface CategoriesProps {
  products: iProducts[]
}

export default function Categories({ products }: CategoriesProps) {

  const router = useRouter();

  if (router.isFallback) {
    return <p>Carregando...</p>
  }

  return (
    <div>
      <Title>{router.query.slug}</Title>

      <ul>
        {products.map(product => {
          return (
            <li key={product.id}>
              {product.title}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {

  const response = await fetch('http://localhost:3333/categories');
  const categories = await response.json();

  const paths = categories.map(category => {
    return {
      params: {
        slug: category.id
      }
    }
  })

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps<CategoriesProps> = async (context) => {
  const { slug } = context.params

  const response = await fetch(`http://localhost:3333/products?category_id=${slug}`);
  const products = await response.json();

  return {
    props: {
      products
    },
    revalidate: 5,
  }
}