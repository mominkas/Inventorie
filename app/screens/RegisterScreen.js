import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../Components/Background'
import Logo from '../Components/Logo'
import Header from '../Components/Header'
import Button from '../Components/Button'
import TextInput from '../Components/TextInput'
import BackButton from '../Components/BackButton'
import { theme } from '../config/theme'


export default function RegisterScreen({ navigation }) {
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const registerUser = async (username, password) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
          locations: [],
          items: [],
        }),
      });
        
  
      if (!response.ok) {
        Alert.alert("This username is taken", "Please enter a different username",
                [{ text: "OK"}])
            return
        }
      
      const data = await response.json();
      console.log(data.message);
      navigation.replace('Login Screen')
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Create Account</Header>
      <TextInput
        label="User Name"
        returnKeyType="next"
        value={username}
        onChangeText={(text) => setUserName(text)}

        autoCapitalize="none"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <Button
        mode="contained"
        onPress={() => registerUser(username, password)}
        style={{ marginTop: 24 }}
      >
        Sign Up
      </Button>
      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('Login Screen')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})