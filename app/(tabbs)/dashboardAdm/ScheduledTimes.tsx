import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, Modal, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useHour } from '@/hooks/useHour';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '@/types/UserType';
import { hour, hourCreate } from '@/types/HourType';
import { createHour } from '@/services/userServices';
import { useUsers } from '@/hooks/useUser';

const ScheduledTimes = () => {
  const { hourList, handleHour, handleUpdateHour, handleDeleteHour } = useHour();
  const {handleUsers, users} = useUsers();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [selectedHour, setSelectedHour] = useState<hour>();
  const [newHour, setNewHour] = useState<hourCreate>({ day: [0, 0], begin: '', end: '', professional: ''});

  useEffect(() => {
    const getUserFromStorage = async () => {
      const userString = await AsyncStorage.getItem('user');
      if (userString) {
        const user = JSON.parse(userString) as User;
        setUser(user);
      }
    };

    getUserFromStorage();
    handleHour();
  }, []);

  useEffect(() => {
    handleHour();
  }, [hourList]);

  const openEditModal = (hour: hour) => {
    setLoading(false);
    setSelectedHour(hour);
    setEditModalVisible(true);
  };

  const closeEditModal = async () => {
    setLoading(true);
    await handleUpdateHour(selectedHour!);
    handleHour();
    setLoading(false);
    setEditModalVisible(false);
  };

  const openCreateModal = () => {
    handleUsers();
    setCreateModalVisible(true);
    setLoading(false);
  };

  const closeCreateModal = () => {
    setCreateModalVisible(false);
  };

  const saveNewHour = async () => {
    setLoading(true);
    console.log(newHour);
    await createHour(newHour);
    handleHour();
    setLoading(false);
    setCreateModalVisible(false);
  };

  const handleProfessionalChange = (user: User) => {
    setNewHour({ ...newHour, professional: user._id ?? '' });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={hourList}
        keyExtractor={(item) => item._id ?? ''}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.text}>Profissional: {item.professional.name}</Text>
            <Text style={styles.text}>Data: {item.day[0]}/{item.day[1]}</Text>
            <Text style={styles.text}>Hora: {item.begin}</Text>
            {/* <TouchableOpacity style={styles.button} onPress={() => openEditModal(item)}>
              <Text style={styles.buttonText}>Editar</Text>
            </TouchableOpacity> */}
            <View style={styles.actions}>
              <TouchableOpacity style={styles.editButton} onPress={() => openEditModal(item)}>
                <Text style={styles.editButtonText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={() => {handleDeleteHour(item), handleUsers()}}>
                <Text style={styles.deleteButtonText}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <TouchableOpacity style={styles.createButton} onPress={openCreateModal}>
        <Text style={styles.createButtonText}>Criar Novo Horário</Text>
      </TouchableOpacity>
      <Modal
        visible={editModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeEditModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Editar Horário</Text>
            {selectedHour && (
              <View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ marginRight: 5 }}>Dia:</Text>
                  <TextInput
                    style={styles.inputDate}
                    defaultValue={selectedHour.day[0].toString()}
                    onChangeText={(text) => {
                      const day = parseInt(text);
                      setSelectedHour({ ...selectedHour, day: [day, selectedHour.day[1]] });
                    }}
                    keyboardType="numeric"
                  />
                  <Text style={{ marginRight: 5 }}>Mês:</Text>
                  <TextInput
                    style={styles.inputDate}
                    defaultValue={selectedHour.day[1].toString()}
                    onChangeText={(text) => {
                      const month = parseInt(text);
                      setSelectedHour({ ...selectedHour, day: [selectedHour.day[0], month] });
                    }}
                    keyboardType="numeric"
                  />
                </View>
                <TextInput
                  style={styles.input}
                  defaultValue={selectedHour.begin}
                  onChangeText={(text) => setSelectedHour({ ...selectedHour, begin: text })}
                />
                <TextInput
                  style={styles.input}
                  defaultValue={selectedHour.end}
                  onChangeText={(text) => setSelectedHour({ ...selectedHour, end: text })}
                />
              </View>
            )}
            <TouchableOpacity style={styles.modalButton} onPress={closeEditModal}>
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.modalButtonText}>Salvar</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        visible={createModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeCreateModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Criar Novo Horário</Text>
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ marginRight: 5 }}>Dia:</Text>
                <TextInput
                  style={styles.inputDate}
                  defaultValue={newHour.day[0].toString()}
                  onChangeText={(text) => {
                    const day = parseInt(text);
                    setNewHour({ ...newHour, day: [day, newHour.day[1]] });
                  }}
                  keyboardType="numeric"
                />
                <Text style={{ marginRight: 5 }}>Mês:</Text>
                <TextInput
                  style={styles.inputDate}
                  defaultValue={newHour.day[1].toString()}
                  onChangeText={(text) => {
                    const month = parseInt(text);
                    setNewHour({ ...newHour, day: [newHour.day[0], month] });
                  }}
                  keyboardType="numeric"
                />
              </View>
              <TextInput
                style={styles.input}
                defaultValue={newHour.begin}
                onChangeText={(text) => setNewHour({ ...newHour, begin: text })}
              />
              <TextInput
                style={styles.input}
                defaultValue={newHour.end}
                onChangeText={(text) => setNewHour({ ...newHour, end: text })}
              />
              <Picker
                selectedValue={newHour.professional}
                onValueChange={(value) => handleProfessionalChange(users.find((user) => user._id === value)!)}
              >
                {users.map((user) => (
                  <Picker.Item key={user._id} label={user.name} value={user._id} />
                ))}
              </Picker>
            </View>
            <TouchableOpacity style={styles.modalButton} onPress={saveNewHour}>
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.modalButtonText}>Salvar</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-end',
  },
  createButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 50,
    alignItems: 'center',
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
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
  item: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#333',
    borderRadius: 5,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  text: {
    fontSize: 16,
    color: '#fff',
    marginRight: 30,
  },
  button: {
    position: 'absolute',
    right: 20,
    top: 35,
    backgroundColor: '#555',
    padding: 5,
    borderRadius: 5,
    borderColor: '#fff',
    borderWidth: 1
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  inputDate: {
    width: '36%',
    padding: 10,
    marginBottom: 10,
    marginRight: 15,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  modalButton: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default ScheduledTimes;

