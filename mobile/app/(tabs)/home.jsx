import { FontAwesome, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
} from "react-native";
import { Calendar } from "react-native-calendars";

const STORAGE_KEY = "my_diaries";

const Home = () => {
  const navigation = useNavigation();

  const [selected, setSelected] = useState("");
  const [diaries, setDiaries] = useState([]);
  const [recents, setRecents] = useState([]);
  const [markedDates, setMarkedDates] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false); // new modal state

  const loadDiaries = async () => {
    try {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      const parsed = saved ? JSON.parse(saved) : [];
      setDiaries(parsed);

      // Recents
      const sorted = parsed.slice(0, 3).map((d) => ({
        id: d.id,
        title: d.title,
        dateTime: `${d.date} ${d.time}`,
      }));
      setRecents(sorted);

      // Dots
      const marks = {};
      parsed.forEach((d) => {
        marks[d.date] = { marked: true, dotColor: "#066AFF" };
      });
      setMarkedDates(marks);
    } catch (e) {
      console.log("Error loading diaries", e);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadDiaries();
    }, [])
  );

  const diariesForDay = diaries
    .filter((d) => d.date === selected)
    .slice(0, 3); // limit to 3

  const allDiariesForDay = diaries
    .filter((d) => d.date === selected)
    .sort(
      (a, b) =>
        new Date(`${b.date} ${b.time}`) - new Date(`${a.date} ${a.time}`)
    );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1, paddingBottom: 50 }}>
      {/* Header */}
      <View style={styles.Header}>
        <TouchableOpacity onPress={() => navigation.navigate("menu")}>
          <Ionicons name="menu" size={35} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("profile")}>
          <FontAwesome name="user-circle" size={35} color="black" />
        </TouchableOpacity>
      </View>

      {/* Calendar */}
      <View style={styles.Card}>
        <Text style={styles.SectionTitleCalendar}>Calendar</Text>
        <Calendar
          onDayPress={(day) => setSelected(day.dateString)}
          markedDates={{
            ...markedDates,
            ...(selected
              ? {
                  [selected]: {
                    selected: true,
                    selectedColor: "#006989",
                    marked: markedDates[selected]?.marked,
                    dotColor: "#ffffffff",
                  },
                }
              : {}),
          }}
          theme={{
            todayTextColor: "#066AFF",
            selectedDayBackgroundColor: "#006989",
            arrowColor: "#006989",
          }}
          style={{ borderRadius: 7, elevation: 1, borderWidth: 0.7, borderColor: "#006989" }}
        />
      </View>

      {/* On This Day */}
      {diariesForDay.length > 0 && (
        <View style={styles.Card}>
          <View style={styles.OnThisDayHeader}>
            <Text style={styles.OnThisDayTitle}>On this day</Text>
            {allDiariesForDay.length > 3 && (
              <TouchableOpacity onPress={() => setIsModalVisible(true)}>
                <Text style={styles.ViewAllText}>View All</Text>
              </TouchableOpacity>
            )}
          </View>

          <FlatList
            data={diariesForDay}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <View style={styles.DiaryCard}>
                <Text style={styles.DiaryTitle}>{item.title}</Text>
                <Text style={styles.DiaryDate}>
                  {item.date} {item.time}
                </Text>
              </View>
            )}
          />
        </View>
      )}

      {/* Recents */}
      <View style={styles.Card}>
        <Text style={styles.SectionTitleRecent}>Recents</Text>
        {recents.length === 0 ? (
          <Text style={styles.Placeholder}>No recents yet...</Text>
        ) : (
          recents.map((item) => (
            <View key={item.id} style={styles.RecentItem}>
              <Text style={styles.RecentTitle}>{item.title}</Text>
              <Text style={styles.RecentDate}>{item.dateTime}</Text>
            </View>
          ))
        )}
      </View>

      {/* Modal for "View All" */}
      <Modal
        visible={isModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.ModalContainer}>
          <View style={styles.ModalContent}>
            <View style={styles.ModalHeader}>
              <Text style={styles.ModalTitle}>All Diaries ({selected})</Text>
              <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                <Ionicons name="close" size={24} color="black" />
              </TouchableOpacity>
            </View>

            {allDiariesForDay.length === 0 ? (
              <Text style={styles.Placeholder}>No diaries on this date</Text>
            ) : (
              <FlatList
                data={allDiariesForDay}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View style={styles.DiaryCard}>
                    <Text style={styles.DiaryTitle}>{item.title}</Text>
                    <Text style={styles.DiaryDate}>
                      {item.date} {item.time}
                    </Text>
                  </View>
                )}
              />
            )}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#fbfcffff", 
    paddingTop: 55, 
    paddingHorizontal: 20 
  },
  Header: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center", 
    marginBottom: 15 
  },
  Card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    borderWidth: 0.7,
    borderColor: "#006989",
  },
  SectionTitleCalendar: { 
    fontSize: 20, 
    fontWeight: "bold", 
    marginBottom: 10, 
    textAlign: "center", 
    color: "black" 
  },
  SectionTitleRecent: { 
    fontSize: 20, 
    fontWeight: "bold", 
    marginBottom: 10, 
    color: "black" 
  },
  OnThisDayHeader: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center", 
    marginBottom: 10 
  },
  OnThisDayTitle: { 
    fontSize: 20, 
    fontWeight: "bold", 
    color: "black" 
  },
  ViewAllText: { 
    fontSize: 14, 
    color: "#066AFF", 
    fontWeight: "bold" 
  },
  DiaryCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    borderWidth: 0.7,
    borderColor: "#006989",
  },
  DiaryTitle: { 
    fontSize: 16, 
    fontWeight: "bold", 
    color: "black" 
  },
  DiaryDate: { 
    fontSize: 12, 
    color: "#808080" 
  },
  RecentItem: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    borderWidth: 0.7,
    borderColor: "#006989",
  },
  RecentTitle: { 
    fontSize: 16, 
    fontWeight: "bold", 
    marginBottom: 5, 
    color: "black" 
  },
  RecentDate: { 
    fontSize: 12, 
    color: "#808080" 
  },
  Placeholder: { 
    fontSize: 15, 
    color: "#808080", 
    fontStyle: "italic", 
    textAlign: "center", 
    paddingVertical: 20 
  },

  // Modal Styles
  ModalContainer: { 
    flex: 1, 
    justifyContent: "flex-end", 
    backgroundColor: "rgba(0,0,0,0.5)" 
  },
  ModalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    maxHeight: "80%",
  },
  ModalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  ModalTitle: { 
    fontSize: 18, 
    fontWeight: "bold", 
    color: "black" 
  },
});

export default Home;