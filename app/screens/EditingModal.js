import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, Pressable, KeyboardAvoidingView, Modal} from 'react-native';
import colors from '../config/colors';
import Item from '../config/ItemClass';

export default function EditingModal({navigation, route}) {
    const {item, filteredItems, setFilteredItems, fullItemList, setFullItemList} = route.params;
    const [enteredQuantityText, setEnteredQuantityText] = useState(0)
    const [enteredExpirationText, setEnteredExpirationText] = useState('') // string for now, need to add expiration warning later
    const [enteredStockAlert, setStockAlert] = useState(false)
    const [onButtonStyle, setOnButtonStyle] = useState(styles.stockOnButton);
    const [offButtonStyle, setOffButtonStyle] = useState(styles.stockOffButton);
    console.log('Editing Filterd: ' + filteredItems.length)
    console.log('Editing Original: ' + fullItemList.length)

 
    function quantityInputHandler(enteredText) {
        if(enteredText == '') {
            setStockAlert(item.itemQuantity)
        } else {
        setEnteredQuantityText(enteredText)
        }
    }

    function expirationInputHandler(enteredText) {
        if(enteredText == '') {
            setStockAlert(item.itemExpiration)
        } else {
        setEnteredExpirationText(enteredText)
        }
    }

    function stockAlertInputHandler(enteredText) {
        if(enteredText == '') {
            setStockAlert(item.itemStockAlert)
        } else {
        setStockAlert(enteredText)
        }
    }

    function onButtonHandler() {
        setOnButtonStyle(styles.stockOnButtonSelected)
        setOffButtonStyle(styles.stockOffButton)
        
    }

    function offButtonHandler() {
        setOnButtonStyle(styles.stockOnButton)
        setOffButtonStyle(styles.stockOffButtonSelected)
    }

    const editItem = (quantity, expiration, stockAlert) => {
        const updatedItem = new Item(item.location, item.itemName, parseInt(quantity), expiration, JSON.parse(stockAlert))

        const updatedItems = fullItemList.map((oldItem) =>
        oldItem.itemName === item.itemName && oldItem.location === item.location ? updatedItem : oldItem)
      
        const updatedFilteredItems = filteredItems.map((oldItem) =>
        oldItem.itemName === item.itemName ? updatedItem : oldItem)

        setFullItemList(updatedItems)
        setFilteredItems(updatedFilteredItems)

    }

    return(
    <View style={styles.container}>
        <Modal
        transparent={true}
        visible={true}>
            <View style={styles.modalBackgroundView}>
                <View style={styles.modalView}>
                    <Text style={{fontSize: 20, fontWeight: 'bold', top: '0%'}}>{item.itemName}</Text>

                    <Text>Current Quantity: {item.itemQuantity}</Text>
                    <TextInput style={styles.textInput} placeholder = 'Change Quantity'
                               onChangeText={quantityInputHandler}/>

                    <Text>Current Expiration: {item.itemExpiration}</Text>
                    <TextInput style={styles.textInput} placeholder = 'Change Expiration'
                               onChangeText={expirationInputHandler}/>
                    
                    <Text>Low Stock Alert: {item.itemStockAlert ? 'On':'Off'}</Text>
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
                               onPress={() => {editItem(enteredQuantityText, enteredExpirationText, enteredStockAlert), navigation.goBack()}}>
                               <Text style={{fontSize: 15, fontWeight: 'bold'}}>Confirm</Text>
                    </Pressable> 

                    <Pressable style={styles.deleteButton} 
                               onPress={() => {navigation.goBack()}}>
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
        width: '75%',
        height: '70%',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
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
        width: '25%',
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
        width: '25%',
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
        width: '25%',
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
        width: '25%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
})







