import { Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React, {useState} from 'react'
import { colors } from '../Styles/colors';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch } from 'react-redux';
import {addLocation, addLocationDb} from '../features/locations'
import LocationButton from '../Components/LacationButton';


const SaveLocationScreen = ({navigation, route}) => {
  const [title, setTitle] = React.useState("")
  const [picture, setPicture] = React.useState("")
  const [errorMsg, setErrorMsg] = useState(null);
  const params = route.params;
  console.log(params?.address);

  const dispatch = useDispatch();

  const handlePickLibrary = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setPicture(result.uri);
    }
  }

  const getPermission = async () => {
    const { status } = await ImagePicker.getCameraPermissionsAsync()
    console.log('status del permiso de camara',status);
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return false
    }
    return true
  }

  const handleTakePicture = async () => {
    const isVerified = getPermission()
    if (!isVerified) {
      return
    }

    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    })

    console.log(image);
    setPicture(image.uri);
  }

  // Requiere foto y titulo
  const handleConfirm = async () => {
    if (title && picture) {
    let id = Date.now()
    dispatch(addLocation({title, picture, id, address:params?.address}))
    dispatch(addLocationDb({title, picture, id, address:params?.address}))
    setTitle("");
    setPicture("");
    }
  }  

  const handleSetLocation = () => {
    navigation.navigate("Set-location");
  }
 
  const handleLocation = () => {
    navigation.navigate("Get-location")
  }

  return (
    <View style={styles.container}>
      <Text style={{color:'white'}}>Nueva dirección</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Título"
        placeholderTextColor="white"
        style={styles.input}
      />
      {picture ?
        <Image
        source={{ uri: picture }}
        style={styles.image}
        />
        : null
      }
      <LocationButton  title='Tomar una foto' onPress={handleTakePicture}/>
      <LocationButton title="Seleccionar de la galería" onPress={handlePickLibrary} />
      <LocationButton title="Obtener ubicación" onPress={handleLocation} />
      <LocationButton title="Definir una ubicación" onPress={handleSetLocation}/> 
      <LocationButton title="Confirmar" onPress={handleConfirm}/>
    </View>
  )
}

export default SaveLocationScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
    backgroundColor: colors.grisMarron,
  },
  image: {
    width: '90%',
    height: 200,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: colors.lightBlue,
  },
  titleLocation:{
    color:'white',
    
    fontSize:36,
    marginBottom:15,
  },
  input: {
    color: 'white',
    textAlign:'center',
    padding: 6,
    width: '60%',
    fontFamily: 'LatoRegular',
    fontSize: 20,
    backgroundColor: 'black',
    borderRadius:6,
    marginBottom:16
},
})