import { FontAwesome } from '@expo/vector-icons'
import { Link, useRouter } from 'expo-router'
import { useState } from 'react'
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

const Login = () => {
  const [securePassword, setSecurePassword] = useState(true)

  const router = useRouter();
  const handleLogin = () => {
    router.replace("/(tabs)/home");
  };

  return (
    <View style={styles.Container}>
      <View style={styles.LoginLogoContainer}>
        <Image
        source = {require("../assets/images/logo1.png")}
        style={styles.LoginLogo}
        />
      </View>

      <View style={styles.emailContainer}>
        <Text style={styles.emailAddressText}>Enter email address</Text>
        <View style={styles.emailAddressContainer}>
          <FontAwesome
            name="user"
            size={18}
            style={styles.emailAddressIcon}
          />
          <TextInput
            style={styles.emailAddressInput}
            keyboardType="email-address"
            placeholder="example@email.com"
          />
        </View>
      </View>

      <View style={styles.passContainer}>
        <Text style={styles.passwordText}>Enter password</Text>
        <View style={styles.passwordContainer}>
          <FontAwesome
            name="lock"
            size={18}
            style={styles.passwordIcon}
          />
          <TextInput
            style={styles.passwordInput}
            placeholder="••••••••"
            secureTextEntry={securePassword}
          />
          <TouchableOpacity onPress={() => setSecurePassword(!securePassword)}>
            <FontAwesome
              name={securePassword ? "eye-slash" : "eye"}
              size={18}
              color="#000"
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.forgotPassContainer}>
        <Link href="/forgotPassword">
        <Text style={styles.forgotPassText}>Forgot password?</Text>
        </Link>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.signupTextContainer}>
        <Text style={styles.signupText}>Don't have an account?</Text>
        <Link href="/signup">
        <Text style={styles.signupLink}> Sign Up</Text>
        </Link>
      </View>

      <Text style={styles.orText}>or</Text>
      
      <View style={styles.googleButtonContainer}>
        <Image
        source = {require("../assets/images/google.png")}
        style={styles.GoogleLogo}
        />
        <TouchableOpacity>
        <Text style={styles.googleText}>Continue with Google</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.FBButtonContainer}>
        <Image
        source = {require("../assets/images/facebook.png")}
        style={styles.FacebookLogo}
        />
        <TouchableOpacity style={styles.contFBButton}>
        <Text style={styles.FBText}>Continue with Facebook</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  Container: {
    backgroundColor: "white",
    flex: 1,
  },
  LoginLogoContainer: {
    marginTop: 70,
    alignItems: "center",
  },
  LoginLogo: {
    position: "absolute",
    width: 80,
    height: 80,
  },

  emailContainer: {
    marginTop: 130,
  },
  emailAddressText: {
    fontSize: 15,
    marginLeft: 30,
    marginBottom: 5,
  },
  emailAddressContainer: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    marginHorizontal: 30,
    marginVertical: 5,
    elevation: 2,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  emailAddressIcon: {
    marginLeft: 5,
  },
  emailAddressInput: {
    flex: 1,
    paddingVertical: 10,
    marginLeft: 15,
  },

  passContainer: {
    marginTop: 15,
  },
  passwordText: {
    fontSize: 15,
    marginLeft: 30,
    marginBottom: 5,
  },
  passwordContainer: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    marginHorizontal: 30,
    marginVertical: 5,
    elevation: 2,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  passwordIcon: {
    marginLeft: 5,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 10,
    marginLeft: 15,
  },
  eyeIcon: {
    marginRight: 5,
  },
  loginButton: {
    backgroundColor: "black",
    marginHorizontal: 30,
    marginVertical: 20,
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
    elevation: 2,
  },
  loginButtonText: {
    color: "white",
    fontWeight: "600",
  },
  signupTextContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  signupLink: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#4A90E2"
  },
  forgotPassContainer: {
    marginTop: 20,
    marginLeft: 230,
  },
  forgotPassText: {
    fontWeight: "bold",
  },
  orText: {
    textAlign: "center",
    marginTop: 15,
  },
  googleButtonContainer: {
    backgroundColor: "white",
    flexDirection: "row",
    marginHorizontal: 30,
    marginVertical: 20,
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
    elevation: 2,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  GoogleLogo: {
    width: 20,  
    height: 20,
    marginRight: 10, 
    resizeMode: "contain",
  },
  FBButtonContainer: {
    backgroundColor: "white",
    flexDirection: "row",
    marginHorizontal: 30,
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
    elevation: 2,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  FacebookLogo: {
    width: 23, 
    height: 23,
    marginRight: 10,
    resizeMode: "contain",
  },
  googleText: {
    fontWeight: "bold",
  },
  FBText: {
    fontWeight: "bold",
  },
})

export default Login