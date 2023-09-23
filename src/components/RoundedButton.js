import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '../utils/colors';

export const RoundedButton = ({
    style = {},
    textStyle = {},
    size = 125,
    ...props
}) => {
    return (
        <TouchableOpacity 
        onPress={props.onPress}
        style={[styles(size).radius, style]}>
            <Text style={[styles(size).text, textStyle]}>{props.title}</Text>
        </TouchableOpacity>
    )
};

const styles = (size) => ({
    radius:{
        borderRadius: size / 2,
        width: size,
        height: size,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: colors.white,
        borderWidth: 2,
    },

    text: {
        color: colors.white,
        fontSize: size / 3,
    },
});