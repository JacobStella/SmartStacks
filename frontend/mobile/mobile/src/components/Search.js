import * as React from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

function Search ({navigation}) {
  return (
    <SafeAreaView style={{flex: 1, marginHorizontal: '5%'}}>
      <TextInput placeholder='Search' clearButtonMode='always' />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Search;