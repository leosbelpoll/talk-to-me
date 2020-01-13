import React from 'react';
import { TouchableOpacity, StyleSheet, Text, SafeAreaView, View, FlatList } from 'react-native';

function Item({ user, onSelect }) {
    return (
        <TouchableOpacity onPress={() => onSelect(user)}>
        <View style={styles.item}>
            <Text style={styles.title}>{user.username}</Text>
        </View>
        </TouchableOpacity>
    );
}

export default function ListUsersScreen(props) {

    const users = [{username: "Freya", id: "1"}, {username: "Valentina", id: "2"}, {username: "Ohio", id: "3"}]
    const {navigate} = props.navigation;

    const onSelect = React.useCallback(
    user => {
        navigate("SingleChat")
    });

    return (
    <SafeAreaView style={styles.container}>
        <FlatList
        data={users}
        renderItem={({ item }) => 
            <Item user={item} onSelect={onSelect} />}
        keyExtractor={item => item.id}
        />
    </SafeAreaView>
    );
}

ListUsersScreen.navigationOptions = {
title: 'ListUsers',
};

const styles = StyleSheet.create({
container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
},
item: {
    backgroundColor: '#c0c0c0',
    padding: 10,
    marginVertical: 4,
    marginHorizontal: 8,
},
title: {
    fontSize: 32,
},
});
