import * as React from 'react';
import { useState, useEffect } from "react";
import { Text, View, ScrollView } from "react-native";

import styles from "../styles/style";

import ButtonReloadScreen from "../components/ButtonReloadScreen";

export default function DriverScreen({ navigation }) {

    const [drivers, setDrivers] = useState([]);

    useEffect(() => {
        listDrivers();
    })

    const listDrivers = () => {
        fetch("http://localhost:3000/listarmotoristas")
            .then((response) => { return response.json() })
            .then((data) => {
                setDrivers(data);
            })
    }

    // Atualiza tela manualmente
    const reloadScreen = () => {
        location.reload()
    }


    return (
        <View style={styles.container}>
            <ScrollView>
            <ButtonReloadScreen value="RECARREGAR PÁGINA" onPress={() => { reloadScreen() }}/>
                {drivers.map((driver, index) => {
                    return (
                        <View style={styles.boxOrder} key={index}>
                            <Text style={styles.orderData}>Id: {driver.id}</Text>
                            <Text style={styles.orderData}>Motorista: {driver.name}</Text>
                            <Text style={styles.orderData}>Licença: {driver.licence}</Text>
                            <Text style={styles.orderData}>Disponível: {driver.availability === true? 'Disponível':'Indisponível'}</Text>
                        </View>

                    );
                })}
            </ScrollView>
        </View>
    );
}