import { Card } from '@/components/ui/card'
import Link from 'next/link'

interface WorkCardProps {
  title?: string
  description?: string
  image_path?: string
  link?: string
}

const WorkCard: React.FC<WorkCardProps> = ({
  title = '',
  description = '',
  image_path = '',
  link,
}) => {
  const cardContent = (
    <Card
      className="relative h-96 w-72 bg-cover bg-top"
      style={{ backgroundImage: `url(${image_path})` }}
    >
      <div className="absolute inset-0 flex flex-col justify-end">
        <div className="bg-gradient-to-t from-slate-900 via-slate-900/90 to-transparent p-3 pt-16">
          <h2 className="text-white text-xl font-bold">{title}</h2>
          <p className="text-white text-sm">{description}</p>
        </div>
      </div>
    </Card>
  )

  return link ? (
    <Link href={link} target="_blank">
      {cardContent}
    </Link>
  ) : (
    cardContent
  )
}

export default WorkCard
