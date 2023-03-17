import * as React from 'react';
import { useState, useEffect } from "react";
import { Text, View, ScrollView } from "react-native";

import styles from "../styles/style";

import ButtonReloadScreen from "../components/ButtonReloadScreen";

export default function FleetScreen({ navigation }) {

    const [fleet, setFleet] = useState([]);

    useEffect(() => {
        listFleet();
    })

    const listFleet = () => {
        fetch("http://localhost:3000/listarfrota")
            .then((response) => { return response.json() })
            .then((data) => {
                setFleet(data);
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
                {fleet.map((vehicle, index) => {
                    return (
                        <View style={styles.boxOrder} key={index}>
                            <Text style={styles.orderData}>Id: {vehicle.id}</Text>
                            <Text style={styles.orderData}>Motorista: {vehicle.type}</Text>
                            <Text style={styles.orderData}>Licença: {vehicle.plate}</Text>
                            <Text style={styles.orderData}>Disponível: {vehicle.availability === true? 'Disponível':'Indisponível'}</Text>
                        </View>

                    );
                })}
            </ScrollView>
        </View>
    );
}