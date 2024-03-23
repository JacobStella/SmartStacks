import React, {useState} from "react";
import {Button, StyleSheet, TextInput, SafeAreaView, View, Text} from "react-native"

const Library = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Library</Text>
            <View style={styles.subheader}>
                <Text style={styles.subheaderTitleLeft}>Classes</Text>
            </View>
            <View style={styles.line} />
            <View style={styles.subheader}>
                <Text style={styles.subheaderTitle}>Stacks</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingTop: 50,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBotton: 20,
    },
    subheader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    subheaderTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: 10,
    },
    subheaderTitleLeft: {
        fontSize: 20,
        fontWeight: "bold",
    },
    line: {
        borderBottomWidth: 1,
        borderColor: "black",
        width: "100%",
        marginBottom: 10,
    },
});

export default Library;