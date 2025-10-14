import { Link } from 'expo-router'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const index = () => {
  return (
    <View style={styles.container}>
      <View style={styles.HomeLogoContainer}>
        <Image
        source = {require("../assets/images/logo.png")}
        style={styles.HomeLogo}
        />
      </View>
      <View style={styles.HomeTextContainer}>
        <Text style={styles.HomeText}>Your story starts here</Text>
      </View>

      <Link href="/login" asChild>
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
      </Link>

      <Link href="/signup" asChild>
      <TouchableOpacity style={styles.signupButton}>
        <Text style={styles.signupButtonText}>Sign Up</Text>
      </TouchableOpacity>
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  HomeLogoContainer: {
    // blank
  },
  HomeLogo: {
    marginTop: 200,
    marginHorizontal: "85",
    width: 200,
    height: 200,
  },
  HomeTextContainer: {
    // blank    
  },
  HomeText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 15,  
  },
  loginButton: {
    backgroundColor: "black",
    marginHorizontal: 30,
    marginTop: 40,
    borderRadius: 11,
    paddingVertical: 15,
    alignItems: "center",
    elevation: 2,
  },
  loginButtonText: {
    color: "white",
  },
  signupButton: {
    backgroundColor: "#3C3148",
    marginHorizontal: 30,
    marginTop: 20,
    borderRadius: 11,
    paddingVertical: 15,
    alignItems: "center",
    elevation: 2,
  },
  signupButtonText: {
    color: "white",
  },
})

export default index