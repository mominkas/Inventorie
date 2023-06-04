import { useState, useEffect } from 'react'
import { StyleSheet, Text, View, StatusBar, TextInput, ScrollView, Pressable, Alert, Dimensions, SafeAreaView} from 'react-native'
import colors from '../config/colors'
import { greetingUser } from './LoginScreen'

export var height = Dimensions.get('window').height
export var width = Dimensions.get('window').width
// var scrollHeight = height/4;


export default function MainScreen({navigation}) {
    const [enteredLocationText, setEnteredLocationText] = useState('')
    const [locations, setLocationSet] = useState(new Set())
    const [items, setItemsList] = useState()
    const setToArr = [...locations]

    useEffect(() => {
        // Call the updateLists function whenever the items list changes
        updateLists(greetingUser, Array.from(locations), items);
      }, [items]);

      useEffect(() => {
        // Fetch items and locations when the component mounts
        getItemsAndLocations();
      }, []);




    function getItemsAndLocations() {
        const username = greetingUser; // Add the username here
    
        fetch(`http://127.0.0.1:5000/items?username=${username}`)
          .then(response => response.json())
          .then(data => {
            if (data.items && data.locations) {
              setLocationSet(new Set(data.locations));
              setItemsList(data.items);
            }
          })
          .catch(error => {
            console.error('Error:', error);
          });
      }

    function updateLists(username, locations) {
        fetch('http://127.0.0.1:5000/update_lists', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            locations: locations,
            items: items,
          }),
        })
          .then(response => response.json())
          .then(data => {
            console.log(data.message); // Lists updated successfully
          })
          .catch(error => {
            console.error('Error:', error);
          })
    }
    

    function locationInputHandler(enteredText) {
        setEnteredLocationText(enteredText);
    }
    function addLocationHandler() {
        if (enteredLocationText == '') {
            Alert.alert("This field cannot be empty", "Please enter a valid location name",
                [{ text: "OK"}])
            return
        }
        if (!locations.has(enteredLocationText)) {
            setLocationSet(currentLocationMap => new Set([...currentLocationMap, enteredLocationText]));
            setEnteredLocationText('')
            updateLists(greetingUser, Array.from(locations));

        } else {
            Alert.alert("Location Already Added", "Please add a new location",
                [{ text: "OK"}])
        }
    }



    return (
        <SafeAreaView style={styles.container}>
          
            <Text style={styles.welcomeText}>Hello,
                <Text style={styles.nametext}> {greetingUser}!</Text>
            </Text>
            
            <View style={styles.overlay}>
                
               <View style={styles.textInputBackground}>
                    <TextInput 
                        style={styles.textInput} 
                        placeholder = 'Add a location'
                        onChangeText={locationInputHandler}
                        value={enteredLocationText}
                        
                    />

                    <Pressable style={styles.button} onPress={addLocationHandler}>
                        <Text style={{fontSize: 15,
                                      fontWeight: 'bold'}}>Enter</Text>
                    </Pressable>

               </View>
               
                <ScrollView contentContainerStyle={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    width: '100%',
                    flexGrow: 0,
                    paddingBottom: '35%',
                    backgroundColor: colors.background,
                }}>
                    {setToArr.map((location) => 
                        <Pressable style={styles.locationDisplay} key={location} onPress={() => navigation.navigate('Inventory Screen', {items, setItemsList, location})}>
                            <Text style={{fontSize: 20, alignItems: 'center', justifyContent: 'center'}}>
                                {location}
                            </Text>
                        </Pressable>)}

                </ScrollView>
               
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.overlay,
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
        backgroundColor: colors.background,
    },

    textInputBackground: {
        top: '0%',
        height: '10%',
        width: '100%',
        alignItems: 'flex-end',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        justifyContent: 'space-evenly',
        marginBottom: '4%',
        backgroundColor: colors.background,

    },

    textInput: {
        position: 'absolute',
        top: '15%',
        left: '5%',
        borderWidth: 3,
        borderColor: 'black',
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
        borderWidth: 2,
        borderColor: 'black',
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
        borderColor: 'black',
    },


})