import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, ScrollView, Pressable, Alert, Button, Modal} from 'react-native';
import colors from '../config/colors';
import { height } from './MainScreen';


export default function InventoryScreen({navigation, route}) {
    const { items, setItemsList, location } = route.params;
    const [enteredNameText, setEnteredNameText] = useState('')
    const [enteredQuantityText, setEnteredQuantityText] = useState(0)
    const [enteredExpirationText, setEnteredExpirationText] = useState('') // string for now, need to add expiration warning later
    const [modalVisible, setModalVisible] = useState(false);
    const [filteredItems, setFilteredItems] = useState([]);

    useEffect(() => {
      // Filter items whenever the 'items' array changes or the 'location' prop changes
      const filtered = items.filter((obj) => obj.location === location);
      setFilteredItems(filtered)}, [items, location])

    function nameInputHandler(enteredText) {
        setEnteredNameText(enteredText);
    }

    function quantityInputHandler(enteredText) {
        setEnteredQuantityText(enteredText);
    }

    function expirationInputHandler(enteredText) {
        setEnteredExpirationText(enteredText);
    }

    const createItem = (name, quantity, expiration) => {
        const existingItem = filteredItems.find(item => item.itemName === name);
        if (existingItem) {
            Alert.alert(
                "Item Already Added To This Location",
                "Please add a new item",
                [{ text: "OK" }]
            );
            return; 
        }
        if (name == "" || quantity == "") {
            Alert.alert(
                "Please Enter A Name and Quantity",
                "These fields cannot be emtpy ",
                [{ text: "OK" }]
            );
            return; 
        }
        const newItem = {
        location: location,
        itemName: name,
        itemQuantity: quantity,
        itemExpiration: expiration,
    }

    setItemsList(prevItems => [...prevItems, newItem])
    setFilteredItems(prevItems => [...prevItems, newItem])
    setEnteredNameText([])
    setEnteredQuantityText([])
    setEnteredExpirationText([])

}


    return (

    <View style={styles.container}>

        <View style={styles.topTab}>
            <View style={styles.overTopTab}>
                <View style={styles.topTopTab}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>{location}</Text>
                </View>
            </View>
            
        </View>
        
        <ScrollView style={{
                    width: '100%',
                    flex: 1,
                    paddingBottom: '20%',
                    backgroundColor: colors.background,}}>
                        <View style={styles.itemsContainer}>
                        {filteredItems.map((item, index) =>
                            <Pressable style={styles.itemDisplay} key={index} onPress={() => console.log("touched " + item.itemName)}>
                                <Text style={styles.itemText}>
                                    {item.itemName}
                                </Text>
                                <Text style={styles.itemText}>
                                    Quantity: {item.itemQuantity}
                                </Text>
                            </Pressable>)}
                        </View>
                
        </ScrollView>

        <View style={styles.bottomTab}>
            <Button
                title= 'Add Items'
                onPress={() => setModalVisible(true)}
            />
        </View>

        <Modal
        transparent={true}
        visible={modalVisible}>
            <View style={styles.modalBackgroundView}>
                <View style={styles.modalView}>
                    <Text style={{fontSize: 20, fontWeight: 'bold', top: '0%'}}>Item Details</Text>

                    <Text>Name: </Text>
                    <TextInput style={styles.textInput} placeholder = 'What am I called?'
                               onChangeText={nameInputHandler}/>
       
                    <Text>Quantity: </Text>
                    <TextInput style={styles.textInput} placeholder = 'How many?'
                               onChangeText={quantityInputHandler}/> 
                        
                             

                    <Text>Expiration Date: </Text>
                    <TextInput style={styles.textInput} placeholder = 'DD/MM/YYYY'
                               onChangeText={expirationInputHandler}/>
                             

                    <Button 
                    title= "Enter"
                    onPress={() => {createItem(enteredNameText, enteredQuantityText, enteredExpirationText)
                                    setModalVisible(false)}}/>     

                </View>
            </View>
        </Modal>
    </View>
    );
    
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight:0,
    },

    modalBackgroundView: {
        backgroundColor: "#000000aa",
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },

    modalView: {
        backgroundColor: colors.background,
        width: '80%',
        height: '50%',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },

    bottomTab: {
        height:'10%',
        width: '100%',
        alignItems:'center',
        backgroundColor: colors.overlay,
    },

    topTab: {
        right: '20%',
        height:'10%',
        width: '100%',
        alignItems: 'center',
        backgroundColor: colors.overlay,
        borderTopRightRadius: 100,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 100,

    },

    overTopTab: {
        width: '90%',
        height:'80%',
        top: '10%',
        alignItems:'center',
        backgroundColor: 'slateblue',
        borderTopRightRadius: 100,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 100,

    },

    topTopTab: {
        width: '90%',
        height:'80%',
        top: '10%',
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor: colors.background,
        borderTopRightRadius: 100,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 100,

    },

    itemDisplay: {
        backgroundColor: colors.overlay,
        height: height / 12,
        marginVertical: 10,
        marginHorizontal: 20,
        borderRadius: 10,
        borderWidth: 4,
        borderColor: colors.overlay,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
    },

    itemText: {
        fontSize: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
      },

    textInput: {
        borderWidth: 3,
        backgroundColor: colors.overlay,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        width: '80%',
        height: '15%',
        textAlign: 'center',
    },



    

})