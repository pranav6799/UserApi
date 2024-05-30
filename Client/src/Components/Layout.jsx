import Headers from '../Util/Headers'
import { Toaster } from 'react-hot-toast'

// eslint-disable-next-line react/prop-types
const Layout = ({children}) => {
  return (
    <>
    <Headers></Headers>
    <main>
      <Toaster></Toaster>
    {children}
    </main>
   
    </>
  )
}

export default Layout
