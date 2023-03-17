import * as React from 'react';
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Text, View, TextInput, Button } from "react-native";

import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from "../styles/style";

export default function LoginScreen({ navigation }) {
    // Recebimento dos dados inseridos nos inputs para login
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const saveData = async (data) => {
        await AsyncStorage.setItem('data', data);

    }
    // saveData(.id_entregador)
 
    const logIn = () => {
        // console.log(username, password)
        const options = {
            "method": "POST",
            "headers": { "Content-Type": "application/json" },
            "body": JSON.stringify(
                {
                    "username": username,
                    "password": password
                })
        };
        fetch("http://localhost:3000/acessar", options)
            .then((response) => response.status)
            .then((resp) => {
                if (resp === 200) {
                    // console.log("Acesso liberado");
                    navigation.navigate('Home')
                } else {
                    // console.log(resp.status)
                }
            })
    }


    return (
        <View style={styles.container}>
            <Text>AGROTECH</Text>

            <TextInput style={styles.loginsInput}
                onChangeText={(value) => { setUsername(value) }}
                placeholder="Insira seu e-mail"
                placeholderTextColor="#CCC">
            </TextInput>

            <TextInput style={styles.loginsInput}
                onChangeText={(value) => { setPassword(value) }}
                placeholder="Insira sua senha"
                placeholderTextColor="#CCC">
            </TextInput>

            <StatusBar style="auto" />

            <Button
                title="Acessar"
                onPress={() => { logIn() }}
            />
        </View>
    )
}