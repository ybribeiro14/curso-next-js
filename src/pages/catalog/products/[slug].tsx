import { useRouter } from 'next/router'
import { Title } from '../../../styles/pages/Home'

export default function Product() {

  const router = useRouter();

  return <Title>{router.query.slug}</Title>
}