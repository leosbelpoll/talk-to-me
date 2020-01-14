import React, {Component} from 'react';
import {
    Button,
    ScrollView,
    StyleSheet,
    Text,
    View,
    TextInput,
    Alert,
    YellowBox
} from 'react-native';

YellowBox.ignoreWarnings([
    'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
]);

import io from 'socket.io-client';

import configs from '../configs';

export default class HomeScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            message: "",
            username: "",
            messages: [],
            connected: false,
            location: null
        }
    }

    findCoordinates = () => {
        navigator.geolocation.watchPosition(
            position => {

                this.socket.emit("setLocation", { ...position });
            },
            error => Alert.alert(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1 }
        );
    };

    connect = () => {
        const URL = configs["SERVER_URL"];
        const { username } = this.state;
        this.findCoordinates()
        this.socket = io.connect(URL, {
            query: {
                username
            }
        });
        this.socket.on("connect", () => {
            this.setState({
                connected: true
            });
        });
        this.socket.on("disconnect", () => {
            this.setState({
                connected: false
            });
        });
        this.socket.on("connect_failed", e => {
            this.setState({
                connected: false
            });
            this.socket.disconnect();
            this.handleError("connect_failed");
        });
        this.socket.on("connect_error", e => {
            this.setState({
                connected: false
            });
            this.socket.disconnect();
            this.handleError("connect_error");
        });
        this.socket.on("arrivedMessage", message => {
            this.setState((state) => {
                return {
                    messages: [message, ...state.messages]
                }
            })
        })
    };

    sendMessage = () => {
        const { message } = this.state;
        try {
            this.socket.emit("sendMessage", { message });
        } catch (e) {
            this.handleError(e);
        }
    };

    handleError = message => {
        this.setState({
            connected: false
        });
        Alert.alert("ERROR", message);
    };

    render() {
        const { connected } = this.state;
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
                    </View>
                )}
                <ScrollView style={styles.messageList}>
                    {this.state.messages.map(item => (
                        <Text key={item.id} style={styles.messageContainer}>
                            <Text style={styles.messageUsername}>{item.username}:</Text> {item.message}
                        </Text>
                    ))}
                </ScrollView>
            </View>
        );
    }
}

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
