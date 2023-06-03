import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, ScrollView, Pressable, Alert, KeyboardAvoidingView, Modal} from 'react-native';
import colors from '../config/colors';
import { height } from './MainScreen';
import Item from '../config/ItemClass';


export default function InventoryScreen({navigation, route}) {
    const { items, setItemsList, location } = route.params; 
    const [fullItemList, setFullItemList] = useState(items)
    const [filteredItems, setFilteredItems] = useState([]) 

    const [enteredNameText, setEnteredNameText] = useState('')
    const [enteredQuantityText, setEnteredQuantityText] = useState(0)
    const [enteredExpirationText, setEnteredExpirationText] = useState('') // string for now, need to add expiration warning later
    const [enteredStockAlert, setStockAlert] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [onButtonStyle, setOnButtonStyle] = useState(styles.stockOnButton);
    const [offButtonStyle, setOffButtonStyle] = useState(styles.stockOffButton);
    console.log('filtered: ' + filteredItems.length)
    console.log('full: ' + fullItemList.length)
    console.log('original ' + items.length)

    useEffect(() => {
       const filtered = fullItemList.filter((item) => item.location === location)
       setFilteredItems(filtered)}, [items])


    function nameInputHandler(enteredText) {
        setEnteredNameText(enteredText)
    }

    function quantityInputHandler(enteredText) {
        setEnteredQuantityText(enteredText)
    }

    function expirationInputHandler(enteredText) {
        setEnteredExpirationText(enteredText)
    }

    function stockAlertInputHandler(enteredText) {
        setStockAlert(enteredText)
        console.log(enteredText)
    }

    function onButtonHandler() {
        setOnButtonStyle(styles.stockOnButtonSelected)
        setOffButtonStyle(styles.stockOffButton)
        
    }

    function offButtonHandler() {
        setOnButtonStyle(styles.stockOnButton)
        setOffButtonStyle(styles.stockOffButtonSelected)
    }

    function checkOnOff(bool) {
        if(bool == true) {
            return styles.alertOnStyle
        } else return styles.alertOffStyle
    }

    const createItem = (name, quantity, expiration, lowStockAlert) => {
        const existingItemIndex = items.findIndex(item => item.itemName === name);
        if (name == "" || quantity == "") {
            Alert.alert(
                "Please Enter A Name and Quantity",
                "These fields cannot be emtpy ",
                [{ text: "OK" }]
            )
            return;
        }
        if (isNaN(parseInt(quantity))) {
            Alert.alert(
                "Please Enter a Valid Quantity",
                "Quantity has to be a number",
                [{ text: "OK" }]
            )
            return
        }

    const newItem = new Item(location, name, parseInt(quantity), expiration, JSON.parse(lowStockAlert));
    setItemsList(prevItems => [...prevItems, newItem])
    setFullItemList(prevItems => [...prevItems, newItem])
    setFilteredItems(prevItems => [...prevItems, newItem])
    setEnteredNameText([])
    setEnteredQuantityText([])
    setEnteredExpirationText([])
    setOnButtonStyle(styles.stockOnButton)
    setOffButtonStyle(styles.stockOffButton)

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
                            <Pressable style={styles.itemDisplay} key={index} onPress={() => navigation.navigate('Editing Screen', {item, filteredItems, setFilteredItems, fullItemList, setFullItemList})}>

                                <Text style={styles.itemText}>{item.itemName}</Text>

                                <Text style={styles.itemText}> qty: {item.itemQuantity} </Text>

                                <Text style={styles.itemText}>Exp: {item.itemExpiration}</Text>

                                <View style={checkOnOff(item.itemStockAlert)}>
                                    <Text>{item.itemStockAlert ? 'On' : 'Off'}</Text>
                                </View>    

                            </Pressable>)}
                        </View>
        </ScrollView>





        <View style={styles.bottomTab}>

            <Pressable style={styles.addItemsButton}
                       onPress={() => setModalVisible(true)}>
                            <Text style={{fontSize: 15, fontWeight: 'bold'}}>Add Items</Text>
            </Pressable>

            <Pressable style={styles.deleteButton}
                       onPress={() => console.log('Delete Items')}>
                            <Text style={{fontSize: 15, fontWeight: 'bold', color: colors.background}}>Delete Items</Text>
            </Pressable>

        </View>



        <Modal
        transparent={true}
        visible={modalVisible}>
            <View style={styles.modalBackgroundView}>
                <View style={styles.modalView}>
                    <Text style={{fontSize: 20, fontWeight: 'bold', top: '0%'}}>Item Details</Text>

                    <Text>Name</Text>
                    <TextInput style={styles.textInput} placeholder = 'What am I called?'
                               onChangeText={nameInputHandler}/>
       
                    <Text>Quantity</Text>
                    <TextInput style={styles.textInput} placeholder = 'How many?'
                               onChangeText={quantityInputHandler}/> 
                        
                             

                    <Text>Expiration Date</Text>
                    <TextInput style={styles.textInput} placeholder = 'DD-MM-YYYY'
                               onChangeText={expirationInputHandler}/>
                    
                    <Text>Low Stock Alert</Text>
                    <View style={styles.stockButtonContainer}>
                    <Pressable style={onButtonStyle}
                               onPress={() => {stockAlertInputHandler(true), onButtonHandler()}}>
                               <Text>ON</Text>
                    </Pressable>
                    <Pressable style={offButtonStyle}
                               onPress={() => {stockAlertInputHandler(false), offButtonHandler()}}>
                        <Text>OFF</Text>
                    </Pressable>
                    </View>
                             
                    <View style={styles.enterButtonBackground}>
                    <Pressable style={styles.addItemsButton} 
                               onPress={() => {createItem(enteredNameText, enteredQuantityText, enteredExpirationText, enteredStockAlert)
                               setModalVisible(false)}}>
                               <Text style={{fontSize: 15, fontWeight: 'bold'}}>Enter</Text>
                    </Pressable> 

                    <Pressable style={styles.deleteButton} 
                               onPress={() => {setModalVisible(false), 
                               setOnButtonStyle(styles.stockOnButton), 
                               setOffButtonStyle(styles.stockOffButton)}}>
                               <Text style={{fontSize: 15, fontWeight: 'bold', color: colors.background}}>Cancel</Text>
                    </Pressable> 
                    
                    </View>
                     

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
        flex: 1,
    },

    modalView: {
        backgroundColor: colors.background,
        width: '90%',
        height: '75%',
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
        flexDirection: 'row',
        backgroundColor: colors.overlay,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
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

    addItemsButton: {
        backgroundColor: colors.background,
        height: '80%',
        width: '40%',
        marginVertical: 10,
        marginHorizontal: 20,
        borderRadius: 10,
        borderWidth: 4,
        borderColor: colors.overlay,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
    },

    deleteButton: {
        backgroundColor: 'red',
        height: '80%',
        width: '40%',
        marginVertical: 10,
        marginHorizontal: 20,
        borderRadius: 10,
        borderWidth: 4,
        borderColor: colors.overlay,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
    },

    enterButtonBackground: {
        backgroundColor: colors.overlay,
        height: '15%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 10,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },

    stockButtonContainer: {
        backgroundColor: colors.background,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        justifyContent: 'center',
        flexDirection: 'row',
        width: '80%',
        height: '15%',
    },

    stockOnButton: {
        backgroundColor: 'lightgreen',
        height: '50%',
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },

    stockOffButton: {
        backgroundColor: 'red',
        height: '50%',
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },

    stockOnButtonSelected: {
        backgroundColor: 'darkgreen',
        borderWidth: 3,
        height: '50%',
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },

    stockOffButtonSelected: {
        backgroundColor: 'darkred',
        borderWidth: 3,
        height: '50%',
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },

    alertOnStyle: {
        backgroundColor: 'lightgreen',
        height: '70%',
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },

    alertOffStyle: {
        backgroundColor: 'red',
        height: '70%',
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    }

})