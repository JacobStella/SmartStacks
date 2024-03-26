import React, {useState} from "react";
import {Button, StyleSheet, TextInput, SafeAreaView, View, Text} from "react-native"

const Library = ({navigation}) => {
    return (
        
        <View style={styles.container}>
            <Text style={styles.title}>Library</Text>
            <View style={styles.subheader}>
                <Text style={styles.subheaderTitle}>Classes</Text>
            </View>
            <View style={styles.iconContainer}>
                <View style={{flexDirection: 'column'}}>
                    <View style={styles.iconOutline}>
                        <Text>This is where the images/previews will go</Text>
                    </View>
                    <Text style={styles.iconTitle}>Title</Text>
                </View>
                <View style={{flexDirection: 'column'}}>
                    <View style={styles.iconOutline}>
                        <Text>Will put the respective URL for boxes as well</Text>
                    </View>
                    <Text style={styles.iconTitle}>Title</Text>
                </View>
            </View>
            <View style={styles.line} />
            <View style={styles.subheader}>
                <Text style={styles.subheaderTitle}>Stacks</Text>
            </View>
            <View style={styles.iconContainer}>
                <View style={{flexDirection: 'column'}}>
                    <View style={styles.iconOutline}>
                        <Text>Might consider not using iconOutline</Text>
                    </View>
                    <Text style={styles.iconTitle}>Title</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'flex-start',
        paddingHorizontal: 20,
        paddingTop: 50,
    },
    title: {
        fontSize: 35,
        fontWeight: 'bold',
        color: 'purple',
        textAlignVertical: 'top',
        marginBottom: 50,
    },
    subheader: {
        flexDirection: 'row',
    },
    subheaderTitle: {
        flex:1,
        fontSize: 28,
        fontWeight: 'bold',
        color: 'red',
        marginLeft: 10,
        marginBottom: 10
    },
    iconContainer: {
        flexDirection: 'row',
        paddingLeft: 10,
    },
    iconOutline: {
        width: 100,
        height: 70,
        backgroundColor: 'yellow',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 5,
        paddingRight: 5,
        marginBottom: 5,
        marginRight: 20,
    },
    iconTitle: {
        fontSize: 16,
        textDecorationLine: 'underline',
        fontWeight: 'bold',
        textAlign: 'center',
        justifyContent: 'center',
        paddingRight: 30,
        marginBottom: 20,

    },
    line: {
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth,
        alignSelf: 'stretch',
        marginBottom: 20,
    },
});

export default Library;