import { NavBar } from '@/components/navbar'

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="">
      <main>{children}</main>
    </div>
  )
}

export default MarketingLayout
