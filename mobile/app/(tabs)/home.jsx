import { View, Text, StyleSheet, FlatList, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { Calendar } from "react-native-calendars";
import { useRoute, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "my_diaries";

const Home = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const [selected, setSelected] = useState("");
  const [diaries, setDiaries] = useState([]);
  const [recents, setRecents] = useState([]);
  const [markedDates, setMarkedDates] = useState({});

  // Load diaries initially
  useEffect(() => {
    const loadDiaries = async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          setDiaries(parsed);

          // recents
          const sorted = parsed.slice(0, 3).map((d) => ({
            id: d.id,
            title: d.title,
            dateTime: `${d.date} ${d.time}`,
          }));
          setRecents(sorted);

          // dots
          const marks = {};
          parsed.forEach((d) => {
            marks[d.date] = { marked: true, dotColor: "#066AFF" };
          });
          setMarkedDates(marks);
        }
      } catch (e) {
        console.log("Error loading diaries", e);
      }
    };
    loadDiaries();
  }, []);

  // Handle navigation params
  useEffect(() => {
    // CREATE
    if (route.params?.newDiary) {
      const newDiary = route.params.newDiary;
      setDiaries((prev) => [newDiary, ...prev]);

      setMarkedDates((prev) => ({
        ...prev,
        [newDiary.date]: { marked: true, dotColor: "#066AFF" },
      }));

      setRecents((prev) => {
        const updated = [
          { id: newDiary.id, title: newDiary.title, dateTime: `${newDiary.date} ${newDiary.time}` },
          ...prev,
        ];
        return updated.slice(0, 3);
      });

      navigation.setParams({ newDiary: undefined });
    }

    // UPDATE
    if (route.params?.updatedDiary) {
      const updatedDiary = route.params.updatedDiary;

      setDiaries((prev) => {
        const existing = prev.find((d) => d.id === updatedDiary.id);
        const finalDate = updatedDiary.date ?? existing?.date ?? "";
        const finalTime = updatedDiary.time ?? existing?.time ?? "";

        const updatedArr = prev.map((d) =>
          d.id === updatedDiary.id
            ? { ...d, ...updatedDiary, date: finalDate, time: finalTime }
            : d
        );

        setRecents((prevRec) =>
          prevRec.map((item) =>
            item.id === updatedDiary.id
              ? { ...item, title: updatedDiary.title, dateTime: `${finalDate} ${finalTime}` }
              : item
          )
        );

        return updatedArr;
      });

      navigation.setParams({ updatedDiary: undefined });
    }

    // DELETE (resync from storage)
    if (route.params?.deletedDiaryId) {
      const syncAfterDelete = async () => {
        try {
          const saved = await AsyncStorage.getItem(STORAGE_KEY);
          const parsed = saved ? JSON.parse(saved) : [];
          setDiaries(parsed);

          // recents
          const sorted = parsed.slice(0, 3).map((d) => ({
            id: d.id,
            title: d.title,
            dateTime: `${d.date} ${d.time}`,
          }));
          setRecents(sorted);

          // dots
          const marks = {};
          parsed.forEach((d) => {
            marks[d.date] = { marked: true, dotColor: "#066AFF" };
          });
          setMarkedDates(marks);
        } catch (e) {
          console.log("Error syncing after delete", e);
        }
      };

      syncAfterDelete();
      navigation.setParams({ deletedDiaryId: undefined });
    }
  }, [route.params?.newDiary, route.params?.updatedDiary, route.params?.deletedDiaryId]);

  const diariesForDay = diaries.filter((d) => d.date === selected);

  return (
    <ScrollView style={styles.Container} contentContainerStyle={{ flexGrow: 1, paddingBottom: 50 }}>
      {/* Header */}
      <View style={styles.Header}>
        <Ionicons name="menu" size={35} color="black" />
        <FontAwesome name="user-circle" size={35} color="grey" />
      </View>

      {/* Calendar */}
      <View style={[styles.Card, diariesForDay.length > 0 && { marginBottom: 10 }]}>
        <Text style={styles.SectionTitleCalendar}>Calendar</Text>
        <Calendar
          onDayPress={(day) => setSelected(day.dateString)}
          markedDates={{
            ...markedDates,
            ...(selected
              ? {
                  [selected]: {
                    selected: true,
                    selectedColor: "#066AFF",
                    marked: markedDates[selected]?.marked,
                    dotColor: "#066AFF",
                  },
                }
              : {}),
          }}
          theme={{ todayTextColor: "#066AFF", selectedDayBackgroundColor: "#066AFF", arrowColor: "#066AFF" }}
          style={{ borderRadius: 10, elevation: 2 }}
        />
      </View>

      {/* On This Day */}
      {diariesForDay.length > 0 && (
        <View style={styles.OnThisDayBox}>
          <Text style={styles.OnThisDayTitle}>On this day</Text>
          <FlatList
            data={diariesForDay}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <View style={styles.DiaryCard}>
                <Text style={styles.DiaryTitle}>{item.title}</Text>
                <Text style={styles.DiaryDate}>{item.date} {item.time}</Text>
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  Container: { backgroundColor: "white", flex: 1, paddingTop: 55, paddingHorizontal: 20 },
  Header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 15 },
  Card: { backgroundColor: "#f4f4f4", borderRadius: 15, padding: 12, marginBottom: 20, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 3, elevation: 2 },
  SectionTitleCalendar: { fontSize: 20, fontWeight: "bold", marginBottom: 8, textAlign: "center" },
  SectionTitleRecent: { fontSize: 20, fontWeight: "bold", marginBottom: 8 },
  OnThisDayBox: { backgroundColor: "#f4f4f4", borderRadius: 12, padding: 12, marginBottom: 20 },
  OnThisDayTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  DiaryCard: { backgroundColor: "#fff", borderRadius: 10, padding: 10, marginBottom: 8, borderWidth: 1, borderColor: "#ddd" },
  DiaryTitle: { fontSize: 16, fontWeight: "bold" },
  DiaryDate: { fontSize: 12, color: "grey" },
  RecentItem: { backgroundColor: "#fff", borderRadius: 10, padding: 10, marginBottom: 6, borderWidth: 1, borderColor: "#ddd" },
  RecentTitle: { fontSize: 14, fontWeight: "bold", marginBottom: 2 },
  RecentDate: { fontSize: 12, color: "grey" },
  Placeholder: { fontSize: 14, color: "grey", fontStyle: "italic", textAlign: "center", paddingVertical: 20 },
});

export default Home;