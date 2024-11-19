// Importa as bibliotecas e componentes necessários do React e React Native
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, Modal, TextInput, ScrollView } from 'react-native';
import { Client } from '@/types/ClientType'; // Importa o tipo Client
import { useClients } from '@/hooks/useClient'; // Importa o hook personalizado useClients

// Componente principal RegisteredClients
export default function RegisteredClients() {
  // Declara estados para controle de loading, visibilidade do modal e cliente selecionado
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [clientSelected, setClientSelected] = useState<Client | null>(null);
  const { handleClients, clients, handleDeleteClient, handleUpdateClient } = useClients(); // Desestruturação do hook useClients

  // Efeito colateral para carregar os clientes ao montar o componente
  useEffect(() => {
    handleClients();
  }, []);

  // Função para salvar as alterações do cliente
  const handleSaveClient = async(client: Client) => {
    setLoading(true); // Ativa o loading
    console.log(clientSelected); // Log do cliente selecionado
    await handleUpdateClient(client); // Atualiza o cliente
    handleClients(); // Recarrega a lista de clientes
    setLoading(false); // Desativa o loading
    setModalVisible(false); // Fecha o modal
  };

  // Função para editar um cliente
  const handleEditClient = (client: Client) => {
    setClientSelected(client); // Define o cliente selecionado
    setModalVisible(true); // Abre o modal
  };

  // Função para excluir um cliente
  const handleDelete = (client: Client) => {
    handleDeleteClient(client); // Chama a função para excluir o cliente
  };

  // Renderiza o componente
  return (
    <View style={styles.container}>
      {modalVisible && ( // Verifica se o modal deve ser exibido
        <Modal
          animationType="fade" // Tipo de animação do modal
          transparent={true} // Modal transparente
          visible={modalVisible} // Controla a visibilidade do modal
          onRequestClose={() => { // Função chamada ao fechar o modal
            setModalVisible(!modalVisible), // Alterna a visibilidade do modal
            setLoading(false); // Desativa o loading
          }}
        >
          <View style={styles.centeredView}>
            <Text style={styles.modalText}>Editar Usuário</Text> // Título do modal
            <Text style={styles.labelModal}>Nome:</Text> // Rótulo para o campo de nome
            <TextInput
              style={styles.input} // Estilo do campo de entrada
              placeholder="Nome" // Texto de placeholder
              value={clientSelected?.name} // Valor do campo de entrada
              onChangeText={(text) => setClientSelected({ ...clientSelected!, name: text })} // Atualiza o nome do cliente selecionado
            />
            <Text style={styles.labelModal}>Email:</Text> // Rótulo para o campo de email
            <TextInput
              style={styles.input} // Estilo do campo de entrada
              placeholder="Email" // Texto de placeholder
              value={clientSelected?.email} // Valor do campo de entrada
              onChangeText={(text) => setClientSelected({ ...clientSelected!, email: text })} // Atualiza o email do cliente selecionado
            />
            <Text style={styles.labelModal}>Telefone:</Text> // Rótulo para o campo de telefone
            <TextInput
              style={styles.input} // Estilo do campo de entrada
              placeholder="Telefone" // Texto de placeholder
              value={clientSelected?.phone ? clientSelected!.phone.toString() : ''} // Valor do campo de entrada
              onChangeText={(text) => setClientSelected({ ...clientSelected!, phone: parseInt(text) })} // Atualiza o telefone do cliente selecionado
            />
            <TouchableOpacity
              style={styles.button} // Estilo do botão
              onPress={() => handleSaveClient(clientSelected!)} // Chama a função para salvar o cliente
            >
              {loading ? ( // Verifica se está carregando
                <ActivityIndicator size="small" color="#fff" /> // Exibe um indicador de carregamento
              ) : (
                <Text style={styles.textStyle}>Salvar</Text> // Texto do botão
              )}
            </TouchableOpacity>
          </View>
        </Modal>
      )}
      <FlatList
        data={clients} // Dados a serem exibidos na lista
        keyExtractor={(item) => String(item._id)} // Extrai a chave única de cada item
        renderItem={({ item }) => ( // Renderiza cada item da lista
          <>
            <View style={styles.item}> // Estilo do item da lista
              <View style={styles.info}> // Estilo da seção de informações
                <Text style={styles.text}>Nome: {item.name}</Text> // Exibe o nome do cliente
                <View style={styles.separator} /> // Separador
                <Text style={styles.text}>Email: {item.email}</Text> // Exibe o email do cliente
                <View style={styles.separator} /> // Separador
                <Text style={styles.text}>Telefone: {item.phone}</Text> // Exibe o telefone do cliente
                <View style={styles.separator} /> // Separador
              </View>
              <View style={styles.actions}> // Estilo da seção de ações
                <TouchableOpacity style={styles.editButton} onPress={() => handleEditClient(item)}> // Botão de editar
                  <Text style={styles.editButtonText}>Editar</Text> // Texto do botão
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item)}> // Botão de excluir
                  <Text style={styles.deleteButtonText}>Excluir</Text> // Texto do botão
                </TouchableOpacity>
              </View>
            </View>
            {/* <View style={styles.itemSeparator} /> */} // Separador de itens (comentado)
          </>
        )}
      />
    </View>
  );
}

// Estilos do componente
const styles = StyleSheet.create({
  container: { // Estilo do contêiner principal
    flex: 1,
    padding: 20,
    justifyContent: 'flex-end',
  },
  labelModal: { // Estilo do rótulo do modal
    fontSize: 16,
    color: '#000',
    marginBottom: 6,
    fontWeight: 'bold',
  },
  input: { // Estilo do campo de entrada
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    width: '100%',
  },
  button: { // Estilo do botão
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: '#4CAF50',
  },
  item: { // Estilo do item da lista
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#333',
    borderRadius: 5,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  info: { // Estilo da seção de informações
    marginBottom: 10,
  },
  text: { // Estilo do texto
    fontSize: 16,
    color: '#fff',
    marginRight: 30,
  },
  actions: { // Estilo da seção de ações
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  editButton: { // Estilo do botão de editar
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
  editButtonText: { // Estilo do texto do botão de editar
    fontSize: 16,
    color: '#fff',
  },
  deleteButton: { // Estilo do botão de excluir
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
  deleteButtonText: { // Estilo do texto do botão de excluir
    fontSize: 16,
    color: '#fff',
  },
  separator: { // Estilo do separador
    width: 325,
    height: 1,
    backgroundColor: '#ccc',
    marginBottom: 10,
    marginTop: 10,
  },
  // itemSeparator: { // Estilo do separador de itens (comentado)
  //   height: 1,
  //   backgroundColor: '#333',
  //   marginHorizontal: 20,
  //   marginBottom: 20,
  // },
  centeredView: { // Estilo da visão centralizada do modal
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
  closeButton: { // Estilo do botão de fechar (não utilizado)
    marginTop: 10,
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 5,
  },
  textStyle: { // Estilo do texto do botão
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: { // Estilo do texto do modal
    marginBottom: 15,
    textAlign: 'center',
  },
});