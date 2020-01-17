import React, { Component } from "react";
import {
    ScrollView,
    StyleSheet,
    View,
    Text,
    TextInput,
    Button,
    KeyboardAvoidingView
} from "react-native";
import { Header } from "react-navigation-stack";
import { connect } from "react-redux";

import styleVariables from "../style_variables";
import { onCreateMessage, onNewMessage } from "../actions/chatAction";

export class SingleChatScreen extends Component {
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
        };
    }
    componentDidMount() {
        this.props.ioNewMessage();
    }

    sendMessage = () => {
        const { message, username } = this.state;
        const { all } = this.props;
        onCreateMessage("anonymous", {
            message,
            username: this.props.user
        });
    };

    render() {
        const { user, messages } = this.props;
        return (
            <KeyboardAvoidingView
                behavior="padding"
                keyboardVerticalOffset={Header.HEIGHT + 30}
                style={[styles.container, { justifyContent: "center" }]}>
                <View style={styles.container}>
                    <ScrollView
                        style={styles.messagesContainer}
                        ref={ref => (this.scrollView = ref)}
                        onContentSizeChange={() => {
                            this.scrollView.scrollToEnd({ animated: true });
                        }}
                        showsVerticalScrollIndicator={false}>
                        {messages.map(({ id, data: { message, username } }) => (
                            <View
                                style={[
                                    styles.chatMessage,
                                    username === user ? styles.ownMessage : styles.comingMessage,
                                    {
                                        marginTop: 20
                                    }
                                ]}
                                key={id}>
                                <Text>{message}</Text>
                            </View>
                        ))}
                    </ScrollView>
                    <View style={styles.chatBox}>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={text => this.setState({ message: text })}
                            value={this.state.message}
                        />
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
    title: "Single Chat"
};

const mapStateToProps = state => ({
    messages: state.chat.messages,
    user: state.chat.user
});

const mapDispatchToProps = dispatch => {
    return {
        ioNewMessage: cb => dispatch(onNewMessage(cb))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleChatScreen);

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
        display: "flex"
    },
    messagesContainer: {},
    chatMessage: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginBottom: 10,
        maxWidth: "70%"
    },
    ownMessage: {
        alignSelf: "flex-end",
        backgroundColor: `${styleVariables.PRIMARY_COLOR}30`
    },
    comingMessage: {
        alignSelf: "flex-start",
        backgroundColor: "rgba(0, 0, 0, .06)"
    }
});
