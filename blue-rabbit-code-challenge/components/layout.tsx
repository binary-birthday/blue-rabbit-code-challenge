import { Box } from '@chakra-ui/layout'
import Sidebar from './sidebar'

const Layout = ({ children }) => {
  return (
    <Box width="100vw" height="100vh">
      <Box position="absolute" top="0" width="250px" left="0">
        <Sidebar />
      </Box>
      <Box marginLeft="250px">
        <Box height="100vh">{children}</Box>
      </Box>
    </Box>
  )
}

export default Layout