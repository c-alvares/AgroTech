import { TouchableOpacity, Text } from "react-native";

import styles from '../styles/style';

export default function ButtonReloadScreen(props) {
    const { value, onPress } = props;
    
    return (
        <TouchableOpacity style={styles.btn1} onPress={() => {onPress()}}>
            <Text style={styles.textBtn1}>{value}</Text>
        </TouchableOpacity>
    )
}