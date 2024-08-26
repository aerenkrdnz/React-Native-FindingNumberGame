import { StyleSheet, Text, View, Alert } from 'react-native';
import React, { useEffect,useState } from 'react';
import Title from '../components/Title';
import ComputerNumber from '../components/ComputerNumber.js';
import CustomButton from "../components/CustomButton.js";
import AntDesign from '@expo/vector-icons/AntDesign';

let minNumber = 1;
let maxNumber = 100;

export default function GameScreen({userNumber,onGameOver}) {
  const initialGuess = generateNumber(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess)

 useEffect(()=>{
  if(currentGuess === userNumber){
    onGameOver();
  }
 },[currentGuess,userNumber,onGameOver]);

  function nextGuessHandler(direction){

    if (
      (direction === "lower" && currentGuess < userNumber) ||
      (direction === "greater" && currentGuess > userNumber)
    ){
      Alert.alert("Yanlış!", "Yanlış olduğunu bile bile basıyorsun!...", [
        { text: "Tamam", style: "cancel" },
      ]);
      return;
    }

      if (direction === "lower") {
        maxNumber = currentGuess;
      } else {
        minNumber = currentGuess + 1;
      }
    const newRandomNumber = generateNumber(minNumber, maxNumber, currentGuess);
    setCurrentGuess(newRandomNumber);
  }

  function generateNumber(min,max,exclude){
    const randomNumber = Math.floor(Math.random() * (max - min)) + min;

    if(randomNumber === exclude){
      randomNumber(min,max,exclude)
    }
    else{
      return randomNumber;
    }
  }
  return (
    <View style={styles.container}>
      <Title>Bilgisayar Tahmini</Title>
      <ComputerNumber>{currentGuess}</ComputerNumber>
      <View style={styles.card}>
        <Text style={styles.title}>Altında mı üstünde mi?</Text>
        <View style={styles.buttonsContainer}>
          <CustomButton onPress={nextGuessHandler.bind(this, "lower")}>
            <AntDesign name="minuscircle" size={34} color="black" />
          </CustomButton>
          <CustomButton onPress={nextGuessHandler.bind(this, "greater")}>
            <AntDesign name="pluscircle" size={34} color="black" />
          </CustomButton>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "orange",
    padding: 16,
    marginTop: 15,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
    borderRadius:20,
    alignItems:'center'
  },
  title:{
    color:'white',
    fontSize:20,
    marginBottom:15,
  }
});
