import React, {useState} from 'react'
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker'
import api  from './services/api'

var FormData = require('form-data')
const App = () => {
  const [img, setImg] = useState()

  async function handleSubmit(){
    const form  = new FormData()

    // form.append('image', {
    //   uri:img.uri,
    //   type: img.type,
    //   fileName: img.fileName
    // });
    // form.append('image',img)

    // let photo = { uri: source.uri}
    // let formdata = new FormData();

    // formdata.append("product[name]", 'test')
    // formdata.append("product[price]", 10)
    // formdata.append("product[category_ids][]", 2)
    // formdata.append("product[description]", '12dsadadsa')
    // formdata.append("product[images_attributes[0][file]]", {uri: photo.uri, name: 'image.jpg', type: 'image/jpeg'})

    // fetch('http://192.168.1.101:3000/products',{
    //   method: 'post',
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //   },
    //   body: formdata
    //   }).then(response => {
    //     console.log("image uploaded")
    //   }).catch(err => {
    //     console.log(err)
    //   })  
    // });


    form.append("image", {uri: img.uri, name: img.fileName, type: img.type})

    // let res = await fetch(
    //   'http://192.168.0.22:8002/token/guest',
    //   {
    //     method: 'post',
    //     body: formData,
    //     headers: {
    //       'Content-Type': 'multipart/form-data'
    //     }
    //   }
    // )
    // let resjson = await res.json();
    // console.log(resjson)
    const res = await api.post('/token/guest', form , {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(({data})=>console.log(data))
  }

  function handleImage(data){
    if(data.assets[0].didCancel){
      alert("Cancelled")
      return
    }
    if(data.assets[0].error){
      alert("Error: " + data.assets[0].error)
      return
    }
    if(!data.assets[0].uri){
      alert("URI not found")
      return;
    }
    setImg(data.assets[0])
  }

  return (
    <View style={styles.container}>
      <Image style={styles.preview}
        source= { img ? img.uri :  require('./img/preview.png')}
      />
      <TouchableOpacity style={styles.button} 
        onPress={() => launchImageLibrary(
        {},
        handleImage
      )}>
        <Text style={styles.text}>Imagem Galeria</Text>
      </TouchableOpacity>


      <TouchableOpacity style={styles.button} 
        onPress={() => handleSubmit()}
      >
        <Text style={styles.text}>Enviar</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button:{
    width : 150,
    height: 50,
    borderRadius: 3,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15
  },
  text:{
    alignText: 'center',
    color: 'white',
    fontSize: 20,
  },
  preview: {
    width: 250,
    heigth: 200,
  }
});

export default App;
