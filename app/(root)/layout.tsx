import Navbar from "@/components/Navbar"
import NextTopLoader from "nextjs-toploader"

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <NextTopLoader color="#ff4393"/>
      <Navbar />
      {children}
    </div>
  )
}

export default layout