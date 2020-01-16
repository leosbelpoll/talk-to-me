import React, {Component} from 'react';
import {
    Button,
    ScrollView,
    StyleSheet,
    Text,
    View,
    TextInput,
    YellowBox
} from 'react-native';
import { connect } from 'react-redux';

import {
    onConnect,
    onCreateMessage,
    onNewMessage
} from "../actions/chatAction";
import configs from "../configs";

YellowBox.ignoreWarnings([
    'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
]);

export class HomeScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            message: ""
        };
    }

    connect = () => {
        const { ioConnect, ioNewMessage } = this.props;
        const { username } = this.state;
        const  URL = configs["SERVER_URL"];

        ioConnect(URL, {
            username,
            slogan: "Default slogan for now"
        });

        ioNewMessage();
    };

    sendMessage = () => {
        const { message, username } = this.state;
        const { all } = this.props;
        onCreateMessage("anonymous", {
            message,
            username
        })
    };

    render() {
        const { connected, messages } = this.props;
        return (
            <View style={styles.container}>
                {!connected && (
                    <View>
                        <TextInput style={styles.textInput}
                                   onChangeText={text => this.setState({username: text})}
                                   value={this.state.username}
                                   placeholder={"Enter your name"}
                        />
                        <Button onPress={this.connect} title={"Connect"}/>
                    </View>
                )}
                {connected && (
                    <View>
                        <TextInput style={styles.textInput}
                                   onChangeText={text => this.setState({message: text})}
                                   value={this.state.message}
                                   placeholder={"Write your message"}
                        />
                        <Button
                            onPress={this.sendMessage}
                            title={`Send message ${this.state.username}`}
                            color="#1e1e1e"
                        />
                        <ScrollView style={styles.messageList}>
                            {messages.map(({id, data: { message, username }}) => (
                                <Text key={id} style={styles.messageContainer}>
                                    <Text style={styles.messageUsername}>{username}:</Text> {message}
                                </Text>
                            ))}
                        </ScrollView>
                    </View>
                )}
            </View>
        );
    }
}

HomeScreen.navigationOptions = {
    title: 'Users',
    };

const mapStateToProps = state => {
    return {
        connected: (state.chat.status === "connect" || state.chat.status === "join") ? true : false,
        messages: state.chat.messages
    };
};

const mapDispatchToProps = dispatch => {
    return {
        ioConnect: (url, query) => dispatch(onConnect(url, query)),
        ioNewMessage: (cb) => dispatch(onNewMessage(cb))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20
    },
    textInput: {
        height: 40,
        borderColor: 'rgba(0, 0, 0, .2)',
        borderWidth: 1,
        marginTop: 15,
        marginBottom: 15,
        padding: 10
    },
    messageList: {
        marginTop: 10,
        marginBottom: 10
    },
    messageContainer: {
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomColor: 'rgba(0, 0, 0, .3)'
    },
    messageUsername: {
        fontWeight: 'bold'
    }
});
