/* eslint-disable prettier/prettier */
import React, {useState, useCallback, useEffect, useRef} from 'react';
import {GiftedChat, InputToolbar, Send, Bubble} from 'react-native-gifted-chat';
import {TouchableOpacity} from 'react-native';
import AppHeader from '../../component/AppHeader/AppHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './ChatViewStyle';
import {SOCKET} from '../config/config';
import {Text} from 'react-native-elements';

const ChatView = props => {
  const [messages, setMessages] = useState([]);
  const isRendered = useRef(false);

  useEffect(() => {
    SOCKET.on('message', data => {
      console.log(props.route.params.userId);
      if (props.route.params.userId !== data[0].user._id) {
        if (!isRendered.current) {
          setMessages(previousMessages =>
            GiftedChat.append(previousMessages, data),
          );
        }
      }
    });
    return () => {
      isRendered.current = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSend = useCallback((message = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, message),
    );
    SOCKET.emit('chatMessage', message);
  }, []);

  const renderInputToolbar = props => {
    return (
      <>
        <InputToolbar
          {...props}
          containerStyle={styles.inputToolbarContainerStyle}
          textInputProps={{
            style: {
              color: '#000000',
              flex: 1,
              alignItems: 'center',
              paddingHorizontal: 20,
            },
            multiline: true,
            returnKeyType: 'go',
            onSubmitEditing: () => {
              if (props.text && props.onSend) {
                let text = props.text;
                props.onSend({text: text.trim()}, true);
              }
            },
          }}
        />
        {/* <TouchableOpacity style={styles.inputToolbarTouchableOpacity}>
          <Ionicons
            name="add-circle-outline"
            style={styles.inputToolbarIcon}
            size={32}
          />
        </TouchableOpacity> */}
      </>
    );
  };

  const renderSend = props => {
    return (
      <>
        <Send {...props}>
          <Ionicons name="send" size={28} style={styles.sendIcon} />
        </Send>
      </>
    );
  };

  const renderBubble = props => {
    return (
      <Bubble
        {...props}
        textStyle={{
          right: {
            color: 'white',
          },
        }}
        wrapperStyle={{
          right: {
            backgroundColor: '#0F0326',
            borderColor: '#000000',
          },
          left: {
            backgroundColor: '#D5E3EC',
          },
        }}
      />
    );
  };

  const leftFromGroup = () => {
    SOCKET.disconnect();
    props.navigation.navigate('login');
  };

  return (
    <>
      <AppHeader
        headerTitle={props.route.params.room}
        rightComponent={
          <>
            <TouchableOpacity
              onPress={() => {
                leftFromGroup();
              }}>
              <Text style={styles.leftGroupButton}>
                Close
                <Ionicons name="backspace-outline" size={16} color="#ffffff" />
              </Text>
            </TouchableOpacity>
          </>
        }
      />
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        renderSend={renderSend}
        renderAvatar={null}
        renderUsernameOnMessage={true}
        onSend={messages => onSend(messages)}
        user={{
          _id: props.route.params.userId,
          name: props.route.params.username,
        }}
      />
    </>
  );
};

export default ChatView;
