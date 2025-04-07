import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';

const RegisterScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        // Проверка на заполненность полей
        console.log('handleRegister вызван');
        if (!username || !password) {
            Alert.alert('Ошибка', 'Пожалуйста, заполните все поля.');
            return;
        }

        try {
            const response = await axios.post('http://192.168.0.109:8081/register', { username, password });
            if (response.data.success) {
                Alert.alert('Успех', response.data.message);
                navigation.navigate('Login');
            } else {
                Alert.alert('Ошибка', response.data.error);
            }
        } catch (error) {
            Alert.alert('Ошибка', error.response ? error.response.data.error : 'Произошла ошибка при соединении с сервером.');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Имя пользователя"
                value={username}
                onChangeText={setUsername}
                style={styles.input}
            />
            <TextInput
                placeholder="Пароль"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                style={styles.input}
            />
            <Button title="Зарегистрироваться" onPress={handleRegister} />
            <Button title="Перейти к авторизации" onPress={() => navigation.navigate('Login')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    input: {
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
    },
});

export default RegisterScreen;
