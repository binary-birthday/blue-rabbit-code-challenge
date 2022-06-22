import { useState, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { gql, useMutation } from '@apollo/client'
import { useDropzone } from 'react-dropzone'
import {
  Flex,
  Text,
  Spinner,
  Alert,
  AlertIcon,
  AlertDescription,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'


const CreateUserMutation = gql`
  mutation($name: String!, $avatar: String) {
    createUser(name: $name, avatar: $avatar) {
      name
      avatar
    }
  }
`

export default function NewUser() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [fileUploadError, setFileUploadError] = useState(null)
  const [message, setMessage] = useState(null)
  const [fileName, setFileName] = useState(null)
  const [createUser, { data, loading, error }] = useMutation(CreateUserMutation)
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles?.[0]

    if (!file) {
      return
    }

    setIsLoading(true)
    setFileUploadError(null)
    setMessage(null)

    try {
      const filename = encodeURIComponent(file.name)
      setFileName(filename)
      const res = await fetch(`/api/imageUpload?file=${filename}`)
      const data = await res.json()
      const formData = new FormData()
      
      Object.entries({ ...data.fields, file }).forEach(([key, value]) => {
        formData.append(key, value)
      })
      await fetch(data.url, {
        method: 'POST',
        body: formData,
      })
    } catch (e) {
      setIsLoading(false)
      setFileUploadError(e.message)
      return
    }

    setIsLoading(false)
    setMessage('File ready for import 👍')
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  async function onSubmit(data) {
    const avatar = `https://blue-rabbit-code-challenge.s3.amazonaws.com/${fileName}`
    const variables = { name: data.name, avatar: fileName ? avatar : undefined }
    try {
      await createUser({ variables });
      router.push("/")
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Flex
      justify="center"
      align="center"
      h="75vh"
      maxH="100vh"
      flexDirection="column"
    >
      <Text fontSize='4xl' color="teal">
        Add a new user
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.name}>
          <Input
            id='name'
            placeholder='Enter your name'
            size="lg"
            variant='filled'
            m={2}
            w={300}
            {...register('name', {
              required: 'This is required',
              minLength: { value: 1, message: 'Minimum length should be 1' },
            })}
            />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>
        <Flex
          bg="#f5f5f5"
          w={300}
          h={300}
          justify="center"
          align="center"
          borderRadius={5}
          textAlign="center"
          m={2}
          {...getRootProps()}
        >
        <input 
          {...getInputProps()} 
          // {...register('avatar')}
        />
        {isLoading ? (
          <Spinner />
          ) : isDragActive ? (
            <Text>Drop the files here...</Text>
          ) : (
            <Text>Drag and drop, or click here to add your avatar</Text>
          )
        }
      </Flex>
      {(error || message) && (
        <Alert
        status={error ? 'error' : 'success'}
          w={300}
          borderRadius={5}
          m={2}
          >
          <AlertIcon />
          <AlertDescription w={200}>{error || message}</AlertDescription>
        </Alert>
      )}
      <Button m={2} colorScheme='teal' isLoading={isSubmitting} type='submit' w={300}>
        Submit
      </Button>
    </form>
    </ Flex>
  )
}