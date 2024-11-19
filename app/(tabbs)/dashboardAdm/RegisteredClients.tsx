import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, Modal, TextInput, ScrollView } from 'react-native';
import { Client } from '@/types/ClientType';
import { useClients } from '@/hooks/useClient';

export default function RegisteredClients() {
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [clientSelected, setClientSelected] = useState<Client | null>(null);
  const { handleClients, clients, handleDeleteClient, handleUpdateClient } = useClients();

  useEffect(() => {
    handleClients()
  }, []);

  const handleSaveClient = async(client: Client) => {
    setLoading(true);
    console.log(clientSelected);
    await handleUpdateClient(client);
    handleClients();
    setLoading(false);
    setModalVisible(false);
  };

  const handleEditClient = (client: Client) => {
    setClientSelected(client);
    setModalVisible(true);
  };

  const handleDelete = (client: Client) => {
    handleDeleteClient(client);
  };

  return (
    <View style={styles.container}>
      {modalVisible && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible),
            setLoading(false)
          }}
        >
          <View style={styles.centeredView}>
           
              <Text style={styles.modalText}>Editar Usuário</Text>
              <Text style={styles.labelModal}>Nome:</Text>
              <TextInput
                style={styles.input}
                placeholder="Nome"
                value={clientSelected?.name}
                onChangeText={(text) => setClientSelected({ ...clientSelected!, name: text })}
              />
              <Text style={styles.labelModal}>Email:</Text>
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={clientSelected?.email}
                onChangeText={(text) => setClientSelected({ ...clientSelected!, email: text })}
              />
              <Text style={styles.labelModal}>Telefone:</Text>
              <TextInput
                style={styles.input}
                placeholder="Telefone"
                value={clientSelected?.phone ? clientSelected!.phone.toString() : ''}
                onChangeText={(text) => setClientSelected({ ...clientSelected!, phone: parseInt(text) })}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleSaveClient(clientSelected!)}
              >
                {loading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.textStyle}>Salvar</Text>
                )}
              </TouchableOpacity>
           
          </View>
        </Modal>
      )}
      <FlatList
        data={clients}
        keyExtractor={(item) => String(item._id)}
        renderItem={({ item }) => (
          <>
            <View style={styles.item}>
              <View style={styles.info}>
                <Text style={styles.text}>Nome: {item.name}</Text>
                <View style={styles.separator} />
                <Text style={styles.text}>Email: {item.email}</Text>
                <View style={styles.separator} />
                <Text style={styles.text}>Telefone: {item.phone}</Text>
                <View style={styles.separator} />
              </View>
              <View style={styles.actions}>
                <TouchableOpacity style={styles.editButton} onPress={() => handleEditClient(item)}>
                  <Text style={styles.editButtonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item)}>
                  <Text style={styles.deleteButtonText}>Excluir</Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* <View style={styles.itemSeparator} /> */}
          </>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-end',
  },
  labelModal: {
    fontSize: 16,
    color: '#000',
    marginBottom: 6,
    fontWeight: 'bold',
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: '#4CAF50',
  },
  item: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#333',
    borderRadius: 5,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  info: {
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#fff',
    marginRight: 30,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'flex-end',
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
  separator: {
    width: 325,
    height: 1,
    backgroundColor: '#ccc',
    marginBottom: 10,
    marginTop: 10,
  },
  // itemSeparator: {
  //   height: 1,
  //   backgroundColor: '#333',
  //   marginHorizontal: 20,
  //   marginBottom: 20,
  // },
  centeredView: {
    position: 'absolute',
    top: 210,
    flex: 1,
    width: '90%',
    height: '43%',
    backgroundColor: '#f9f9f9',
    margin: 20,
    marginBottom: 460,
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
  closeButton: {
    marginTop: 10,
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 5,
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
});


