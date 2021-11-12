import React, { useState, useEffect } from 'react';
import { Text, View , TouchableOpacity, ScrollView } from 'react-native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector, useDispatch } from 'react-redux';
import { getCollectionData } from '../../services/userServices';
import NoteCard from './noteCard';

const LabeldNotes = (props) => {
  const { activeLabels } = props?.route?.params;
  const userEmail = useSelector(state => state.userReducer.userDetails.email);
  const [labeledNotes, setLabeledNotes] = useState([])

  const getLabeledNotes = async (userEmail) => {
    let temp = await getCollectionData(userEmail);
    let labelsData = temp.filter(item => item.labels.includes(activeLabels));
    console.log('Labled Notes : ', labelsData);
    setLabeledNotes(labelsData);
  };

  useEffect(() => {
    getLabeledNotes(userEmail);
  }, [activeLabels]);

  return (
    // <View>
    //   <Text>Active Label : {activeLabels}</Text>
    // </View>
    <View style={{flex:1, backgroundColor:'#ffff'}}>
      <View style={[{ padding:2, justifyContent:'space-between', alignItems:'center'}, {flexDirection: "row",}]}>
          <View style={{ justifyContent:'center', alignItems:'flex-start', padding:12}}>
              <TouchableOpacity onPress={() => props.navigation.goBack()}>
                  <Icons name="arrow-left" size={25} color='#525252' />
              </TouchableOpacity>
          </View>
          <View style={{flex:1, justifyContent:'center', alignItems:'flex-start', padding:12,}}>
              <Text style={{fontSize:18, fontWeight:'600'}}>{activeLabels}</Text>
          </View>
          
          <View style={{justifyContent:'center', alignItems:'center', padding:10}}>
              <TouchableOpacity>
                  <Icons name="dots-vertical" size={25} color='#525252' />
              </TouchableOpacity>
          </View>
      </View>
      <ScrollView>
          { labeledNotes.length == 0 ? 
              <View style={{flex:1, justifyContent:'center', alignItems:'center', marginTop:'50%'}}>
                  <Icons name="trash-can-outline" size={150} color='#eab308' />
              </View>
              :
              <View style={{flex:1}}>
                {labeledNotes.map(item => (
                    <TouchableOpacity style={{width:'100%', }}  key={item.id}>
                        <NoteCard title={item.title} description={item.description} labels={item.labels} />
                    </TouchableOpacity>
                ))}
              </View>
          
          }
      </ScrollView>
  </View>
  );
};

export default LabeldNotes;
