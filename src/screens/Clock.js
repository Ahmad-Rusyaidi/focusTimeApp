import { StyleSheet, Text, View, StatusBar, Vibration, SafeAreaView, Platform} from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react'
import { colors } from '../utils/colors'
import { Countdown } from '../components/Countdown'
import { useKeepAwake } from 'expo-keep-awake'
import { RoundedButton } from '../components/RoundedButton';
import { spacing } from '../utils/sizes';

const ONE_SECONDS_IN_MS = 1000;
const PATTERN = [
    1 * ONE_SECONDS_IN_MS,
    1 * ONE_SECONDS_IN_MS,
    1 * ONE_SECONDS_IN_MS,
    1 * ONE_SECONDS_IN_MS,
    1 * ONE_SECONDS_IN_MS,
];

const Clock = ({route, navigation}) => {

    useKeepAwake();
    const [isStarted, setIsStarted] = useState(false);
    const [progress, setProgress] = useState(1);
    const [minutes, setMinutes] = useState(0.1);
    const { data } = route.params ?? {}; //provide an empty object as a default

    const handleButtonPress = () => {
        resetCountdown();
    };

    const resetCountdown = () => {
        setMinutes(0.1); // Reset the countdown minutes to the initial value
        if (isStarted) {
          setIsStarted(false); // Pause the countdown if it's running
        }
    };

    const onEnd = () =>{
        Vibration.vibrate(PATTERN);
        setIsStarted(false);
        setProgress(1);

        if (data) {
            // Navigate back to the 'FocusTimeApp' screen and pass the subject data
            navigation.navigate('FocusTimeApp', { data });
        }
    };



    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.clockContainer}>
                <Countdown
                minutes={ minutes } 
                onEnd = { onEnd }
                isPaused={!isStarted}
                onProgress = { setProgress }
                reset={ resetCountdown }
                />
                <View style={{paddingTop: spacing.xxl}}>
                    <Text style={styles.title}>Focusing on:</Text>
                    <Text style={styles.task}>{ data }</Text>
                </View>
            </View>
            <View style={{paddingTop: spacing.sm}}>
                <ProgressBar
                progress={ progress }
                style={{ height: spacing.sm }}
                color={colors.progressBar}
                />
            </View>
            <View style={styles.buttonWrapper}>
                {!isStarted && <RoundedButton 
                onPress={() => setIsStarted(true)}
                title="start"/>}
                {isStarted && <RoundedButton 
                onPress={() => setIsStarted(false)}
                title="pause"/>}
                <RoundedButton 
                style={styles.clearB}
                onPress={handleButtonPress}
                title="clear"/>
            </View>
            <View style={styles.timingWrapper}>
                <View style={styles.timingB}>
                    <RoundedButton
                    onPress={() => setMinutes(10)}
                    title="10"
                    size={75}
                    />
                </View>
                <View style={styles.timingB}>
                    <RoundedButton
                    onPress={() => setMinutes(20)}
                    title="20"
                    size={75}
                    />
                </View>
                <View style={styles.timingB}>
                    <RoundedButton
                    onPress={() => setMinutes(15)}
                    title="15"
                    size={75}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

export default Clock

const styles = StyleSheet.create({
    
    timingB:{
        flex: 1,
        alignItems: 'center',
    },
    
    task: {
        color: colors.white,
        textAlign: 'center',
    },
    
    title: {
        color: colors.white,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    timingWrapper:{
        flex: 0.1,
        flexDirection: 'row',
        paddingTop: spacing.lg,
    },
    
    buttonWrapper:{
        flex: 0.3,
        flexDirection: 'row',
        padding: spacing.md,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },

    clockContainer: {
        flex: 0.5,
        alignItems: 'center',
        paddingTop: 25,
    },
    
    container: {
        flex: 1,
        backgroundColor: colors.darkBlue,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight: 0,
    },
});
