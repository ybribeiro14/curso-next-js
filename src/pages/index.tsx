import { GetServerSideProps } from "next";
import { Title } from "../styles/pages/Home";

interface iProducts {
  id: string;
  title: string;
}

interface HomeProps {
  recommendedProducts: iProducts[]
}

export default function Home({ recommendedProducts }: HomeProps) {

  return (
    <div>
      <section>
        <Title>Products</Title>

        <ul>
          {recommendedProducts.map(recommendedProducts => {
            return (
              <li key={recommendedProducts.id}>
                {recommendedProducts.title}
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const response = await fetch('http://localhost:3333/recommended');
  const recommendedProducts = await response.json();

  return {
    props: {
      recommendedProducts
    }
  }
}