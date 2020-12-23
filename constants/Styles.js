import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      paddingHorizontal: 10,
    },
    button: {
      alignItems: "center",
      marginTop: 20,
      paddingVertical: 10,
      paddingHorizontal: 10,
      backgroundColor: "#3498db"
    }, 
    image: {
      justifyContent: 'center', 
      margin: 10,
      height: "30%",
      width: "100%",
      resizeMode: "contain",
    },
    buttonText: {
      fontFamily: "Avenir",
      fontWeight: "600",
      fontSize: 18,
      color: "white"
    },
    timerText: {
      fontFamily: "Avenir",
      fontWeight: "700",
      fontSize: 24,
      color: "#e74c3c",
      textAlign: "center",
      marginBottom: 30
    },
    scoreText: {
      fontFamily: "Avenir",
      fontWeight: "700",
      fontSize: 24,
      color: "#3498db",
      textAlign: "center",
      marginBottom: 10
    }
});

export { styles }