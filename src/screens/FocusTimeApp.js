import { StyleSheet, Text, View, StatusBar, FlatList, TouchableOpacity, SafeAreaView, Platform} from 'react-native';
import { TextInput } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import React, { useState, useEffect } from 'react'
import { colors } from '../utils/colors'
import { RoundedButton } from '../components/RoundedButton';
import { fontSizes, spacing } from '../utils/sizes';

const FocusTimeApp = ({navigation}) => {

    //if(!history || !history.length) return null;

    const [text, setText] = useState(null);
    const [history, setHistory] = useState([]);
    const route = useRoute();

    const renderItem = ({item}) => <Text style={styles.item}>-  {item}</Text>

    // Use the useEffect hook to reset the text when the screen receives focus
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
        // Reset the text to null when the screen receives focus
        setText(null);
        });

        // Return a cleanup function to remove the listener when the component unmounts
        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        // Check if there's data in the route parameters and add it to the history
        if (route.params?.data) {
          setHistory([...history, route.params.data]);
        }
      }, [route.params?.data]);

    const handleButtonPress = () => {
        // You can navigate to the 'Clock' screen and pass the data here.
        navigation.navigate('Clock', { data: text });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                onChangeText={(newText) => setText(newText)}
                value={text}
                style={styles.textInput}
                label="What would you like to focus on?"
                />
                <View style={styles.button}>
                    <RoundedButton
                    onPress={handleButtonPress}
                    size={60}
                    title="+"
                    />
                </View>
            </View>
            <View style={styles.itemContainer}>
                <Text style={styles.title}>Things we've focused on:</Text>
                <FlatList 
                data={history}
                renderItem={renderItem}
                />
            </View>
        </SafeAreaView>
    );
}

export default FocusTimeApp

const styles = StyleSheet.create({
    
    itemContainer:{
        padding: spacing.md,
        flex: 1,
    },
    
    item:{
        fontSize: spacing.md,
        color: colors.white,
        paddingTop: spacing.sm,
    },
    
    title:{
        color: colors.white,
        fontSize: fontSizes.md,
        fontWeight: 'bold',
    },
    
    button: {
        justifyContent: 'center',
    },
    
    textInput:{
        flex: 1,
        marginRight: spacing.sm,
    },
    
    text:{
        color: colors.white,
    },

    inputContainer: {
        padding: spacing.lg,
        justifyContent: 'top',
        flexDirection: 'row',
    },
    
    container: {
        flex: 1,
        backgroundColor: colors.darkBlue,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight: 0,
    },
});
