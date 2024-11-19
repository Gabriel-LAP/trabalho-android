import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, Modal, TextInput, ScrollView } from 'react-native';
import { useUsers } from '@/hooks/useUser';
import { Link, router } from 'expo-router';
import { User } from '@/types/UserType';

export default function RegisteredClients() {
  const { handleUsers, users, handleUpdateUser, handleDeleteUser } = useUsers();

  const [modalVisible, setModalVisible] = useState(false);
  const [userSelected, setUserSelected] = useState<User>();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    handleUsers()
  }, []);

  const handleAddUser = () => {
    router.navigate({
      pathname: '/(tabbs)/dashboardAdm/RegisterEmployee',
    });
  };

  const handleEditUser = (user: User) => {
    setUserSelected(user);
    console.log(userSelected);
    setModalVisible(true);
  };

  const handleSaveUser = async(user: User) => {
    setLoading(true);
    await handleUpdateUser(user);
    handleUsers();
    setLoading(false);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={users.slice().reverse()}
        keyExtractor={(item) => String(item._id)}
        renderItem={({ item }) => (
          <View style={styles.service}>
            <Text style={styles.label}>Nome:</Text>
            <Text style={styles.name}>{item.name}</Text>
            <View style={styles.separator} />
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.email}>{item.email}</Text>
            <View style={styles.separator} />
            <Text style={styles.label}>Telefone:</Text>
            <Text style={styles.phone}>{item.phone}</Text>
            <View style={styles.separator} />
            <Text style={styles.label}>CPF:</Text>
            <Text style={styles.cpf}>{item.cpf}</Text>
            <View style={styles.separator} />
            <Text style={styles.label}>Endereco:</Text>
            <Text style={styles.address}>{item.address}</Text>
            <View style={styles.separator} />
            <Text style={styles.label}>Número:</Text>
            <Text style={styles.number}>{item.number}</Text>
            <View style={styles.separator} />
            <Text style={styles.label}>CEP:</Text>
            <Text style={styles.zipCode}>{item.zipCode}</Text>
            <View style={styles.separator} />
            <Text style={styles.label}>Cidade:</Text>
            <Text style={styles.city}>{item.city}</Text>
            <View style={styles.separator} />
            <Text style={styles.label}>Estado:</Text>
            <Text style={styles.state}>{item.state}</Text>
            <View style={styles.separator} />
            <Text style={styles.label}>Tipo:</Text>
            <Text style={styles.type}>{item.type}</Text>
            <View style={styles.actions}>
              <TouchableOpacity style={styles.editButton} onPress={() => handleEditUser(item)}>
                <Text style={styles.editButtonText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={() => {handleDeleteUser(item), handleUsers()}}>
                <Text style={styles.deleteButtonText}>Excluir</Text>
              </TouchableOpacity>
            </View>
            
          </View>
          
        )}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddUser}>
        <Text style={styles.addButtonText}>Cadastrar Funcionário</Text>
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <ScrollView>
            <Text style={styles.modalText}>Editar Usuário</Text>
            <Text style={styles.labelModal}>Nome:</Text>
            <TextInput
              style={styles.input}
              placeholder="Nome"
              value={userSelected?.name}
              onChangeText={(text) => setUserSelected({ ...userSelected!, name: text })}
            />
            <Text style={styles.labelModal}>Email:</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={userSelected?.email}
              onChangeText={(text) => setUserSelected({ ...userSelected!, email: text })}
            />
            <Text style={styles.labelModal}>Telefone:</Text>
            <TextInput
              style={styles.input}
              placeholder="Telefone"
              value={userSelected?.phone ? userSelected!.phone.toString() : ''}
              onChangeText={(text) => setUserSelected({ ...userSelected!, phone: parseInt(text) })}
            />
            <Text style={styles.labelModal}>CPF:</Text>
            <TextInput
              style={styles.input}
              placeholder="CPF"
              value={userSelected?.cpf}
              onChangeText={(text) => setUserSelected({ ...userSelected!, cpf: text })}
            />
            <Text style={styles.labelModal}>Endereço:</Text>
            <TextInput
              style={styles.input}
              placeholder="Endereço"
              value={userSelected?.address}
              onChangeText={(text) => setUserSelected({ ...userSelected!, address: text })}
            />
            <Text style={styles.labelModal}>Número:</Text>
            <TextInput
              style={styles.input}
              placeholder="Número"
              value={userSelected?.number ? userSelected!.number.toString() : ''}
              onChangeText={(text) => setUserSelected({ ...userSelected!, number: parseInt(text) })}
            />
            <Text style={styles.labelModal}>CEP:</Text>
            <TextInput
              style={styles.input}
              placeholder="CEP"
              value={userSelected?.zipCode ? userSelected!.zipCode.toString() : ''}
              onChangeText={(text) => setUserSelected({ ...userSelected!, zipCode: parseInt(text) })}
            />
            <Text style={styles.labelModal}>Cidade:</Text>
            <TextInput
              style={styles.input}
              placeholder="Cidade"
              value={userSelected?.city}
              onChangeText={(text) => setUserSelected({ ...userSelected!, city: text })}
            />
            <Text style={styles.labelModal}>Estado:</Text>
            <TextInput
              style={styles.input}
              placeholder="Estado"
              value={userSelected?.state}
              onChangeText={(text) => setUserSelected({ ...userSelected!, state: text })}
            />
            <Text style={styles.labelModal}>Tipo:</Text>
            <TextInput
              style={styles.input}
              placeholder="Tipo"
              value={userSelected?.type}
              onChangeText={(text) => setUserSelected({ ...userSelected!, type: text })}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleSaveUser(userSelected!)}
            >
            {loading ? (
                <ActivityIndicator size="small" color="#fff" />
            ) : (
                <Text style={styles.textStyle}>Salvar</Text>
            )}
              
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  service: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#333',
    borderRadius: 8,
  },
  label: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 6,
    fontWeight: 'bold',
  },
  labelModal: {
    fontSize: 16,
    color: '#000',
    marginBottom: 6,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
  },
  phone: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
  },
  cpf: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
  },
  address: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
  },
  number: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
  },
  zipCode: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
  },
  city: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
  },
  state: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
  },
  type: {
    fontSize: 16,
    color: '#fff',
  },
  addButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 20,
    position: 'absolute',
    bottom: 23,
    right: 23,
  },
  addButtonText: {
    fontSize: 16,
    color: '#fff',
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginBottom: 10,
  },
  actions: {
    flexDirection: 'row',
    position: 'absolute',
    top: 10,
    right: 10,
  },
  editButton: {
    backgroundColor: '#555',
    padding: 10,
    borderRadius: 10,
    borderColor: '#fff',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    marginRight: 10,
  },
  editButtonText: {
    fontSize: 16,
    color: '#fff',
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 10,
    borderColor: '#fff',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  deleteButtonText: {
    fontSize: 16,
    color: '#fff',
  },
  centeredView: {
    flex: 1,
    width: '90%',
    height: '90%',
    backgroundColor: '#f9f9f9',
    margin: 20,
    paddingBottom: 35,
    paddingLeft: 35,
    paddingRight: 35,
    paddingTop: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalView: {
    width: '90%',
    height: '85%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    // alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: '#4CAF50',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    width: '100%',
  },
});

