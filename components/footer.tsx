import { Linkedin } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-slate-900 text-white p-4 flex justify-center mt-12">
      <div className="flex space-x-4">
        <Link href="https://www.linkedin.com/in/eduardo-san-martin-celi/" target="_blank">
          <Linkedin color="white" size={24} />
        </Link>
        <Link href="https://github.com/ed3642" target="_blank">
          <Image
            src="/media/github-mark-white.svg"
            width={24}
            height={24}
            alt="Github logo"
            className="text-white"
          />
        </Link>
      </div>
    </footer>
  )
}

export default Footer
