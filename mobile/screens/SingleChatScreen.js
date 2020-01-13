import React, {useState} from 'react';
import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';

export default function SingleChatScreen(props) {
    const {navigate} = props.navigation;
    const {message, setMessage} = useState('')

    sendMessage = () => {
        const { message } = this.state;
        try {
            this.socket.emit("sendMessage", { message });
        } catch (e) {
            this.handleError(e);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.messageContainer}>
                <Text style={styles.messageUsername}>sdfsdf</Text>
            </Text>
            <View style={styles.primary}>
                <TextInput style={styles.textInput} />
                <TouchableOpacity>
                    <View>
                        <Text style={styles.messageUsername}>Send</Text>
                    </View>
                </TouchableOpacity>
            </View>

            
        </ScrollView>
    );
}

SingleChatScreen.navigationOptions = {
    title: 'Chat',
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
    },
    container: {
        // borderTopWidth: StyleSheet.hairlineWidth,
        // borderTopColor: Color.defaultColor,
        // backgroundColor: Color.white,
        bottom: 0,
        left: 0,
        right: 0,
      },
      primary: {
        flexDirection: 'row',
        alignItems: 'flex-end',
      },
      accessory: {
        height: 44,
      },
      textInput: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
        lineHeight: 16,
        ...Platform.select({
          web: {
            paddingTop: 6,
            paddingLeft: 4,
          },
        }),
        marginTop: Platform.select({
          ios: 6,
          android: 0,
          web: 6,
        }),
        marginBottom: Platform.select({
          ios: 5,
          android: 3,
          web: 4,
        }),
      },
});
