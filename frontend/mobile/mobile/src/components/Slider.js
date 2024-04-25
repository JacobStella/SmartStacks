import React, {useRef, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  View,
  ImageBackground,
  Animated,
  useWindowDimensions,
  Image,
  LogBox,
} from 'react-native';
import sample from '../../../assets/sample.png';
import BrowseCap from '../../../assets/BrowseCap.png'
import CreateCap from '../../../assets/CreateCap.png'
import LibraryCap from '../../../assets/LibraryCap.png'

LogBox.ignoreAllLogs();

const images = [
  <Image source = {CreateCap}></Image>,
  <Image source = {LibraryCap}></Image>,
  <Image source = {BrowseCap}></Image>,
];

const messages =  ["Make your own study stacks in the create page", "View and organize your personal stacks in the Library page", "Find public stacks made by other users in the Browse page", "Try a new study strategy in the Game page with a matching game"];

const Slider = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [imageIdx, setImageIdx] = useState(0);

  const {width: windowWidth} = useWindowDimensions();
  const handler = (event) =>{
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.scrollContainer}>
        <ScrollView
          horizontal={true}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          decelerationRate="fast"
          snapToInterval={windowWidth*0.80}
          onMomentumScrollEnd={handler}
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX,
                },
              },
            },
          ])}
          scrollEventThrottle={1}>
          {images.map((image, imageIndex) => {
            return (
              <View style={{width: windowWidth*.80, height: 600}} key={imageIndex}>
                <ImageBackground source={images[imageIndex].props.source} style={[styles.card, {width: '100%', height: '100%'}]} resizeMode= 'center'>
                </ImageBackground>
                <Text style = {styles.infoText}>{messages[imageIndex]}</Text>
              </View>
            );
          })}
        </ScrollView>
        
        <View style={styles.indicatorContainer}>
          {images.map((image, imageIndex) => {
            const width = scrollX.interpolate({
              inputRange: [
                windowWidth*0.80 * (imageIndex - 1),
                windowWidth *0.80 *imageIndex,
                windowWidth *0.80* (imageIndex + 1),
              ],
              outputRange: [8, 16, 8],
              extrapolate: 'clamp',
            });
            return (
              <Animated.View
                key={imageIndex}
                style={[styles.normalDot, {width}]}
              />
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  scrollContainer: {
    height: '120%',
    backgroundColor: '#D8DCFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    flex: 1,
    borderRadius: 5,
    backgroundColor: '#172A3A',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    backgroundColor: 'rgba(0,0,0, 0.7)',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 5,
  },
  infoText: {
    color: '#172A3A',
    alignSelf: 'center',
    fontSize: 24,
    marginBottom: 100,
    fontWeight: 'bold',
    height: '20%'
  },
  normalDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: '#172A3A',
    marginHorizontal: 4,
  },
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Slider;