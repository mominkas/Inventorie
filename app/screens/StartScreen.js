import React from 'react'
import Background from '../Components/Background'
import Logo from '../Components/Logo'
import Header from '../Components/Header'
import Button from '../Components/Button'
import Paragraph from '../Components/WelcomeText'

export default function StartScreen({ navigation }) {
  return (
    <Background>
      <Logo />
      <Header>Welcome!</Header>
      <Paragraph>
        Please LogIn or SignUp to continue
      </Paragraph>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('Login Screen')}
      >
        Login
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('Register Screen')}
      >
        Sign Up
      </Button>
    </Background>
  )
}