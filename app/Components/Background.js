import React from 'react'
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native'
import colors from '../config/colors'

export default function Background({ children }) {
  return (
    <View style={styles.background}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        {children}
      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.overlay,
  },
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
})