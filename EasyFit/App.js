import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ZoomableImage from './ZoomableImage';
import { LogBox } from 'react-native';
import VideoComp from './VideoComp';


const annotations = [
	{
		x1: 27,
		x2: 35,
		y1: 25,
		y2: 30,
		description: 'Biceps',
	},
	{
		x1: 55,
		x2: 70,
		y1: 12,
		y2: 25,
		description: 'Shoulders',
	},
	{
		x1: 50,
		x2: 30,
		y1: 10, //50
		y2: 60,//60
		description: '???',
	},
	{
		x1: 20,
		x2: 75,
		y1: 10, 
		y2: 30,
		description: 'chest',
	},
]

export default function App() {
	
  return (
    <View style={styles.container}>
      <Text>Workout App, initial setup done?!</Text>

      <ZoomableImage
					source={require('./public/front-view-3.jpg')}
					imageHeight={ 600 }
					imageWidth={ 450 }
					annotations={annotations}
					popOverStyles={ { backgroundColor: 'white' } }
      />


      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Vidcontainer: {
	flex: 1,
	backgroundColor: '#fff',
	alignItems: 'center',
	justifyContent: 'center',
},
video: {
	flex: 1,
	alignSelf: 'stretch'
},
});
