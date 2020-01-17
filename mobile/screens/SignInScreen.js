import React from "react";
import { ScrollView, StyleSheet, Button, View, TextInput } from "react-native";
import { connect } from "react-redux";
import uuid from "uuid";

import {
    onConnect,
    onNewMessage,
    onUpdatedUsers,
    onNewUserConnected,
    onUserDisconnected
} from "../actions/chatAction";
import configs from "../configs";

export function SignInScreen(props) {
    const { navigate } = props.navigation;
    const [username, setUsername] = React.useState("");

    const connect = () => {
        const { ioConnect, ioNewMessage, ioUpdatedUsers, ioNewUserConnected, ioUserDisconnected } = props;
        const URL = configs["SERVER_URL"];

        ioConnect(URL, {
            id: uuid(),
            username,
            slogan: "Default slogan for now"
        });

        ioUpdatedUsers();
        ioNewUserConnected();
        ioNewMessage();
        ioUserDisconnected();
        navigate("Main");
    };

    return (
        <ScrollView style={styles.container}>
            {/**
             * Go ahead and delete ExpoLinksView and replace it with your content;
             * we just wanted to provide you with some helpful links.
             */}
            <View>
                <TextInput
                    style={styles.textInput}
                    onChangeText={text => setUsername(text)}
                    value={username}
                    placeholder={"Enter your name"}
                />
                <Button title="Connect" onPress={() => connect()} />
            </View>
        </ScrollView>
    );
}

SignInScreen.navigationOptions = {
    title: "Please sign in"
};

const mapStateToProps = state => {
    return {
        connected: state.chat.status === "connect" || state.chat.status === "join" ? true : false,
        messages: state.chat.messages
    };
};

const mapDispatchToProps = dispatch => {
    return {
        ioConnect: (url, query) => dispatch(onConnect(url, query)),
        ioNewMessage: cb => dispatch(onNewMessage(cb)),
        ioUpdatedUsers: cb => dispatch(onUpdatedUsers()),
        ioNewUserConnected: cb => dispatch(onNewUserConnected()),
        ioUserDisconnected: cb => dispatch(onUserDisconnected())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: "#fff"
    },
    textInput: {
        height: 40,
        borderColor: "rgba(0, 0, 0, .2)",
        borderWidth: 1,
        marginTop: 15,
        marginBottom: 15,
        padding: 10
    }
});
