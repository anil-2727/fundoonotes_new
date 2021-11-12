import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import Snackbar from 'react-native-snackbar';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import { editNote } from '../../services/userServices';

const SelectLabel = (props) => {
  const labelsArray = useSelector(state => state.userReducer.labels);

  const [selectedLabels, setSelectedLabels] = useState([]);
  const { noteId, labelsName } = props?.route?.params;

  const addLabelToNote = async() => {
    let temp = {
      labels:selectedLabels
    }
    await editNote(noteId, temp)
    .then(() => {
      Snackbar.show({
      text: 'Label is added!',
      duration: Snackbar.LENGTH_SHORT,
      })
      props.navigation.goBack();
    });
  }

  const handleSelectedLabels = (labelName) => {

    let [first, second] = labelsName;
    if (selectedLabels.includes(labelName)) {
      const newListItems = selectedLabels.filter(id => id !== labelName);
      console.log('newly : ', newListItems);
      return setSelectedLabels(newListItems);
    }
    setSelectedLabels(selectedLabels => [...selectedLabels, labelName]);
    console.log(selectedLabels);
  };

  useEffect(() => {
    console.log('Note Id: ', noteId, labelsName);
  },[])

  return (
    <View style={{ flex: 1, backgroundColor: '#ffff' }}>
      <View
        style={{
          padding: 2,
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'flex-start',
            padding: 12,
          }}>
          <TouchableOpacity onPress={addLabelToNote}>
            <Icons name="arrow-left" size={25} color="#525252" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'flex-start',
            padding: 12,
          }}>
          <Text style={{ fontSize: 18, fontWeight: '600' }}>Select labels</Text>
        </View>
      </View>
      <ScrollView>
        {labelsArray.map(item => (
          <View
            key={item.id}
            style={{
              padding: 2,
              justifyContent: 'space-between',
              alignItems: 'center',
              borderColor: '#d4d4d4',
              flexDirection: 'row',
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'flex-start',
                padding: 12,
              }}>
              <TouchableOpacity>
                <Icons name="label-outline" size={25} color="#525252" />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}>
              <Text style={{ width: '100%', fontSize: 15 }}>{item.label}</Text>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'flex-start',
                padding: 12,
              }}>
              <TouchableOpacity onPress={() => handleSelectedLabels(item.label)}>
                {selectedLabels.includes(item.label) ? (
                  <Icons name="checkbox-marked" size={25} color="#4169e1" />
                ) : (
                  <Icons
                    name="checkbox-blank-outline"
                    size={25}
                    color="#525252"
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default SelectLabel;
