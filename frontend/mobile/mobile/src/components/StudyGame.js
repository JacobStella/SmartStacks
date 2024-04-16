import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

function StudyGame() {
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 28}}>This will be the Study Game page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 28,
  },
});

export default StudyGame;