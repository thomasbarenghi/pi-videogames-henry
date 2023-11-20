import { Header, Footer } from '@/components'
import Querier from '@/context/providers/querier.provider'

interface Props {
  children: React.ReactNode
}

const PublicLayout = (props: Props) => (
  <>
    <Querier>
      <Header />
      <main>{props.children}</main>
      <Footer />
    </Querier>
  </>
)

export default PublicLayout
