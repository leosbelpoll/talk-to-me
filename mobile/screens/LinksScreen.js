import React from "react";
import { ScrollView, StyleSheet, Button } from "react-native";

export default function LinksScreen(props) {
    const { navigate } = props.navigation;
    return (
        <ScrollView style={styles.container}>
            {/**
             * Go ahead and delete ExpoLinksView and replace it with your content;
             * we just wanted to provide you with some helpful links.
             */}
            <Button title="Go Chat" onPress={() => navigate("SingleChat", {username: "aaaa", id: 1111})} />
        </ScrollView>
    );
}

LinksScreen.navigationOptions = {
    title: "Links"
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: "#fff"
    }
});
