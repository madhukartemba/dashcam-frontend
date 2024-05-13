import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { updateUrl } from '../redux/action';

function Settings() {

    const currentUrl = useSelector((state: any) => state.urlReducer);

    const [url, setUrl] = useState(currentUrl);

    const dispatcher = useDispatch();

    const handleUrlUpdate = () => {
        dispatcher(updateUrl(url));
        Alert.alert('URL Updated', 'The URL has been updated successfully.');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Server URL</Text>
            <TextInput
                value={url}
                onChangeText={(text) => setUrl(text)}
                style={styles.input}
            />
            <Button title="Update URL" onPress={handleUrlUpdate} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
    },
    text: {
        color: 'white',
        marginBottom: 10,
    },
    input: {
        color: 'white',
        borderWidth: 3,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        width: '50%',
    },
});

export default Settings;
