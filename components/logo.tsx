import Link from 'next/link'
import Image from 'next/image'

export const Logo: React.FC = () => {
  return (
    <Link href="/">
      <div className="hover:opacity-75 transition items-center gap-x-2 hidden md:flex">
        <Image src="/logo1.png" alt="Logo" height={30} width={30} />
        <p className="text-lg text-gray-200 pb-1">ed3642dev</p>
      </div>
    </Link>
  )
}

export default Logo
