
 
import React, { useState } from 'react';
import { View, Text, Modal, Pressable, StyleSheet, Button } from 'react-native';
import ImageMapper from 'react-native-image-mapper';
import { Video, AVPlaybackStatus } from 'expo-av';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';


const FRONT = 0;
const BACK = 1;
let side = FRONT;

const getRandomColor = () => {
  //Function to return random color
  //To highlight the mapping area
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (var i = 0; i < 6; i++)
    color += letters[Math.floor(Math.random() * 16)];
  return color;
};
 
function ImageApp () {
  


  //Video Stuff
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});


  // Image Changing
  const [selectedAreaId, setSelectedAreaId] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState("");
  const [muscleGroups, setMuscleGroups] = useState(MAPS[mapIndex]);
  const [baseImg ,setBaseImg] = useState("https://raw.githubusercontent.com/msalo3/react-native-image-mapper/master/Examples/human.png");

  const useMap0 = () => {
    if (side === FRONT) {
      mapIndex = 0;
    } else if (side === BACK) {
      mapIndex = 3;
    }
    setMuscleGroups(MAPS[mapIndex]);

  };

  const useMap1 = () => {
    if (side === FRONT) {
      mapIndex = 1;
    } else if (side === BACK) {
      mapIndex = 4;
    }
    setMuscleGroups(MAPS[mapIndex]);
  };

  const useMap2 = () => {
    if (side === FRONT) {
      mapIndex = 2;
    } else if (side === BACK) {
      mapIndex = 5;
    }
    setMuscleGroups(MAPS[mapIndex]);
  };

  const swapBase = () => {
    if (side === FRONT) {
      side = BACK;
      setBaseImg("https://media.istockphoto.com/photos/human-body-skin-and-muscles-picture-id173604905")
      setMuscleGroups(MAPS[mapIndex+3]);
      mapIndex+=3;
    }
    else if (side === BACK) {
      side = FRONT;
      setBaseImg("https://raw.githubusercontent.com/msalo3/react-native-image-mapper/master/Examples/human.png");
      setMuscleGroups(MAPS[mapIndex-3]);
      mapIndex-=3;
    }
  };

  
 
  const mapperAreaClickHandler = async (item, idx, event) => {
    const currentSelectedAreaId = selectedAreaId;
    if (Array.isArray(currentSelectedAreaId)) {
      const indexInState = currentSelectedAreaId.indexOf(item.id);

      // First tap
      if (indexInState !== -1) {
        console.log('Removing id', item.id);
        setSelectedAreaId([
          ...currentSelectedAreaId.slice(0, indexInState),
          ...currentSelectedAreaId.slice(indexInState + 1),
        ]);
      } 
      // Second tap
      else {
        
        //alert(`Clicked Item Id: ${item.id}`);
        console.log('Setting Id', item.id);
        setSelectedAreaId([...currentSelectedAreaId, item.id]);
        setModalText(item.name);
        setModalVisible(true);

        //T1



      }
    } else {
      if (item.id === currentSelectedAreaId) {
        setSelectedAreaId(null);
      } else {
        setSelectedAreaId(item.id);
      }
    }
  };
 

  return (
    <View style={{ flex: 1, alignItems: 'center', padding: 30 }}>
      <Button onPress={swapBase} title="swap" color ="#0000FF"></Button>

      <Text
        style={{
          fontSize: 30,
          textAlign: 'center',
          marginTop: 20
        }}>
        Options
      </Text>
      <View style={styles.row}>
        <Button onPress={useMap0} title="Push" color="#841584"/>
        <Button onPress={useMap1} title="Legs" color="#841584"/>
        <Button onPress={useMap2} title="Other" color="#841584"/>
      </View>
      
      
      
      
      <ImageMapper
        imgHeight={551}
        imgWidth={244}
        imgSource={{
          uri: baseImg,
        }}
        imgMap = {muscleGroups}
        onPress={
          (item, idx, event) => 
            // TO DO ON PRESS FUNCTION ZOOM IN
            
            mapperAreaClickHandler(item, idx, event)
            
        }
        containerStyle={{ top: 10 }}
        selectedAreaId={selectedAreaId}
        multiselect
      >
        
      </ImageMapper>
      


      <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{modalText}</Text>

            
            <View style={styles.container}>
              <Video
                ref={video}
                style={styles.video}
                source={{
                  uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
                }}
                useNativeControls
                resizeMode="contain"
                isLooping
                onPlaybackStatusUpdate={status => setStatus(() => status)}
              />
              <View style={styles.buttons}>
                <Button
                  title={status.isPlaying ? 'Pause' : 'Play'}
                  onPress={() =>
                    status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
                  }
                />
              </View>
            </View>

           
            
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>


    </View>
    
  );
 
};
 
