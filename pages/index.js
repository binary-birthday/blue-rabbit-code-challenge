import { useQuery } from '@apollo/client'
import { 
  Spinner, 
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription, 
} from '@chakra-ui/react'
import UserProfile from '../components/userProfile'
import GetUser from '../lib/getUser'


export default function Home() {
  const { data, loading, error } = useQuery(GetUser, {
    variables: { name: "Wade Martin"}
  })

  if (loading) return (
    <Spinner
      thickness='4px'
      speed='0.65s'
      emptyColor='gray.200'
      color='blue.500'
      size='xl'
    />
  )
  if (error) return (
    <Alert status='error'>
      <AlertIcon />
      <AlertTitle>Oh no!</AlertTitle>
      <AlertDescription>{error.message}</AlertDescription>
    </Alert>
  )

  return (
    <UserProfile
      avatar={data.user.avatar}
      name={data.user.name}
    />
  )
}
