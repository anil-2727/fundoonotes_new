import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {useNavigation} from '@react-navigation/native';


export const NoteCard = (props) => {


    return (
      <View style={[styles.container,{ width:props.cardWidth}]}>
          <View>
              <Text style={styles.title}>{props.title? props.title: 'My Title'}</Text>
              <Text style={styles.description}>{props.description? props.description: 'Description'}</Text>
          </View>
      </View>
    );
}

export default NoteCard;


const styles = StyleSheet.create({
    container:{
        // flex:0 1 auto, 
        borderWidth:1,
        borderColor:'#d4d4d4', 
        margin:6,
        padding:10, 
        borderRadius:10,
        backgroundColor:'#ffff',
        // minWidth:'45%',
        // maxWidth:'45%',
        // flexWrap:'wrap',
       
    },

    title: {
        fontSize:15,
        fontWeight:'600',
        marginBottom:10,
        color:'#525252'

      },

      description: {
        color:'#525252',
        textAlign:'auto'
      },
  });