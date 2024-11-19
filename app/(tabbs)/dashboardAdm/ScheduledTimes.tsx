// Importa bibliotecas e componentes necessários do React e React Native
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, Modal, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useHour } from '@/hooks/useHour'; // Hook personalizado para gerenciar horários
import AsyncStorage from '@react-native-async-storage/async-storage'; // Para armazenamento assíncrono
import { User } from '@/types/UserType'; // Tipo de usuário
import { hour, hourCreate } from '@/types/HourType'; // Tipos de horário
import { createHour } from '@/services/userServices'; // Serviço para criar horários
import { useUsers } from '@/hooks/useUser'; // Hook personalizado para gerenciar usuários

// Componente principal ScheduledTimes
const ScheduledTimes = () => {
  // Desestruturação dos hooks personalizados
  const { hourList, handleHour, handleUpdateHour, handleDeleteHour } = useHour();
  const { handleUsers, users } = useUsers();

  // Estados do componente
  const [user, setUser] = useState<User | null>(null); // Estado para armazenar o usuário
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const [editModalVisible, setEditModalVisible] = useState(false); // Estado para controle do modal de edição
  const [createModalVisible, setCreateModalVisible] = useState(false); // Estado para controle do modal de criação
  const [selectedHour, setSelectedHour] = useState<hour>(); // Estado para armazenar o horário selecionado
  const [newHour, setNewHour] = useState<hourCreate>({ day: [0, 0], begin: '', end: '', professional: '' }); // Estado para novo horário

  // Efeito colateral para obter o usuário do armazenamento assíncrono
  useEffect(() => {
    const getUserFromStorage = async () => {
      const userString = await AsyncStorage.getItem('user'); // Obtém o usuário armazenado
      if (userString) {
        const user = JSON.parse(userString) as User; // Converte a string em objeto User
        setUser(user); // Atualiza o estado do usuário
      }
    };

    getUserFromStorage(); // Chama a função para obter o usuário
    handleHour(); // Chama a função para obter a lista de horários
  }, []);

  // Efeito colateral para atualizar a lista de horários quando hourList muda
  useEffect(() => {
    handleHour(); // Atualiza a lista de horários
  }, [hourList]);

  // Função para abrir o modal de edição
  const openEditModal = (hour: hour) => {
    setLoading(false); // Define o carregamento como falso
    setSelectedHour(hour); // Define o horário selecionado
    setEditModalVisible(true); // Abre o modal de edição
  };

  // Função para fechar o modal de edição
  const closeEditModal = async () => {
    setLoading(true); // Define o carregamento como verdadeiro
    await handleUpdateHour(selectedHour!); // Atualiza o horário selecionado
    handleHour(); // Atualiza a lista de horários
    setLoading(false); // Define o carregamento como falso
    setEditModalVisible(false); // Fecha o modal de edição
  };

  // Função para abrir o modal de criação
  const openCreateModal = () => {
    handleUsers(); // Obtém a lista de usuários
    setCreateModalVisible(true); // Abre o modal de criação
    setLoading(false); // Define o carregamento como falso
  };

  // Função para fechar o modal de criação
  const closeCreateModal = () => {
    setCreateModalVisible(false); // Fecha o modal de criação
  };

  // Função para salvar um novo horário
  const saveNewHour = async () => {
    setLoading(true); // Define o carregamento como verdadeiro
    console.log(newHour); // Exibe o novo horário no console
    await createHour(newHour); // Cria um novo horário
    handleHour(); // Atualiza a lista de horários
    setLoading(false); // Define o carregamento como falso
    setCreateModalVisible(false); // Fecha o modal de criação
  };

  // Função para lidar com a mudança de profissional
  const handleProfessionalChange = (user: User) => {
    setNewHour({ ...newHour, professional: user._id ?? '' }); // Atualiza o profissional no novo horário
  };

  // Renderiza o componente
  return (
    <View style={styles.container}>
      <FlatList
        data={hourList} // Lista de horários
        keyExtractor={(item) => item._id ?? ''} // Extrai a chave única de cada item
        renderItem={({ item }) => ( // Renderiza cada item da lista
          <View style={styles.item}>
            <Text style={styles.text}>Profissional: {item.professional.name}</Text>
            <Text style={styles.text}>Data: {item.day[0]}/{item.day[1]}</Text>
            <Text style={styles.text}>Hora: {item.begin}</Text>
            {/* Botão de edição (comentado) */}
            <View style={styles.actions}>
              <TouchableOpacity style={styles.editButton} onPress={() => openEditModal(item)}>
                <Text style={styles.editButtonText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={() => { handleDeleteHour(item), handleUsers() }}>
                <Text style={styles.deleteButtonText}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <TouchableOpacity style={styles.createButton} onPress={openCreateModal}>
        <Text style={styles.createButtonText}>Criar Novo Horário</Text>
      </TouchableOpacity>
      {/* Modal de edição */}
      <Modal
        visible={editModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeEditModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Editar Horário</Text>
            {selectedHour && ( // Verifica se um horário foi selecionado
              <View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ marginRight: 5 }}>Dia:</Text>
                  <TextInput
                    style={styles.inputDate}
                    defaultValue={selectedHour.day[0].toString()} // Valor padrão do dia
                    onChangeText={(text) => {
                      const day = parseInt(text); // Converte o texto em número
                      setSelectedHour({ ...selectedHour, day: [day, selectedHour.day[1]] }); // Atualiza o dia
                    }}
                    keyboardType="numeric" // Teclado numérico
                  />
                  <Text style={{ marginRight: 5 }}>Mês:</Text>
                  <TextInput
                    style={styles.inputDate}
                    defaultValue={selectedHour.day[1].toString()} // Valor padrão do mês
                    onChangeText={(text) => {
                      const month = parseInt(text); // Converte o texto em número
                      setSelectedHour({ ...selectedHour, day: [selectedHour.day[0], month] }); // Atualiza o mês
                    }}
                    keyboardType="numeric" // Teclado numérico
                  />
                </View>
                <TextInput
                  style={styles.input}
                  defaultValue={selectedHour.begin} // Valor padrão do início
                  onChangeText={(text) => setSelectedHour({ ...selectedHour, begin: text })} // Atualiza o início
                />
                <TextInput
                  style={styles.input}
                  defaultValue={selectedHour.end} // Valor padrão do fim
                  onChangeText={(text) => setSelectedHour({ ...selectedHour, end: text })} // Atualiza o fim
                />
              </View>
            )}
            <TouchableOpacity style={styles.modalButton} onPress={closeEditModal}>
              {loading ? ( // Exibe indicador de carregamento ou botão de salvar
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.modalButtonText}>Salvar</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* Modal de criação */}
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
                  defaultValue={newHour.day[0].toString()} // Valor padrão do dia
                  onChangeText={(text) => {
                    const day = parseInt(text); // Converte o texto em número
                    setNewHour({ ...newHour, day: [day, newHour.day[1]] }); // Atualiza o dia
                  }}
                  keyboardType="numeric" // Teclado numérico
                />
                <Text style={{ marginRight: 5 }}>Mês:</Text>
                <TextInput
                  style={styles.inputDate}
                  defaultValue={newHour.day[1].toString()} // Valor padrão do mês
                  onChangeText={(text) => {
                    const month = parseInt(text); // Converte o texto em número
                    setNewHour({ ...newHour, day: [newHour.day[0], month] }); // Atualiza o mês
                  }}
                  keyboardType="numeric" // Teclado numérico
                />
              </View>
              <TextInput
                style={styles.input}
                defaultValue={newHour.begin} // Valor padrão do início
                onChangeText={(text) => setNewHour({ ...newHour, begin: text })} // Atualiza o início
              />
              <TextInput
                style={styles.input}
                defaultValue={newHour.end} // Valor padrão do fim
                onChangeText={(text) => setNewHour({ ...newHour, end: text })} // Atualiza o fim
              />
              <Picker
                selectedValue={newHour.professional} // Profissional selecionado
                onValueChange={(value) => handleProfessionalChange(users.find((user) => user._id === value)!)} // Atualiza o profissional
              >
                {users.map((user) => ( // Mapeia os usuários para opções do Picker
                  <Picker.Item key={user._id} label={user.name} value={user._id} />
                ))}
              </Picker>
            </View>
            <TouchableOpacity style={styles.modalButton} onPress={saveNewHour}>
              {loading ? ( // Exibe indicador de carregamento ou botão de salvar
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

// Estilos do componente
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

// Exporta o componente ScheduledTimes
export default ScheduledTimes;