import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, Text, TextInput, Button, KeyboardAvoidingView } from 'react-native';
import { Header } from 'react-navigation-stack';

import styleVariables from "../style_variables";

export default class SingleChatScreen  extends Component {

    constructor(props) {
        super(props);
        // const { username } = props.navigation.state.params;
        const { username } = { username: "Leito" }; // TODO: remove this, just a Mock
        this.state = {
            currentUsername: username,
            message: "",
            messages: [
                {
                    id: 1,
                    username: "Leito",
                    text: "Hello"
                },
                {
                    id: 2,
                    username: "Tomas",
                    text: "Hey, how are you"
                },
                {
                    id: 3,
                    username: "Leito",
                    text: "Everything ok, working on our awesome app :)"
                },
                {
                    id: 4,
                    username: "Leito",
                    text: "It's advancing"
                },
                {
                    id: 5,
                    username: "Tomas",
                    text: "Yeah, we are going to have the MVP soon hahah"
                }
            ]
        }
    }

    sendMessage = () => {
        const { message } = this.state;
        if (message){
            this.setState((state) => ({
                messages: [ ...state.messages, {
                    id: state.messages.length + 1,
                    username: "Leito",
                    text: state.message
                }],
                message: ""
            }))
        }

        // try {
        //     this.socket.emit("sendMessage", { message });
        // } catch (e) {
        //     this.handleError(e);
        // }
    };

    render () {
        return (
            <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={ Header.HEIGHT + 30 } style={[styles.container, {justifyContent: 'center'}]}>
                <View style={styles.container}>
                    <ScrollView
                        style={styles.messagesContainer}
                        ref={ref => this.scrollView = ref}
                        onContentSizeChange={()=>{
                            this.scrollView.scrollToEnd({animated: true});
                        }}
                        showsVerticalScrollIndicator={false}>
                        {this.state.messages.map((message, index) => (
                            <View
                                style={[
                                    styles.chatMessage,
                                    message.username === this.state.currentUsername ?
                                        styles.ownMessage : styles.comingMessage,
                                    index === 0 && {
                                        marginTop: 20
                                    }
                                ]}
                                key={message.id}
                            >
                                <Text>{message.text}</Text>
                            </View>
                        ))}
                    </ScrollView>
                    <View style={styles.chatBox}>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={text => this.setState({ message: text })}
                            value={this.state.message}/>
                        <Button
                            onPress={this.sendMessage}
                            title={`Sw`}
                            color={styleVariables.PRIMARY_COLOR}
                        />
                    </View>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

SingleChatScreen.navigationOptions = {
    title: 'Single Chat',
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10
    },
    textInput: {
        height: 40,
        borderWidth: 1,
        marginBottom: 15,
        padding: 10
    },
    chatBox: {
        display: 'flex'
    },
    messagesContainer: {

    },
    chatMessage:{
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginBottom: 10,
        maxWidth: '70%'
    },
    ownMessage: {
        alignSelf: 'flex-end',
        backgroundColor: `${styleVariables.PRIMARY_COLOR}30`
    },
    comingMessage: {
        alignSelf: 'flex-start',
        backgroundColor: 'rgba(0, 0, 0, .06)'
    }
});
