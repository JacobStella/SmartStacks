import React from "react";
import {StyleSheet, Text, View} from 'react-native';
import Page from "./Page";

export default class Layout extends React.Component{

    render(){
        return(
            <View style = {styles.container}>
                    <Page></Page>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
           
        
    }
});

