/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {View, Alert} from 'react-native';
import {Card} from 'react-native-elements';
import MyTextInput from '../../component/MyTextInput/MyTextInput';
import MyButton from '../../component/MyButton/MyButton';
import styles from './LoginViewStyle';
import {SOCKET} from '../config/config';
import 'react-native-get-random-values';
import {useIsFocused} from '@react-navigation/native';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

const LoginScreen = (props) => {
  const isFocused = useIsFocused();
  const [values, setValues] = useState({});

  const handleChange = (name) => (text) => {
    setValues({...values, [name]: text});
  };

  useEffect(() => {
    return () => {
      setValues({});
    };
  }, [isFocused]);

  const handleLogin = () => {
    if (values.roomName === '') {
      Alert.alert('Room Name is required');
    } else {
      if (values.userName === '') {
        Alert.alert('UserName is required');
      } else {
        let id = uuidv4();

        SOCKET.connect();
        SOCKET.emit('joinGroup', {
          username: values.userName,
          room: values.roomName,
        });
        props.navigation.navigate('chat', {
          username: values.userName,
          room: values.roomName,
          userId: id,
        });
      }
    }
  };

  return (
    <View style={styles.loginScreenContainer}>
      {/* <AppHeader headerTitle="Login" /> */}
      <Card containerStyle={styles.loginCardContainer}>
        <Card.Title>ChatApp</Card.Title>
        <Card.Divider />
        <View>
          <MyTextInput
            placeholder="Enter Room Name"
            style={styles.textInput}
            value={values.roomName}
            onChangeText={handleChange('roomName')}
          />
          <MyTextInput
            placeholder="Enter Username"
            style={styles.textInput}
            value={values.userName}
            onChangeText={handleChange('userName')}
          />
          <MyButton
            title="Login"
            onPress={() => {
              handleLogin();
            }}
          />
        </View>
      </Card>
    </View>
  );
};

export default LoginScreen;
