import { FontAwesome, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from 'expo-router';
import {
  Alert,
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

// **StatItem component has been removed**

const Profile = () => {
  const router = useRouter();

  // Logout function
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
    
    <View style={styles.container}>
      
      <Text style={styles.Header}>PROFILE</Text>

      <View style={styles.profileSection}>
        <View style={styles.profileImageContainer}>
          <FontAwesome name="user-circle" size={100} color="#808080" />
        </View>
        <Text style={styles.username}>{MOCK_STATS.username}</Text>
        <TouchableOpacity style={styles.editNameButton}>
          <Ionicons name="pencil-outline" size={16} color="black" />
          <Text style={styles.editNameText}>Edit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        {/* Total Entries*/}
        <View style={[styles.statItemBase, styles.TotalEntriesStat]}>
          <Text style={styles.TotalEntriesValue}>
            {MOCK_STATS.totalEntries.toLocaleString()}
          </Text>
          <Text style={styles.TotalEntriesLabel}>
            Total Entries
          </Text>
        </View>
        
        <View style={styles.statsRowTwo}>
          {/* Day Streak */}
          <View style={[styles.statItemBase, styles.StreakStat]}>
            <Text style={styles.StreakValue}>
              {MOCK_STATS.dayStreak.toLocaleString()}
            </Text>
            <Text style={styles.StreakLabel}>
              Day Streak
            </Text>
          </View>
          
          {/* Longest Streak */}
          <View style={[styles.statItemBase, styles.StreakStat]}>
            <Text style={styles.StreakValue}>
              {MOCK_STATS.longestStreak.toLocaleString()}
            </Text>
            <Text style={styles.StreakLabel}>
              Longest Streak
            </Text>
          </View>
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
  );
};


const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "white", 
    paddingTop: 55, 
    paddingHorizontal: 20 
  }, 
  Header: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: 'black'
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 40,
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#ffffffff", 
    marginBottom: 10,
  },
  username: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 5,
    color: 'black',
  },
  editNameButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    borderBottomWidth: 1, 
    borderColor: 'black',
    width: '80%',
    justifyContent: 'center',
    marginTop: 5,
  },
  editNameText: {
    fontSize: 14,
    color: "black",
    marginLeft: 5,
  },
  
  //Stats
  statsContainer: {
    marginBottom: 40,
  },
  statsRowTwo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  statItemBase: { 
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: "#f4f4f4", 
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
  StreakValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
  },
  TotalEntriesLabel: {
    fontSize: 15,
    color: "black",
    textAlign: 'center',
    marginTop: 5,
  },
  StreakLabel: {
    fontSize: 14,
    color: "black",
    textAlign: 'center',
    marginTop: 5,
  },
  
  //Total Words
  wordsWrittenContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  wordsWrittenText: {
    fontsize: 15,
    color: 'black',
    marginBottom: 5,
  },
  wordsWrittenLine: {
    width: '80%', 
    height: 1,
    backgroundColor: 'black',
  },

  //Logout
  logoutContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  logoutText: {
    fontSize: 15,
    color: "black",
    fontWeight: "600",
    marginLeft: 5,
  },
});

export default Profile;