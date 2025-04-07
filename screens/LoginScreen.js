import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import axios from 'axios';

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        // Проверка на заполненность полей
        if (!username || !password) {
            Alert.alert('Ошибка', 'Пожалуйста, заполните все поля.');
            return;
        }

        try {
            const response = await axios.post('http://192.168.0.109:8081/login', { username, password });
            // Проверка ответа сервера
            if (response.data.success) {
                Alert.alert('Успех', response.data.message);
                navigation.navigate('Movies'); // Переход на экран фильмов
            } else {
                Alert.alert('Ошибка', response.data.error);
            }
        } catch (error) {
            // Обработка ошибок
            Alert.alert('Ошибка', error.response ? error.response.data.error : 'Произошла ошибка при соединении с сервером.');
        }
    };

    return (
        <View>
            <TextInput
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                style={{ marginBottom: 10, borderWidth: 1, borderColor: '#ccc', padding: 10 }}
            />
            <TextInput
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                style={{ marginBottom: 20, borderWidth: 1, borderColor: '#ccc', padding: 10 }}
            />
            <Button title="Login" onPress={handleLogin} />
            <Button title="Go to Register" onPress={() => navigation.navigate('Register')} />
        </View>
    );
};

export default LoginScreen;
