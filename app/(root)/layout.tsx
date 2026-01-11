import Navbar from "@/components/Navbar"

const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <div>
        <Navbar/>
        {children}
    </div>
  )
}

export default layout