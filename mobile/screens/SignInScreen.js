    import React from 'react';
    import { ScrollView, StyleSheet, Button, View, TextInput } from 'react-native';

    export default function SignInScreen(props) {
    const {navigate} = props.navigation;
    return (
        <ScrollView style={styles.container}>
        {/**
         * Go ahead and delete ExpoLinksView and replace it with your content;
         * we just wanted to provide you with some helpful links.
         */}
            <View>
                <TextInput style={styles.textInput}
                            placeholder={"Enter your name"}
                />
                <Button title="Connect" onPress={() => navigate("Main")}/>
            </View> 
        </ScrollView>
    );
    }

    SignInScreen.navigationOptions = {
    title: 'Please sign in',
    };

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
    },
    textInput: {
        height: 40,
        borderColor: 'rgba(0, 0, 0, .2)',
        borderWidth: 1,
        marginTop: 15,
        marginBottom: 15,
        padding: 10
    },
    });