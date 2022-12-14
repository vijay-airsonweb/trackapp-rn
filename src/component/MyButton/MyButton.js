/* eslint-disable prettier/prettier */
import React from 'react';
import styles from './MyButtonStyle';
import {Button} from 'react-native-elements';
import {View} from 'react-native';

const MyButton = props => {
  return (
    <View style={styles.viewButton}>
      <Button
        title={props.title}
        buttonStyle={styles.button}
        titleStyle={styles.buttonTitle}
        onPress={props.onPress}
      />
    </View>
  );
};

export default MyButton;
