import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from 'expo-router';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Placeholder Data
const MOCK_STATS = {
  totalEntries: 0,
  dayStreak: 0,
  longestStreak: 0,
  totalWords: 0,
  username: "User's Name",
};


const StatItem = ({ label, value, isLarge = false }) => (
  <View style={[styles.statItem, isLarge ? styles.TotalEntriesStat : styles.StreakStat]}>
    <Text style={isLarge ? styles.TotalEntriesValue : styles.StreakValue}>
      {value.toLocaleString()}
    </Text>
    <Text style={isLarge ? styles.TotalEntriesLabel : styles.StreakLabel}>
      {label}
    </Text>
  </View>
);

//Profile
const Profile = () => {
  const navigation = useNavigation();
  const router = useRouter();

  // Function to handle log out and redirect to the Login screen
  const handleLogout = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Log Out",
          style: "destructive",
          onPress: () => {
            router.replace("/login"); 
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        <Text style={styles.Header}>PROFILE</Text>

        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            {/* The image is shown as a grey circle in the wireframe */}
          </View>
          <Text style={styles.username}>{MOCK_STATS.username}</Text>
          <TouchableOpacity style={styles.editNameButton}>
            <Ionicons name="pencil-outline" size={16} color="black" />
            <Text style={styles.editNameText}>Edit</Text>
          </TouchableOpacity>
        </View>

        {/* Journal Stats Section */}
        <View style={styles.statsContainer}>
          {/* Total Entries (Large block) */}
          <StatItem 
            label="Total Entries" 
            value={MOCK_STATS.totalEntries} 
            isLarge={true} 
          />
          
          {/* Day Streak and Longest Streak (Side-by-side) */}
          <View style={styles.statsRowTwo}>
            <StatItem 
              label="Day Streak" 
              value={MOCK_STATS.dayStreak} 
              isLarge={false} 
            />
            <StatItem 
              label="Longest Streak" 
              value={MOCK_STATS.longestStreak} 
              isLarge={false} 
            />
          </View>

          {/* Total Words Written */}
          <View style={styles.wordsWrittenContainer}>
            <Text style={styles.wordsWrittenText}>Total Words Written</Text>
            <View style={styles.wordsWrittenLine} />
          </View>
        </View>

        {/* Log Out */}
        <View style={styles.logoutContainer}>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <MaterialCommunityIcons name="logout" size={24} color="black" /> 
              <Text style={styles.logoutText}>LOG OUT</Text>
            </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

// Stylesheet
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    padding: 15,
  },
  Header: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: 'black'
  },
  headerSeparator: {
    height: 1,
    backgroundColor: 'black',
    marginBottom: 20,
  },
  
  profileSection: {
    alignItems: "center",
    marginBottom: 40,
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#ccc", 
    marginBottom: 10,
  },
  username: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 5,
  },
  editNameButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    borderBottomWidth: 1, 
    borderColor: 'black',
    width: '30%',
    justifyContent: 'center',
    marginTop: 5,
  },
  editNameText: {
    fontSize: 14,
    color: "black",
    marginLeft: 5,
  },

  statsContainer: {
    marginBottom: 40,
  },
  statsRowTwo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  statItem: {
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: '#ccc', 
    borderRadius: 10,
  },
  TotalEntriesStat: {
    width: '100%', 
    height: 120, 
  },
  StreakStat: {
    width: '48%', 
    height: 100,
  },
  TotalEntriesValue: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
  },
  TotalEntriesLabel: {
    fontSize: 16,
    color: "black",
    textAlign: 'center',
    marginTop: 5,
  },
  StreakValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
  },
  StreakLabel: {
    fontSize: 14,
    color: "black",
    textAlign: 'center',
    marginTop: 5,
  },

  wordsWrittenContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  wordsWrittenText: {
    fontSize: 14,
    color: 'black',
    marginBottom: 5,
  },
  wordsWrittenLine: {
    width: '80%', 
    height: 1,
    backgroundColor: 'black',
  },

  
  logoutContainer: {
    alignItems: 'center',
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 50,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  logoutText: {
    fontSize: 18,
    color: "black",
    fontWeight: "600",
    marginLeft: 5,
  },
});

export default Profile;