import { FontAwesome } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { CountryPicker } from "react-native-country-codes-picker";

const Signup = () => {
  const [securePassword, setSecurePassword] = useState(true)
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState('+63');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <ScrollView
      style={styles.Container}
      contentContainerStyle={{ flexGrow: 1, paddingBottom: 30 }}
    >
      <View style={styles.HomeLogoContainer}>
        <Image
        source = {require("../assets/images/logo1.png")}
        style={styles.HomeLogo}
        />
      </View>
      <View style={styles.NumberContainer}>
        <Text style={styles.enterNumberText}>Enter your mobile number</Text>
        <View style={styles.enterNumberContainer}>
          <TouchableOpacity 
            style={styles.countryCodeButton} 
            onPress={() => setShow(true)}
          >
            <Text style={styles.countryCodeText}>{countryCode}</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.numberInput}
            placeholder="Enter number"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>
        <CountryPicker
          show={show}
          pickerButtonOnPress={(item) => {
            setCountryCode(item.dial_code);
            setShow(false);
          }}
          onBackdropPress={() => setShow(false)}
          style={{
            modal: {
              height: '75%',
            },
            searchBar: {
              backgroundColor: '#f2f2f2',
              borderRadius: 8,
              marginHorizontal: 10,
              marginBottom: 10,
            },
          }}
          showSearch={true}
          searchMessage="Search country"
        />
      </View>

      <View style={styles.emailContainer}>
        <Text style={styles.emailAddressText}>Enter email address</Text>
        <View style={styles.emailAddressContainer}>
          <FontAwesome name="user" size={18} style={styles.emailAddressIcon} />
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
          <FontAwesome name="lock" size={18} style={styles.passwordIcon} />
          <TextInput
            style={styles.passwordInput}
            placeholder="••••••••"
            secureTextEntry={securePassword}
            value={password}
            onChangeText={setPassword}
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

        <Text style={styles.passwordText}>Re - Enter password</Text>
        <View style={styles.passwordContainer}>
          <FontAwesome name="lock" size={18} style={styles.passwordIcon} />
          <TextInput
            style={styles.passwordInput}
            placeholder="••••••••"
            secureTextEntry={securePassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
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

        {confirmPassword.length > 0 && confirmPassword !== password && (
          <Text style={styles.errorText}>Passwords do not match</Text>
        )}
      </View>

      <TouchableOpacity style={styles.loginButton}>
        <Link href="/login">
          <Text style={styles.loginButtonText}>Sign Up</Text>
        </Link>
      </TouchableOpacity>

      <View style={styles.signupTextContainer}>
        <Text style={styles.signupText}>Already have an account?</Text>
        <Link href="/login">
          <Text style={styles.signupLink}> Log In</Text>
        </Link>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  Container: {
    backgroundColor: "white",
    flex: 1,
  },
  HomeLogoContainer: {
    marginTop: 70,
    alignItems: 'center',
  },
  HomeLogo: {
    position: "absolute",
    width: 80,
    height: 80,
  },
  NumberContainer: {
    marginTop: 140,
  },
  enterNumberText: {
    fontSize: 15,
    marginLeft: 30,
    marginBottom: 5,
  },
  enterNumberContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    marginHorizontal: 30,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 11.84,
    paddingHorizontal: 10,
    paddingVertical: 5,
    elevation: 2,
    backgroundColor: "white",
  },
  countryCodeButton: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    paddingHorizontal: 5,
  },
  countryCodeText: {
    fontSize: 16,
    fontWeight: "500",
  },
  numberInput: {
    flex: 1,
    fontSize: 15,
  },
  emailContainer: {
    marginTop: 10,
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
    borderRadius: 11.84,
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
    marginTop: 10,
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
    borderRadius: 11.84,
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
  errorText: {
    color: 'red',
    fontSize: 13,
    marginLeft: 30,
    marginTop: 5,
  },
  loginButton: {
    backgroundColor: "black",
    marginHorizontal: 30,
    marginVertical: 20,
    borderRadius: 11,
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
    color: "#000"
  },
})

export default Signup