import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import colors from '../config/colors';

function MainScreen(props) {
    return (
        <View style={styles.container}>

            <Text style={styles.welcomeText}>Hello,
                <Text style={styles.nametext}> Momin!</Text>
            </Text>

            <View style={styles.overlay}>
                <Text>Working Great for now</Text>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight:0,
    },

    welcomeText: {
        color: 'black',
        fontSize: 20,
        top: '10%',
        left: '5%'
    },

    nametext: {
        fontSize: 20,
        fontWeight: 'bold', 
    },

    overlay: {
        top: '30%',
        height: '100%',
        width: '100%',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.overlay,
        position: 'absolute',
    },
});

export default MainScreen;