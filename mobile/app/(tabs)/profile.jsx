import { useRouter } from 'expo-router';
import {
  Image,
  StyleSheet,
  Text,
  View
} from "react-native";

// Card colors
const CARD_COLOR_1 = "#E6DDD4"; 
const CARD_COLOR_2 = "#E2CFB8"; 
const CARD_COLOR_3 = "#D7C8BB"; 
const CARD_COLOR_4 = "#f0dbd4"; 

// Placeholder Data
const MOCK_STATS = {
  totalEntries: 0,
  dayStreak: 0,
  longestStreak: 0,
  totalWords: 0,
  username: "User's Name",
  email: "user@gmail.com",
};

const Profile = () => {
  const router = useRouter();

  // // Logout function 
  // const handleLogout = () => {
  //   Alert.alert(
  //     "Log Out",
  //     "Are you sure you want to log out?",
  //     [
  //       { text: "Cancel", style: "cancel" },
  //       {
  //         text: "Log Out",
  //         style: "destructive",
  //         onPress: () => {
  //           router.replace("/login"); 
  //         },
  //       },
  //     ],
  //     { cancelable: true }
  //   );
  // };

  // Stats
  const StatCard = ({ label, value, color }) => (
    <View style={[styles.statCardBase, { backgroundColor: color }]}>
      <Text style={styles.statValue}>
        {value.toLocaleString()}
      </Text>
      <Text style={styles.statLabel}>
        {label}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      
      <Text style={styles.HeaderText}>Profile</Text>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.profileImageContainer}>
          <Image
            style={styles.profileImage}
          />
        </View>
        <Text style={styles.usernameImage}>{MOCK_STATS.username}</Text>
        <Text style={styles.emailText}>{MOCK_STATS.email}</Text>
      </View>
      {/* Stats */}
      <View style={styles.statsGrid}>
        <View style={styles.statsRow}>
            <StatCard label="Total Entries" value={MOCK_STATS.totalEntries} color={CARD_COLOR_1} />
            <StatCard label="Current Streak" value={MOCK_STATS.dayStreak} color={CARD_COLOR_2} />
        </View>
        <View style={styles.statsRow}>
            <StatCard label="Longest Streak" value={MOCK_STATS.longestStreak} color={CARD_COLOR_3} />
            <StatCard label="Total Words" value={MOCK_STATS.totalWords} color={CARD_COLOR_4} />
        </View>
      </View>
      {/* <View style={styles.logoutContainer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <MaterialCommunityIcons name="logout" size={24} color={DARK_TEXT} /> 
          <Text style={styles.logoutText}>LOG OUT</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};


const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#F8F4F1", 
    paddingTop: 55, 
    paddingHorizontal: 20 
  }, 
  
  // Header
  HeaderText: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: "black",
  },
  profileSection: {
    alignItems: "center",
    backgroundColor: "#F8F4F1", 
    marginTop: 10,
  },
  profileImageContainer: {
    width: 150, 
    height: 120,
    borderRadius: 110,
    overflow: 'hidden',
    backgroundColor:  "white",
    marginBottom: 15,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
  },
  usernameImage: {
    fontSize: 24,
    fontWeight: "600",
    color: "black",
    marginTop: 10,
    marginBottom: 10,
  },
  emailText: {
    fontSize: 13,
    color: "#888888",
    marginBottom: 30,
  },
  
  // Stats 
  statsGrid: {
    flexDirection: 'column',
    width: '100%',
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  statCardBase: { 
    flex: 1,
    aspectRatio: 1, 
    alignItems: "center",
    justifyContent: 'center',
    borderRadius: 10, 
    padding: 10,
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2,
  },
  statValue: {
    fontSize: 32,
    fontWeight: "bold",
    color: "black",
  },
  statLabel: {
    fontSize: 15,
    color: "black",
    textAlign: 'center',
    marginTop: 5,
    fontWeight: '600',
  },
  
  // // Logout Styles
  // logoutContainer: {
  //   alignItems: 'center',
  //   marginTop: 20,
  //   borderRadius: 15,
  //   padding: 5,
  //   marginHorizontal: 5,
  // },
  // logoutButton: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   paddingVertical: 10,
  //   paddingHorizontal: 20,
  //   justifyContent: 'center',
  // },
  // logoutText: {
  //   fontSize: 16,
  //   color: "black",
  //   fontWeight: "600",
  //   marginLeft: 10,
  // },
});

export default Profile;