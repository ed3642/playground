import { Card } from '@/components/ui/card'

interface WorkCardProps {
  title?: string
  description?: string
  image_path?: string
}

const WorkCard: React.FC<WorkCardProps> = ({ title = '', description = '', image_path = '' }) => {
  return (
    <Card
      className="relative h-64 w-64 bg-cover bg-center"
      style={{ backgroundImage: `url(${image_path})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4">
        <h2 className="text-white text-xl font-bold">{title}</h2>
        <p className="text-white text-sm truncate">{description}</p>
      </div>
    </Card>
  )
}

export default WorkCard
