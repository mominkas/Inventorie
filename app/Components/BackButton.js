import React from 'react'
import { TouchableOpacity, Image, StyleSheet, Pressable } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'

export default function BackButton({ goBack }) {
  return (
    <Pressable onPress={() => goBack()} style={styles.container}>
      <Image
        style={styles.image}
        source={require('../assets/arrow_back.png')}
      />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '6%',
    left: 4,
  },
  image: {
    width: 24,
    height: 24,
  },
})