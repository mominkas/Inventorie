import { useState } from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, ScrollView, Pressable, Alert, Dimensions} from 'react-native';
import colors from '../config/colors';

var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;
// var scrollHeight = height/4;


export default function MainScreen(props) {
    const [enteredLocationText, setEnteredLocationText] = useState('');
    const [locations, setLocationSet] = useState(new Set());
    const setToArr = [...locations]

    function locationInputHandler(enteredText) {
        setEnteredLocationText(enteredText);
    }
    function addLocationHandler() {
        if (!locations.has(enteredLocationText)) {
            // console.log(scrollHeight);
            setLocationSet(currentLocationMap => new Set([...currentLocationMap, enteredLocationText])); 
            // scrollHeight = scrollHeight + (height*0.2);
        } else {
            Alert.alert("Location Already Added", "Please add a new location",
                [{ text: "OK"}])
        }
        
    }
    return (
        <View style={styles.container}>
          
            <Text style={styles.welcomeText}>Hello,
                <Text style={styles.nametext}> Momin!</Text>
            </Text>
            
            <View style={styles.overlay}>
                
               <View style={styles.textInputBackground}>
                    <TextInput 
                        style={styles.textInput} 
                        placeholder = 'Add a location'
                        onChangeText={locationInputHandler}
                    />

                    <Pressable style={styles.button} onPress={addLocationHandler}>
                        <Text style={styles.text}>Enter</Text>
                    </Pressable>

               </View>
               
                <ScrollView contentContainerStyle={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    width: '100%',
                    flexGrow: 0,
                    paddingBottom: '35%',
                    // alignItems: 'flex-end',
                    backgroundColor: colors.overlay,
                }}>
                    {setToArr.map((location) => 
                        <Pressable style={styles.locationDisplay} key={location}>
                            <Text>
                                {location}
                            </Text>
                        </Pressable>)}

                </ScrollView>
               

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
        fontSize: 20,
        top: '10%',
        left: '5%'
    },

    nametext: {
        fontSize: 20,
        fontWeight: 'bold',
    },

    overlay: {
        top: '20%',
        width: '100%',
        flex: 1,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: colors.overlay,
    },

    textInputBackground: {
        top: '0%',
        height: '8%',
        width: '100%',
        alignItems: 'flex-end',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        justifyContent: 'space-evenly',
        marginBottom: '4%',
        backgroundColor: colors.overlay,

    },

    textInput: {
        position: 'absolute',
        top: '15%',
        left: '5%',
        borderWidth: 3,
        borderColor: '#daa520',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        width: '75%',
        height: '80%',
        textAlign: 'center',
    },

    button: {
        position: 'absolute',
        top: '15%',
        right: '5%',
        backgroundColor: colors.background,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        width: '12%',
        height: '80%',
        justifyContent: 'center',
        alignItems: 'center',

    },

    locationDisplay: {
        backgroundColor: colors.background,
        height: height/4,
        width: '40%',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: '5%',
        marginLeft: '5%',
        marginBottom: '8%',
        borderWidth: 4,
        borderColor: 'indigo',
    },


})