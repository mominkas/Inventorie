import { useState } from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../Components/Background'
import Logo from '../Components/Logo'
import Header from '../Components/Header'
import Button from '../Components/Button'
import TextInput from '../Components/TextInput'
import BackButton from '../Components/BackButton'
import { theme } from '../config/theme'

export var itemsList = []
export var locationsList = []
export var greetingUser = ''

export default function LoginScreen({ navigation }) {
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    
    // Function to handle login
function handleLogin(enteredUsername, enteredPassword) {
    // Make a POST request to the login endpoint
    fetch('http://127.0.0.1:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: enteredUsername,
        password: enteredPassword,
    
      }),
    })
      .then(response => response.json())
      .then(data => {
        // Handle the login response
        if (data.message === 'Login successful') {
          retrieveItems(enteredUsername, enteredPassword)
        } else {
          // Login failed
          console.log('Did not login :((')
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }



  // Function to retrieve items
function retrieveItems(username, password) {  
    // Make a GET request to the items endpoint
    fetch(`http://127.0.0.1:5000/items?username=${username}&password=${password}`)
      .then(response => response.json())
      .then(data => {
        // Handle the items response
        if (data.message === 'Invalid username or password') {
          // Authentication failed
          console.log('Invalid username or password');
        } else {
          // Retrieve the items and locations
          const locations = data.locations // Parse the locations string to an array
          const items = data.items
          greetingUser = username
          itemsList = items
          locationsList = locations
          navigation.navigate('Main Screen')
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }



    return (
        <Background>
            <BackButton goBack={navigation.goBack} />
            <Logo />
        <Header>Welcome back.</Header>
        <TextInput
          label="Username"
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
        <Button mode="contained" onPress={() => handleLogin(username, password)}>
          Login
        </Button>
        <View style={styles.row}>
          <Text>Don’t have an account? </Text>
          <TouchableOpacity onPress={() => navigation.replace('Register Screen')}>
            <Text style={styles.link}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </Background>
    )
  }
  
  const styles = StyleSheet.create({
    forgotPassword: {
      width: '100%',
      alignItems: 'flex-end',
      marginBottom: 24,
    },
    row: {
      flexDirection: 'row',
      marginTop: 4,
    },
    forgot: {
      fontSize: 13,
      color: theme.colors.secondary,
    },
    link: {
      fontWeight: 'bold',
      color: theme.colors.primary,
    },
  })


