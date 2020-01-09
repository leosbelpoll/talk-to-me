import React, {Component} from 'react';
import {
    Button,
    ScrollView,
    StyleSheet,
    Text,
    View,
    TextInput
} from 'react-native';
import io from 'socket.io-client';

export default class HomeScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            message: "",
            username: "",
            messages: [],
            connected: false
        }
    }

    connect = () => {
        const URL = "http://192.168.1.2:3000";

        try{
            this.socket = io(URL);
            this.setState({
                connected: true
            })
            this.socket.on("arrivedMessage", message => {
                this.setState((state) => {
                    return {
                        messages: [message, ...state.messages]
                    }
                })
            })
        } catch (e) {
            Alert.alert("Error: A message connecting with server");
        }
    }

    sendMessage = () => {
        const { username, message } = this.state;
        this.socket.emit("sendMessage", { username, message });
    }

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
        // backgroundColor: '#fff',
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
