import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '../Styles/colors'
import CartItem from '../Components/CartItem'
import { PRODUCTSSELECTED } from '../Data/productsSelected';
import { useDispatch, useSelector } from 'react-redux';
/* import { confirmPurchase } from '../features/cart'; */
import { SafeAreaView } from 'react-native-safe-area-context';

const handleDelete = (id) => console.log(`Se elimina del carrito el producto con id: ${id}`);
const handleConfirm = () => console.log("Se confirma la compra");

const renderItem = (data) => (
    <CartItem item={data.item} onDelete={handleDelete} />
)

const CartScreen = () => {
    const dispatch = useDispatch()
    const { cart } = useSelector(state => state.cart.value)
    console.log(cart);

    /* const total = 12000; */
    const total = cart.reduce((prev, current) => (prev.price*prev.quantity) + (current.price*current.quantity),0)
    console.log('reduce  ', total)

    return (
        
        <View style={styles.container}>
            <View style={styles.list}>
            
                <FlatList
                    data={cart}
                    keyExtractor={item => item.id}
                    renderItem={renderItem}
                />
                
                
            </View>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.confirm} onPress={handleConfirm}>
                    <Text>Confirmar</Text>
                    <View style={styles.total}>
                        <Text style={styles.text}>Total</Text>
                        <Text style={styles.text}>${total}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
       
    )
}

export default CartScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: colors.grisMarron,
        paddingBottom: 120,
    },
    list: {
        /* flex: 0.7, */
        color:'white',
        
    },
    
    footer: {
        padding: 12,
        borderTopColor: colors.beige,
        borderTopWidth: 1,
    },
    confirm: {
        backgroundColor: colors.beige,
        borderRadius: 10,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    total: {
        flexDirection: 'row',
    },
    text: {
        fontSize: 18,
        fontFamily: 'LatoRegular',
        padding: 8,
        
    }
})