export default ImageApp;
 
// Maps to Create Clickable Areas

const PUSH_MAP_FRONT = [
  {
    id: '9',
    name: 'Chest',
    shape: 'rectangle',
    x2: 165,
    y2: 150,
    x1: 70,
    y1: 110,
    prefill: getRandomColor(),
    fill: 'blue',
  },
  {
    id: '10',
    name: 'Left Shoulder',
    shape: 'rectangle',
    x2: 65,
    y2: 130,
    x1: 40,
    y1: 90,
    prefill: getRandomColor(),
    fill: 'blue',
  },
  {
    id: '11',
    name: 'Right Shoulder',
    shape: 'rectangle',
    x2: 195,
    y2: 130,
    x1: 170,
    y1: 90,
    prefill: getRandomColor(),
    fill: 'blue',
  },
  {
    id: '12',
    name: 'Left Tricep',
    shape: 'rectangle',
    x2: 55,
    y2: 180,
    x1: 30,
    y1: 140,
    prefill: getRandomColor(),
    fill: 'blue',
  },
  {
    id: '13',
    name: 'Right Tricep',
    shape: 'rectangle',
    x2: 205,
    y2: 180,
    x1: 180,
    y1: 140,
    prefill: getRandomColor(),
    fill: 'blue',
  },
]

const LEG_MAP_FRONT = [
  {
    id: '14',
    name: 'Left Quad',
    shape: 'rectangle',
    x2: 110,
    y2: 350,
    x1: 70,
    y1: 250,
    prefill: getRandomColor(),
    fill: 'blue',
  },
  {
    id: '15',
    name: 'Right Quad',
    shape: 'rectangle',
    x2: 165,
    y2: 350,
    x1: 125,
    y1: 250,
    prefill: getRandomColor(),
    fill: 'blue',
  },
  {
    id: '16',
    name: 'Left Calf',
    shape: 'rectangle',
    x2: 110,
    y2: 500,
    x1: 80,
    y1: 400,
    prefill: getRandomColor(),
    fill: 'blue',
  },
  {
    id: '17',
    name: 'Right Calf',
    shape: 'rectangle',
    x2: 155,
    y2: 500,
    x1: 125,
    y1: 400,
    prefill: getRandomColor(),
    fill: 'blue',
  },
]


const RECTANGLE_MAP_FRONT = [
  {
    id: '0',
    name: 'Left Foot',
    shape: 'rectangle',
    x2: 110,
    y2: 540,
    x1: 80,
    y1: 500,
    prefill: getRandomColor(),
    fill: 'blue',
  },
  {
    id: '1',
    name: 'Right Foot',
    shape: 'rectangle',
    x2: 155,
    y2: 540,
    x1: 125,
    y1: 500,
    prefill: getRandomColor(),
    fill: 'blue',
  },
  {
    id: '2',
    name: 'Left Knee',
    shape: 'rectangle',
    x2: 110,
    y2: 400,
    x1: 80,
    y1: 370,
    prefill: getRandomColor(),
    fill: 'blue',
  },
  {
    id: '3',
    name: 'Right Knee',
    shape: 'rectangle',
    x2: 155,
    y2: 400,
    x1: 125,
    y1: 370,
    prefill: getRandomColor(),
    fill: 'blue',
  },
  {
    id: '4',
    name: 'Stomach',
    shape: 'rectangle',
    x2: 155,
    y2: 240,
    x1: 80,
    y1: 165,
    prefill: getRandomColor(),
    fill: 'blue',
  },
  {
    id: '5',
    name: 'Left Hand',
    shape: 'rectangle',
    x2: 40,
    y2: 315,
    x1: 5,
    y1: 250,
    prefill: getRandomColor(),
    fill: 'blue',
  },
  {
    id: '6',
    name: 'Right Hand',
    shape: 'rectangle',
    x2: 235,
    y2: 315,
    x1: 200,
    y1: 250,
    prefill: getRandomColor(),
    fill: 'blue',
  },
  {
    id: '7',
    name: 'Face',
    shape: 'rectangle',
    x2: 145,
    y2: 70,
    x1: 90,
    y1: 30,
    prefill: getRandomColor(),
    fill: 'blue',
  },
  {
    id: '8',
    name: 'Head',
    shape: 'rectangle',
    x2: 145,
    y2: 30,
    x1: 90,
    y1: 0,
    prefill: getRandomColor(),
    fill: 'blue',
  },
];

