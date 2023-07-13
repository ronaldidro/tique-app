import { Button, Flex, Heading, Image, Stack, Text } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { forwardRef, useImperativeHandle, useState } from 'react'
import AppLogo from '../AppLogo'
import SignInForm from './SignInForm'
import SignUpForm from './SignUpForm'

const labels = {
  signin: {
    header: 'Inicia sesión para ingresar a tu tienda',
    question: '¿No tienes una cuenta? ',
    option: 'Regístrate'
  },
  signup: {
    header: 'Registra tu cuenta para crear tu tienda',
    question: '¿Ya tienes una cuenta? ',
    option: 'Inicia sesión'
  }
}

const LoginForm = forwardRef(({ handleSignIn, handleSignUp }, ref) => {
  const [isSignIn, setIsSignIn] = useState(true)
  const { header, question, option } = labels[isSignIn ? 'signin' : 'signup']

  useImperativeHandle(ref, () => {
    return { setIsSignIn }
  })

  return (
    <Stack minH="100vh" direction={{ base: 'column', md: 'row' }}>
      <Flex flex={1} align="center" justify="center" p={8}>
        <Stack spacing={4} w="full" maxW="md">
          <AppLogo />
          <Heading fontSize="xl" pb={[0, 4]}>
            {header}
          </Heading>
          {isSignIn ? <SignInForm onSubmit={handleSignIn} /> : <SignUpForm onSubmit={handleSignUp} />}
          <Text align="center">
            {question}
            <Button variant="link" colorScheme="blue" onClick={() => setIsSignIn(!isSignIn)}>
              {option}
            </Button>
          </Text>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt="Login Image"
          objectFit="cover"
          src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1474&q=80"
        />
      </Flex>
    </Stack>
  )
})

LoginForm.displayName = 'LoginForm'

LoginForm.propTypes = {
  handleSignIn: PropTypes.func,
  handleSignUp: PropTypes.func
}

export default LoginForm
