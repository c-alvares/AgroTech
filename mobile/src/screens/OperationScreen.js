import * as React from 'react';
import { useState, useEffect } from "react";
import { Text, View, ScrollView } from "react-native";

import styles from "../styles/style";

import ButtonReloadScreen from "../components/ButtonReloadScreen";

export default function OperationScreen({ navigation }) {

    const [operation, setOperation] = useState([]);

    useEffect(() => {
        listOperation();
    })

    const listOperation = () => {
        fetch("http://localhost:3000/listaroperacoes")
            .then((response) => { return response.json() })
            .then((data) => {
                setOperation(data);
            })
    }

    const reloadScreen = () => {
        location.reload()
    }

    return (
        <View style={styles.container}>
            <ScrollView>
            <ButtonReloadScreen value="RECARREGAR PÁGINA" onPress={() => { reloadScreen() }}/>
                {operation.map((action, index) => {
                    if(action.arrival == null) {
                        let formatedDateIn = action.departure.toLocaleString('pt-BR', { timeZone: 'UTC-3' }).split('T')[0]
                        return (
                            <View style={styles.boxOrder} key={index}>
                                <Text style={styles.orderData}>Id: {action.id}</Text>
                                <Text style={styles.orderData}>Partida: {formatedDateIn}</Text>
                                <Text style={styles.orderData}>Chegada: PENDENTE</Text>
                                <Text style={styles.orderData}>Descrição: {action.description}</Text>
                                <Text style={styles.orderData}>Id do Motorista: {action.driver.id}</Text>
                                <Text style={styles.orderData}>Motorista: {action.driver.name}</Text>
                                <Text style={styles.orderData}>Licença: {action.driver.licence}</Text>
                                <Text style={styles.orderData}>Id do Veículo: {action.vehicle.id}</Text>
                                <Text style={styles.orderData}>Tipo: {action.vehicle.type}</Text>
                                <Text style={styles.orderData}>Placa: {action.vehicle.plate}</Text>
                            </View>
                        );
                    }else {
                        let formatedDateIn = action.departure.toLocaleString('pt-BR', { timeZone: 'UTC-3' }).split('T')[0]
                        let formatedDateOut = action.arrival.toLocaleString('pt-BR', { timeZone: 'UTC-3' }).split('T')[0]
                        return (
                            <View style={styles.boxOrder} key={index}>
                                <Text style={styles.orderData}>Id: {action.id}</Text>
                                <Text style={styles.orderData}>Partida: {formatedDateIn}</Text>
                                <Text style={styles.orderData}>Chegada: {formatedDateOut}</Text>
                                <Text style={styles.orderData}>Descrição: {action.description}</Text>
                                <Text style={styles.orderData}>Id do Motorista: {action.driver.id}</Text>
                                <Text style={styles.orderData}>Motorista: {action.driver.name}</Text>
                                <Text style={styles.orderData}>Licença: {action.driver.licence}</Text>
                                <Text style={styles.orderData}>Id do Veículo: {action.vehicle.id}</Text>
                                <Text style={styles.orderData}>Tipo: {action.vehicle.type}</Text>
                                <Text style={styles.orderData}>Placa: {action.vehicle.plate}</Text>
                            </View>
                        );
                    };
                })}
            </ScrollView>
        </View>
    );
}