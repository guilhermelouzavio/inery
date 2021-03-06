import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Text, TouchableOpacity, ScrollView, } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import api from '../service/api';


interface RouteParams {
  medicine_id: number;
  patient_id: number;
}
export default function HorarioPage() {

  const navigation = useNavigation();
  const route = useRoute()

  const params = route.params as RouteParams

  const [hours, setHours] = useState('')
  const [description, setDescription] = useState('')

  function navigateBack() {
    navigation.goBack()
  }

  async function handleCreate() {

    alert(params.patient_id)
    await api.post(`/recipe/${params.medicine_id}/${hours}/${description}`, 
    { headers: { authorization: params.patient_id } }
    )

    navigation.navigate('HomePage')
  }


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Escolha o horário</Text>
        <TouchableOpacity onPress={navigateBack}>
          <Feather name="arrow-left" size={28} color="#FF9900" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.menu}>

        <View style={styles.menu}>

          <Text style={styles.horaTexto}>Descrição:</Text>
          <TextInput
            style={styles.horaTextoInput}
            value={description}
            onChangeText={(value) => setDescription(value)}
          />

          <Text style={styles.horaTexto}>Hora(HH:MM):</Text>
          <TextInput
            style={styles.horaTextoInput}
            value={hours}
            onChangeText={(value) => setHours(value)}
          />



          <TouchableOpacity style={styles.nextButton} onPress={handleCreate}>
            <Feather name="save" size={25} color="#fff" />
            <Text style={styles.nextButtonText}>Cadastrar novo Alarme</Text>
          </TouchableOpacity>



        </View>
      </ScrollView>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DCDCDC",
  },
  header: {
    padding: 5,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    marginBottom: 20,
    paddingTop: 15
  },
  headerText: {
    fontSize: 30,
    color: '#13131a',
    fontWeight: 'bold',
    marginRight: 20,
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
    marginTop: 48,
    color: '#13131a',
    fontWeight: 'bold',
  },
  menu: {
    marginHorizontal: 15,
  },
  horaTexto: {
    fontSize: 25,
    marginLeft: 10,
    color: 'gray',
    marginTop: 8,
    marginBottom: 10
  },
  horaTextoInput: {
    borderRadius: 15,
    padding: 15,
    fontSize: 20,
    marginBottom: 10,
    color: 'gray',
    backgroundColor: '#fff',
  },
  nextButton: {
    flexDirection: 'row',
    backgroundColor: "#1f6af7",
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 28,
    marginBottom: 50,
  },
  nextButtonText: {
    fontSize: 22,
    color: '#fff'
  },
})