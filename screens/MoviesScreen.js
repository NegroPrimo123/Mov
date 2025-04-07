// MoviesScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import axios from 'axios';

const MoviesScreen = ({ navigation }) => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get('http://192.168.0.109:8081/movies?userId=1');
                setMovies(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchMovies();
    }, []);

    return (
        <View>
            <Text>Movies List:</Text>
            {movies.map(movie => (
                <Text key={movie.id}>{movie.title}</Text>
            ))}
            <Button title="Logout" onPress={() => navigation.navigate('Login')} />
        </View>
    );
};

export default MoviesScreen;
