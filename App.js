import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import GameStartScreen from './screens/GameStartScreen';
import { LinearGradient } from "expo-linear-gradient";
import { useState } from 'react';
import GameScreen from './screens/GameScreen'
import GameOverScreen from './screens/GameOverScreen'


export default function App() {
const [userNumber, setUserNumber] = useState(null);
const [gameIsOver, setGameIsOver] = useState(true)
function sendedNumberHandler(sendedNumber){
  setUserNumber(sendedNumber);
  setGameIsOver(false);
}
function gameOverHandler(){
  setGameIsOver(true);
}
let screen = <GameStartScreen onSendNumber={sendedNumberHandler} />;

if(userNumber){
  screen = <GameScreen userNumber={userNumber} onGameOver={gameOverHandler}/>;
}
 
if(gameIsOver && userNumber){
  screen = <GameOverScreen />;
}

  return (
    <LinearGradient
      style={styles.container}
      colors={["rgba(0,0,0,0.8)", "transparent"]}
    >
      <ImageBackground
        style={styles.container}
        source={require("../Game/assets/pexels-monica-713149.jpg")}
        imageStyle={styles.backImage}
      >
        {screen}
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backImage:{
    opacity: 0.2,
  }
});
