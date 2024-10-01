import SocialIcons from './social-icons'

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-slate-900 text-white p-4 flex justify-center mt-12">
      <div className="flex space-x-4">
        <SocialIcons />
      </div>
    </footer>
  )
}

export default Footer
