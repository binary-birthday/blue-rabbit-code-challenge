import NextImage from 'next/image'
import NextLink from 'next/link'
import {
  Box,
  List,
  ListItem,
  ListIcon,
  LinkBox,
  LinkOverlay,
} from '@chakra-ui/layout'

import {
  FiHome,
	FiUsers,
  FiUserPlus,
} from 'react-icons/fi'

const navMenu = [
  {
    name: 'Home',
    icon: FiHome,
    route: '/',
  },
  {
    name: 'Add New User',
    icon: FiUserPlus,
    route: '/newUser',
  },
]

const Sidebar = () => {
  return (
    <Box
      width="100%"
      height="100vh"
      bg="black"
      paddingX="5px"
      color="gray"
    >
      <Box paddingY="20px" height="100%">
        <Box width="120px" marginBottom="20px" paddingX="20px">
          <NextImage src="/vercel.svg" height={60} width={120} />
        </Box>
        <Box marginBottom="20px">
          <List spacing={2}>
            {navMenu.map((menu) => (
              <ListItem paddingX="20px" fontSize="16px" key={menu.name}>
                <LinkBox>
                  <NextLink href={menu.route} passHref>
                    <LinkOverlay>
                      <ListIcon
                        as={menu.icon}
                        color="white"
                        marginRight="20px"
                      />
                      {menu.name}
                    </LinkOverlay>
                  </NextLink>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  )
}

export default Sidebar