import React, { useState } from "react";

// TODO: Import the following items from the 'react-native' library: Image, Text, View, and TouchableOpacity.

import { styles } from "../constants/Styles";
import { nameToPic } from "../constants/Constants";
import { useEffect } from "react";
import { shuffle } from "../utils/ArrayUtils";
import { Image, View, Text, TouchableOpacity } from "react-native";
import { ImageBackground } from "react-native-web";

const names = Object.keys(nameToPic);

export default function GameScreen() {
  // TODO: Declare and initialize state variables here, using "useState".
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [correctName, setCorrectName] = useState("");
  const [currentNameOptions, setCurrentNameOptions] = useState([]);
  const [currentImage, setCurrentImage] = useState();

  // State for the timer is handled for you.
  const [timeLeft, setTimeLeft] = useState(5000); 

  // Called by the timer every 10 seconds
  const countDown = () => {
    if (timeLeft > 0) {
      // Time still left, so decrement time state variable
      setTimeLeft(timeLeft - 10);
    } else {
      // Time has expired
      // TODO: update appropriate state variables
      setTotalQuestions(totalQuestions + 1);

    }
  };

  // This is used in the useEffect(...) hook bound on a specific STATE variable.
  // It updates state to present a new member & name options.
  const getNextRound = () => {
    // Fetches the next member name to guess.
    let correct = names[Math.floor(Math.random() * names.length)];
    let correctName = nameToPic[correct][0];
    let correctImage = nameToPic[correct][1];

    // Generate 3 more wrong answers.
    let nameOptions = [correctName];
    while (nameOptions.length < 4) {
      let wrong = names[Math.floor(Math.random() * names.length)];
      let wrongName = nameToPic[wrong][0];
      if (!nameOptions.includes(wrongName)) {
        nameOptions.push(wrongName);
      }
    }
    nameOptions = shuffle(nameOptions);

    // TODO: Update state here.
    setCorrectName(correctName);
    setCurrentNameOptions(nameOptions);
    setCurrentImage(correctImage);

    setTimeLeft(5000);
  };

  // Called when user taps a name option.
  // TODO: Update correct # and total # state values.
  const selectedNameChoice = (index) => {
    if (currentNameOptions[index] == correctName) {
      setTotalCorrect(totalCorrect + 1);
      setTotalQuestions(totalQuestions + 1);
    } else {
      setTotalQuestions(totalQuestions + 1);
    }
  };

  // Call the countDown() method every 10 milliseconds.
  useEffect(() => {
    const timer = setInterval(() => countDown(), 10);
    return function cleanup() {
      clearInterval(timer);
    };
  });

  // TODO: Finish this useEffect() hook such that we automatically
  // get the next round when the appropriate state variable changes.
  useEffect(
    () => {
      getNextRound();
    },
    [
      /* TODO: Your State Variable Goes Here */
      totalQuestions
    ]
  );

  // Set up four name button components
  const nameButtons = [];
  for (let i = 0; i < 4; i++) {
    const j = i;
    nameButtons.push(
      // A button is just a Text component wrapped in a TouchableOpacity component.
      <TouchableOpacity
        key={j}
        style={styles.button}
        onPress={() => selectedNameChoice(j)}
      >
        <Text style={styles.buttonText}>
          {currentNameOptions[i]}
        </Text>
      </TouchableOpacity>
    );
  }

  const timeRemainingStr = (timeLeft / 1000).toFixed(2);

  // Style & return the view.
  return (
    <View>
      {/* TODO: Build out your UI using Text and Image components. */}
      <Text>Current Score: {totalCorrect}/{totalQuestions}</Text>
      <Text>Time Remaining: {timeLeft}</Text>
      <Image source={currentImage} style={{width: 200, height: 200}}/>
      
      {/* Hint: What does the nameButtons list above hold? 
          What types of objects is this list storing?
          Try to get a sense of what's going on in the for loop above. */
          nameButtons          
      }
    </View>
  );
}
