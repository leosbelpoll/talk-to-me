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
    static navigationOptions = ({ navigation }) => {
        const user = navigation.state.params;
        return {
            title: user.username,
            // headerTitle: () => <Item user={user} />,
            headerRight: () => <Button onPress={() => alert("This is a button!")} title="Edit" />
        };
    };

    constructor(props) {
        super(props);
        this.user = props.navigation.state.params;
        this.state = {
            message: "",
            messages: []
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
            username: this.props.currentUser.username
        });
    };

    render() {
        const { currentUser, messages } = this.props;
        console.log(messages[0]);
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
                                    username === currentUser.username
                                        ? styles.ownMessage
                                        : styles.comingMessage,
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
                            onEndEditing={this.sendMessage}
                        />
                        <Button
                            onPress={this.sendMessage}
                            title={`Send`}
                            color={styleVariables.PRIMARY_COLOR}
                        />
                    </View>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const mapStateToProps = state => ({
    messages: state.chat.messages,
    currentUser: state.chat.user
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
