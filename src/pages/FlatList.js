import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'

export default function TaskList({data, deleteItem, editarItem}){
  return (
    <View style={styles.container}>

      <View style={{paddingRight: 10}}>
        <TouchableWithoutFeedback onPress={() => editarItem(data)}>
          <Text style={{color: '#FFF', fontSize: 17}}> {data.nome} </Text>
          </TouchableWithoutFeedback>
      </View>

      <TouchableOpacity onPress={() => deleteItem(data.key) }>
        <Icon
        name="trash"
        color="#FFF"
        size={30}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#222',
    marginBottom: 10,
    padding: 15,
    borderRadius: 7,
  },
});