const PUSH_MAP_BACK = [
  {
    id: '10',
    name: 'Left Shoulder',
    shape: 'rectangle',
    x2: 65,
    y2: 130,
    x1: 40,
    y1: 90,
    prefill: getRandomColor(),
    fill: 'blue',
  },
  {
    id: '11',
    name: 'Right Shoulder',
    shape: 'rectangle',
    x2: 195,
    y2: 130,
    x1: 170,
    y1: 90,
    prefill: getRandomColor(),
    fill: 'blue',
  },
  {
    id: '12',
    name: 'Left Tricep',
    shape: 'rectangle',
    x2: 55,
    y2: 180,
    x1: 30,
    y1: 140,
    prefill: getRandomColor(),
    fill: 'blue',
  },
  {
    id: '13',
    name: 'Right Tricep',
    shape: 'rectangle',
    x2: 205,
    y2: 180,
    x1: 180,
    y1: 140,
    prefill: getRandomColor(),
    fill: 'blue',
  },
]

const LEG_MAP_BACK = [
  {
    id: '14',
    name: 'Left Quad',
    shape: 'rectangle',
    x2: 110,
    y2: 370,
    x1: 70,
    y1: 280,
    prefill: getRandomColor(),
    fill: 'blue',
  },
  {
    id: '15',
    name: 'Right Quad',
    shape: 'rectangle',
    x2: 165,
    y2: 370,
    x1: 125,
    y1: 280,
    prefill: getRandomColor(),
    fill: 'blue',
  },
  {
    id: '16',
    name: 'Left Calf',
    shape: 'rectangle',
    x2: 110,
    y2: 500,
    x1: 80,
    y1: 400,
    prefill: getRandomColor(),
    fill: 'blue',
  },
  {
    id: '17',
    name: 'Right Calf',
    shape: 'rectangle',
    x2: 155,
    y2: 500,
    x1: 125,
    y1: 400,
    prefill: getRandomColor(),
    fill: 'blue',
  },
]


const RECTANGLE_MAP_BACK = [
  {
    id: '0',
    name: 'Left Foot',
    shape: 'rectangle',
    x2: 110,
    y2: 540,
    x1: 80,
    y1: 500,
    prefill: getRandomColor(),
    fill: 'blue',
  },
  {
    id: '1',
    name: 'Right Foot',
    shape: 'rectangle',
    x2: 155,
    y2: 540,
    x1: 125,
    y1: 500,
    prefill: getRandomColor(),
    fill: 'blue',
  },
  {
    id: '2',
    name: 'Left Knee',
    shape: 'rectangle',
    x2: 110,
    y2: 400,
    x1: 80,
    y1: 370,
    prefill: getRandomColor(),
    fill: 'blue',
  },
  {
    id: '3',
    name: 'Right Knee',
    shape: 'rectangle',
    x2: 155,
    y2: 400,
    x1: 125,
    y1: 370,
    prefill: getRandomColor(),
    fill: 'blue',
  },
  {
    id: '4',
    name: 'Stomach',
    shape: 'rectangle',
    x2: 155,
    y2: 240,
    x1: 80,
    y1: 165,
    prefill: getRandomColor(),
    fill: 'blue',
  },
  {
    id: '5',
    name: 'Left Hand',
    shape: 'rectangle',
    x2: 40,
    y2: 315,
    x1: 5,
    y1: 250,
    prefill: getRandomColor(),
    fill: 'blue',
  },
  {
    id: '6',
    name: 'Right Hand',
    shape: 'rectangle',
    x2: 235,
    y2: 315,
    x1: 200,
    y1: 250,
    prefill: getRandomColor(),
    fill: 'blue',
  },
  {
    id: '7',
    name: 'Face',
    shape: 'rectangle',
    x2: 145,
    y2: 70,
    x1: 90,
    y1: 30,
    prefill: getRandomColor(),
    fill: 'blue',
  },
  {
    id: '8',
    name: 'Head',
    shape: 'rectangle',
    x2: 145,
    y2: 30,
    x1: 90,
    y1: 0,
    prefill: getRandomColor(),
    fill: 'blue',
  },
];

const MAPS = [PUSH_MAP_FRONT, LEG_MAP_FRONT, RECTANGLE_MAP_FRONT,PUSH_MAP_BACK, LEG_MAP_BACK, RECTANGLE_MAP_BACK];
let mapIndex = 0;


// StyleSheet
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 16,
    textAlign: "center"
  },




  row: {
    flexDirection: "row",
  },

  container: {
    maxHeight: '100%',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  video: {
    alignSelf: 'center',
    width: 320, //320 vs 200
    height: 200,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
});