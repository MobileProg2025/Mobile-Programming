import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

const Settings = () => {
  return (
    <View style={styles.outerContainer}>
      {/* Main Content Area */}
      <View style={styles.container}>
        <Text style={styles.HeaderText}>Settings</Text>

        {/* ==================== 1. Account Card ==================== */}
        <View style={styles.cardWrapper}>
          <Text style={styles.cardTitle}>Account</Text>
          <View style={styles.cardContent}>
            <View style={styles.row}>
              <View style={styles.rowLeft}>
                <MaterialCommunityIcons name="account-details-outline" size={20} color="#FF7E4A" />
                <Text style={styles.rowText}>Personal Details</Text>
              </View>
            </View>
          </View>
        </View>

        {/* ==================== 2. Permission Card ==================== */}
        <View style={styles.cardWrapper}>
          <Text style={styles.cardTitle}>Permission</Text>
          <View style={styles.cardContent}>
            <View style={styles.row}>
              <View style={styles.rowLeft}>
                <MaterialCommunityIcons name="bell-outline" size={20} color="#FF7E4A" />
                <View style={styles.textContainer}>
                  <Text style={styles.rowText}>Notifications</Text>
                  <Text style={styles.rowSubtext}>Remind me at 9 PM</Text>
                </View>
              </View>
              {/* Static placeholder for the Switch component */}
              <View style={[styles.staticSwitch, styles.staticSwitchActive]} />
            </View>
          </View>
        </View>

        {/* ==================== 3. Security Card ==================== */}
        <View style={styles.cardWrapper}>
          <Text style={styles.cardTitle}>Security</Text>
          <View style={styles.cardContent}>
            <View style={styles.row}>
              <View style={styles.rowLeft}>
                <MaterialCommunityIcons name="shield-lock-outline" size={20} color="#FF7E4A" />
                <Text style={styles.rowText}>Security Pin</Text>
              </View>
              <Text style={styles.notEnrolledText}>Not enrolled</Text>
            </View>
          </View>
        </View>

        {/* ==================== 4. Theme Card ==================== */}
        <View style={styles.cardWrapper}>
          <Text style={styles.cardTitle}>Theme</Text>
          <View style={styles.cardContent}>
            {/* Light Theme Row */}
            <View style={[styles.row, styles.rowSeparator]}>
              <View style={styles.rowLeft}>
                <Feather name="sun" size={20} color="#FF7E4A" />
                <Text style={styles.rowText}>Light</Text>
              </View>
              <View style={[styles.radio, styles.radioSelected]} />
            </View>
            {/* Dark Theme Row */}
            <View style={styles.row}>
              <View style={styles.rowLeft}>
                <Feather name="moon" size={20} color="#FF7E4A" />
                <Text style={styles.rowText}>Dark</Text>
              </View>
              <View style={styles.radio} />
            </View>
          </View>
        </View>

        {/* ==================== 5. Others Card ==================== */}
        <View style={styles.cardWrapper}>
          <Text style={styles.cardTitle}>Others</Text>
          <View style={styles.cardContent}>
            {/* Trash Row */}
            <View style={[styles.row, styles.rowSeparator]}>
              <View style={styles.rowLeft}>
                <Feather name="trash-2" size={20} color="#FF7E4A" />
                <Text style={styles.rowText}>Trash</Text>
              </View>
            </View>
            {/* Log Out Row */}
            <View style={styles.row}>
              <View style={styles.rowLeft}>
                <MaterialCommunityIcons name="logout" size={20} color="#FF7E4A" />
                <Text style={styles.rowText}>Log out</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

export default Settings

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: "#F8F4F1",
  },
  container: {
    flex: 1,
    backgroundColor: "#F8F4F1",
    paddingTop: 55,
    paddingHorizontal: 20,
  },
  HeaderText: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: "black",
  },

  // --- Card Styles ---
  cardWrapper: {
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
    marginBottom: 8,
    marginLeft: 8,
  },
  cardContent: {
    backgroundColor: 'white',
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
    elevation: 1, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },

  // --- Row Styles ---
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  rowSeparator: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#eee',
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    // Ensures text container starts right after the icon
    marginRight: 15, 
  },
  textContainer: {
    marginLeft: 15,
  },
  rowText: {
    fontSize: 16,
    color: 'black',
    fontWeight: '500',
  },
  rowSubtext: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  notEnrolledText: {
    fontSize: 14,
    color: '#999',
  },

  // --- Theme Radio Styles (Static) ---
  radio: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#999',
  },
  radioSelected: {
    borderColor: '#FF7E4A',
    backgroundColor: '#FF7E4A',
  },

  // --- Switch Placeholder (Static) ---
  staticSwitch: {
    width: 40,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#ccc',
    position: 'relative',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  staticSwitchActive: {
    backgroundColor: '#FF7E4A',
  },
  addButton: {
    backgroundColor: '#FF7E4A',
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -30, 
    elevation: 3,
    shadowColor: '#FF7E4A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  }
});