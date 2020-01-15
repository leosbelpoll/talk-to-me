import React from 'react';
import { TouchableOpacity, StyleSheet, Text, SafeAreaView, View, FlatList, Image, Button } from 'react-native';
import { connect } from 'react-redux';

import { fetchUsers } from "../actions/usersAction";

function Item({ user, onSelect }) {
    return (
        <TouchableOpacity
            onPress={() => onSelect(user)}
            key={user.id}>
            <View style={styles.item}>
                <View style={styles.leftSide}>
                    <Image
                        style={styles.itemImage}
                        source={{uri: `https://api.adorable.io/avatars/204/${user.id}.png`}}
                    />
                </View>
                <View style={styles.rightSide}>
                    <Text style={styles.name}>{user.username}</Text>
                    <Text style={styles.slogan}>{user.slogan}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

export function UsersListScreen(props) {

    const { users, fetchUsers } = props;

    const {navigate} = props.navigation;

    const onSelect = React.useCallback(
        user => {
            navigate("SingleChat", user)
        });

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={users}
                renderItem={({ item }) =>
                    <Item user={item} onSelect={onSelect} />}
                keyExtractor={item => item.id}
            />
            <View>
                <Button
                    title="Search users"
                    onPress={() => fetchUsers()}/>
            </View>
        </SafeAreaView>

    );
}

UsersListScreen.navigationOptions = {
    title: 'UsersList',
};

const mapStateToProps = state => ({
    users: state.users.users
});

export default connect(mapStateToProps, { fetchUsers })(UsersListScreen)

const styles = StyleSheet.create({
    container: {

    },
    item: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        borderBottomColor: 'rgba(0, 0, 0, .06)',
        borderBottomWidth: 1,
    },
    name: {
        fontWeight: 'bold',
    },
    slogan: {
        color: 'rgba(0, 0, 0, .6)'
    },
    itemImage: {
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        overflow: "hidden",
    },
    leftSide: {
        width: 50,
        marginRight: 20
    },
    rightSide: {
        paddingTop: 3,
    }
});
