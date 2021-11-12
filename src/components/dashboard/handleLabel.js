import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';
import Snackbar from 'react-native-snackbar';
import { deleteLabels, getLabels } from '../../services/userServices';
import { useSelector, useDispatch } from 'react-redux';

const HandleLabel = ({ navigation }) => {
  // const oldLabels = useSelector(state => state.userReducer.labels);
  const userEmail = useSelector(state => state.userReducer.userDetails.email);

  const [labelName, setLabelName] = useState('');
  const [activeField, setActiveField] = useState('0');
  const [refresh, setRefresh] = useState(false);
  const [oldLabels, setOldLabels] = useState([]);

  const getLabelsData = async userEmail => {
    let labelsData = await getLabels(userEmail);
    console.log('labels data in HandleLabel: ', labelsData);
    setOldLabels(labelsData);
  };

  const createLabel = async () => {
    await firestore()
      .collection('labels')
      .add({
        label: labelName,
        email: userEmail,
      })
      .then(() => {
        console.log('Label is added in : ', userEmail);
        Snackbar.show({
          text: 'Label is created!',
          duration: Snackbar.LENGTH_SHORT,
        });
        setRefresh(true);
      });
  };

  const editLabel = async id => {
    if (labelName) {
      await firestore()
        .collection('labels')
        .doc(id)
        .update({
          label: labelName,
          email: userEmail,
        })
        .then(() => {
          console.log('Label is added in : ', userEmail);
          Snackbar.show({
            text: 'Label is updated!',
            duration: Snackbar.LENGTH_SHORT,
          });
          setRefresh(true);
        });
    } else {
      Snackbar.show({
        text: 'please make changes!',
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  };

  const removeLabel = id => {
    deleteLabels(id).then(() => {
      Snackbar.show({
        text: 'Label deleted!',
        duration: Snackbar.LENGTH_SHORT,
      });
      setRefresh(true);
    });
  };

  // useEffect(() => {
  //     setRefresh(false);
  //     getLabelsData(userEmail);
  //     console.log('rerandering');
  // }, [refresh])

  useEffect(() => {
    getLabelsData(userEmail);
    setRefresh(false);
  }, [refresh]);

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
          <TouchableOpacity onPress={() => navigation.goBack()}>
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
          <Text style={{ fontSize: 18, fontWeight: '600' }}>Edit labels</Text>
        </View>
      </View>
      <ScrollView>
        <View
          style={{
            padding: 2,
            justifyContent: 'space-between',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: '#d4d4d4',
            backgroundColor: '#F5F6FA',
            flexDirection: 'row',
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'flex-start',
              padding: 12,
            }}>
            <TouchableOpacity>
              {/* <Icons name="close" size={25} color='#525252' /> */}
              <Icons name="plus" size={25} color="#525252" />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}>
            <TextInput
              style={{ width: '100%', fontSize: 15 }}
              placeholder="Create new labels"
              onChangeText={val => setLabelName(val)}
              onFocus={() => console.log('Focused 1')}
            />
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'flex-start',
              padding: 12,
            }}>
            <TouchableOpacity onPress={createLabel}>
              <Icons name="check" size={25} color="#525252" />
            </TouchableOpacity>
          </View>
        </View>

        {oldLabels.map(item => (
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
              {activeField == item.id ? (
                <TouchableOpacity onPress={() => removeLabel(item.id)}>
                  <Icons name="trash-can-outline" size={25} color="#525252" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity>
                  <Icons name="label-outline" size={25} color="#525252" />
                </TouchableOpacity>
              )}
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}>
              <TextInput
                style={{ width: '100%', fontSize: 15 }}
                defaultValue={item.label}
                onChangeText={val => setLabelName(val)}
                onFocus={() => setActiveField(item.id)}
              />
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'flex-start',
                padding: 12,
              }}>
              {activeField == item.id ? (
                <TouchableOpacity onPress={() => editLabel(item.id)}>
                  <Icons name="check" size={25} color="#4169e1" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity>
                  <Icons name="pencil" size={25} color="#525252" />
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default HandleLabel;
