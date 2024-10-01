import { Linkedin } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const SocialIcons = () => {
  return (
    <div>
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
  )
}

export default SocialIcons
