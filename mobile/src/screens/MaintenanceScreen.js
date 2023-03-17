import * as React from 'react';
import { useState, useEffect } from "react";
import { Text, View, ScrollView } from "react-native";

import styles from "../styles/style";

import ButtonReloadScreen from "../components/ButtonReloadScreen";

export default function MaintenanceScreen({ navigation }) {

    const [maintenance, setMaintenance] = useState([]);

    useEffect(() => {
        listMaintenance();
    })

    const listMaintenance = () => {
        fetch("http://localhost:3000/listarmanutencoes")
            .then((response) => { return response.json() })
            .then((data) => {
                setMaintenance(data);
            })
    }

    const reloadScreen = () => {
        location.reload()
    }

    return (
        <View style={styles.container}>
            <ScrollView>
            <ButtonReloadScreen value="RECARREGAR PÁGINA" onPress={() => { reloadScreen() }}/>
                {maintenance.map((repair, index) => {
                    if(repair.checkout == null) {
                        let formatedDateIn = repair.checkin.toLocaleString('pt-BR', { timeZone: 'UTC-3' }).split('T')[0]
                        return (
                            <View style={styles.boxOrder} key={index}>
                                <Text style={styles.orderData}>Id: {repair.id}</Text>
                                <Text style={styles.orderData}>Entrada: {formatedDateIn}</Text>
                                <Text style={styles.orderData}>Descrição: {repair.description}</Text>
                                <Text style={styles.orderData}>Preço: {repair.cost}</Text>
                                <Text style={styles.orderData}>Id do Veículo: {repair.vehicle.id}</Text>
                                <Text style={styles.orderData}>Tipo: {repair.vehicle.type}</Text>
                                <Text style={styles.orderData}>Placa: {repair.vehicle.plate}</Text>
                            </View>
                        );
                    }else {
                        let formatedDateIn = repair.checkin.toLocaleString('pt-BR', { timeZone: 'UTC-3' }).split('T')[0]
                        let formatedDateOut = repair.checkout.toLocaleString('pt-BR', { timeZone: 'UTC-3' }).split('T')[0]
                        return (
                            <View style={styles.boxOrder} key={index}>
                                <Text style={styles.orderData}>Id: {repair.id}</Text>
                                <Text style={styles.orderData}>Entrada: {formatedDateIn}</Text>
                                <Text style={styles.orderData}>Saída: {formatedDateOut}</Text>
                                <Text style={styles.orderData}>Descrição: {repair.description}</Text>
                                <Text style={styles.orderData}>Preço: {repair.cost}</Text>
                                <Text style={styles.orderData}>Id do Veículo: {repair.vehicle.id}</Text>
                                <Text style={styles.orderData}>Tipo: {repair.vehicle.type}</Text>
                                <Text style={styles.orderData}>Placa: {repair.vehicle.plate}</Text>
                            </View>
                        );
                    };
                })}
            </ScrollView>
        </View>
    );
}