import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  TextInput, 
  StyleSheet, 
  FlatList, 
  Keyboard, 
  TouchableWithoutFeedback 
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather'

import firebase from './src/services/firebaseConnection';
import TaskList from './src/pages/FlatList';

console.disableYellowBox=true;

export default function App() {

  const [input, setInput] = useState('');
  const [tasks, setTasks] = useState([]);
  const inputRef = useRef(null);
  const [key, setKey] = useState('');

  useEffect( ()=> {  //Carrega os dados do BD para a lista
    async function loadDados(){
      await firebase.database().ref('Tarefas').on('value', (snapshort) => {
        setTasks('');
        snapshort.forEach((childItem) => {
          let data = {
            key: childItem.key,
            nome: childItem.val().Nome,
          };
          setTasks(oldArray => [...oldArray, data]);
        })
      })
    }
    loadDados();
  },[]);

  async function Adicionar(){ //Função para adicionar ao Banco de dados
    if(input !== ''){

      if(key !== ''){
        await firebase.database().ref('Tarefas').child(key).update({
          Nome: input
        });
        setInput('');
        setKey('');
        Keyboard.dismiss();
        return;
      }

      let tarefas = await firebase.database().ref('Tarefas');
      let chaves = tarefas.push().key;

      tarefas.child(chaves).set({
        Nome: input
      });
      Keyboard.dismiss();
      setInput('');
    }else{
      alert('Digite uma tarefa!')
    }
  }

  async function btnExcluir(key){ //Função para remover um item da Lista
    await firebase.database().ref('Tarefas').child(key).remove();
  }

  function editarItem(data){  //Função para atulizar um item da Lista
    setInput(data.nome);
    setKey(data.key);
    inputRef.current.focus();
  }

  function fechaMessagem(){ //Função para tirar a messagem de editar
    setKey('')
    setInput('')
    Keyboard.dismiss();
  }

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        {key.length > 0 && (
          <View style={styles.containerMessagem}>
            <TouchableOpacity onPress={fechaMessagem}>
              <Icon
              name="x-circle"
              size={20}
              color="red"
              />
            </TouchableOpacity>

            <TouchableWithoutFeedback onPress={fechaMessagem}>
              <Text style={styles.textoMessagem}> Você está editando uma tarefa! </Text>
            </TouchableWithoutFeedback>  
          </View>
          )}
        
        <View style={styles.containerTask}> 
          <TextInput
          style={styles.input}
          placeholder="Digite sua tarefa..."
          onChangeText={ (textodigitado) => {setInput(textodigitado)}}
          value={input}
          ref={inputRef}
          />

          <TouchableOpacity style={styles.btnAdd} onPress={Adicionar}>
            <Text style={styles.btnTexto}> + </Text>
          </TouchableOpacity>
        </View>

        <FlatList
        data={tasks}
        keyExtractor={ item => item.key}
        renderItem={ ({item}) => 
          <TaskList 
          data={item} 
          deleteItem={btnExcluir} 
          editarItem={editarItem}
          /> }
        />
      </View>
    </View>
    );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,    
    backgroundColor: '#888',
  },
  wrapper:{
    marginTop: 25,
    marginLeft: 10,
    marginRight: 10,
  },
  containerTask:{
    flexDirection: 'row'
  },
  input:{
    flex: 1,
    backgroundColor: '#e9eaea',
    height: 55,
    marginBottom: 15,
    paddingLeft: 15,  
    borderColor: '#000',
    borderRadius: 5,
    fontSize: 20,
  },
  btnAdd:{
    justifyContent: 'center',
    alignItems: 'center',
    height: 55,
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: 7,
    backgroundColor: '#222',
    borderRadius: 7,
  },
  btnTexto:{
    color: '#FFF',
    fontSize: 30
  },
  containerMessagem:{
    flexDirection: 'row'
  },
  textoMessagem:{
    marginLeft: 5,
    marginBottom: 8,
    color: "red"
  }
});