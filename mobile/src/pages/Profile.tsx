import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View, Text, Image, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import api from '../service/api';

interface Patient {
  id: number;
  name: string;
  cpf: string;
  email: string;
  photo: string;
}

interface RouteParams {
    id : number
}


export default function Profile() {
  const navigation = useNavigation();

  function navigateToProfileUpdate(id : number){
    navigation.navigate('ProfileUpdate', {id})
  }

  const [patient, setPatient] = useState<Patient>()
  const route = useRoute()
  const params = route.params as RouteParams;

  useEffect(() => {
    api.get(`/patient/${params.id}`).then(({ data }) => setPatient(data))
  }, [params.id])
  if(!patient){
    return (
      <Text>Loading...</Text>
    )
  }


  function navigateBack() {
    navigation.goBack()
  }



  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Meu Perfil</Text>
        <TouchableOpacity onPress={navigateBack}>
          <Feather name="arrow-left" size={28} color="#FF9900" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.menu}>
        <Image
          source={{uri : patient?.photo}}
          style={styles.img}
        />
        <View style={styles.perfil}>
          <Text style={styles.perfilTextNome}>{patient?.name}</Text>
          <Text style={styles.perfilTextDados}>CPF:</Text>
          <Text style={styles.perfilTextDados}>{patient?.cpf}</Text>
          <Text style={styles.perfilTextDados}>Email:</Text>
          <Text style={styles.perfilTextDados}>{patient?.email}</Text>
          <Text style={styles.perfilTextDados}>Senha:</Text>
          <Text style={styles.perfilTextDados}>******</Text>

          <TouchableOpacity style={styles.perfilButton} onPress={() => navigateToProfileUpdate(patient.id)}>
            <Feather name="edit" size={25} color="#fff" />
            <Text style={styles.perfilButtonText}>Alterar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F5",

  },
  header: {
    padding: 5,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    marginBottom: 20,
    paddingTop: 15,
    height: 80

  },
  headerText: {
    fontSize: 20,
    color: '#13131a',
    fontWeight: 'bold',
    marginRight: 20
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
  img: {
    alignItems: 'center',
    alignSelf: 'center',
    resizeMode: 'contain',
    height: 120,
    width: 120,
    borderRadius: 20,
  },
  perfil: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
  },
  perfilTextNome: {
    color: 'gray',
    fontSize: 25,
    alignSelf: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  perfilTextDados: {
    color: 'gray',
    fontSize: 15,
    marginBottom: 10,
  },
  perfilButton: {
    backgroundColor: "#37C77F",
    borderRadius: 8,
    alignItems: 'center',
    height: 40,
    marginTop: 30,
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  perfilButtonText: {
    fontSize: 22,
    color: '#fff'
  },
  nextButton: {
    backgroundColor: "#DD3355",
    borderRadius: 15,
    alignItems: 'center',
    height: 56,
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  nextButtonText: {
    fontSize: 22,
    color: '#fff'
  },
})