import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Alert,
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Modal from "react-native-modal";
import { Picker } from "@react-native-picker/picker";

const { width } = Dimensions.get("window");
const CARD_MARGIN = 8;
const GRID_CARD_WIDTH = (width - 20 * 2 - CARD_MARGIN) / 2;

const STORAGE_KEY = "my_diaries";

const Diary = () => {
  const navigation = useNavigation();
  const [diaries, setDiaries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("list");
  const [mode, setMode] = useState("list"); // list | create | edit

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [editingDiaryId, setEditingDiaryId] = useState(null);

  // Filter states
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [filterMonth, setFilterMonth] = useState(null);
  const [filterYear, setFilterYear] = useState(null);

  const makeId = () =>
    `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  // Load diaries
  useEffect(() => {
    const loadDiaries = async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) {
          setDiaries(JSON.parse(saved));
        }
      } catch (e) {
        console.log("Error loading diaries", e);
      }
    };
    loadDiaries();
  }, []);

  // Save diaries
  useEffect(() => {
    const saveDiaries = async () => {
      try {
        if (diaries.length > 0) {
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(diaries));
        } else {
          await AsyncStorage.removeItem(STORAGE_KEY);
        }
      } catch (e) {
        console.log("Error saving diaries", e);
      }
    };
    saveDiaries();
  }, [diaries]);

  // Save diary
  const handleSave = () => {
    if (!title.trim() && !body.trim()) {
      Alert.alert("Empty", "Please enter title or body.");
      return;
    }

    if (mode === "edit" && editingDiaryId) {
      const existing = diaries.find((d) => d.id === editingDiaryId);
      const updatedDiary = {
        id: editingDiaryId,
        title,
        body,
        date: existing?.date ?? new Date().toISOString().split("T")[0],
        time:
          existing?.time ??
          new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setDiaries((prev) =>
        prev.map((d) => (d.id === editingDiaryId ? { ...d, ...updatedDiary } : d))
      );

      navigation.navigate("home", { updatedDiary });
    } else {
      const now = new Date();
      const newDiary = {
        id: makeId(),
        title,
        body,
        date: now.toISOString().split("T")[0],
        time: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setDiaries((prev) => [newDiary, ...prev]);

      navigation.navigate("home", { newDiary });
    }

    setTitle("");
    setBody("");
    setEditingDiaryId(null);
    setMode("list");
  };

  // Delete diary
  const handleDelete = async (id) => {
    const found = diaries.find((d) => d.id === id);
    const date = found?.date;
    const updated = diaries.filter((d) => d.id !== id);
    setDiaries(updated);

    if (updated.length > 0) {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } else {
      await AsyncStorage.removeItem(STORAGE_KEY);
    }

    navigation.navigate("home", { deletedDiaryId: id, date });
  };

  // Edit diary
  const startEdit = (item) => {
    setTitle(item.title);
    setBody(item.body);
    setEditingDiaryId(item.id);
    setMode("edit");
  };

  // Apply search + filter
  const filteredDiaries = diaries.filter((diary) => {
    const matchesSearch = diary.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    let matchesFilter = true;
    if (filterMonth && filterYear) {
      const diaryDate = new Date(diary.date);
      matchesFilter =
        diaryDate.getMonth() + 1 === filterMonth &&
        diaryDate.getFullYear() === filterYear;
    }

    return matchesSearch && matchesFilter;
  });

  return (
    <View style={styles.Container}>
      {mode === "list" ? (
        <>
          {/* Header */}
          <View style={styles.Header}>
            <Ionicons name="menu" size={35} color="black" />
            <FontAwesome name="user-circle" size={35} color="grey" />
          </View>

          {/* Search */}
          <View style={styles.SearchRow}>
            <TextInput
              style={styles.SearchBar}
              placeholder="Search diary"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          {/* Section Header */}
          <View style={styles.SectionHeaderRow}>
            <Text style={styles.SectionTitle}>Diaries</Text>
            <View style={styles.ActionButtons}>
              {/* Toggle */}
              <TouchableOpacity
                style={styles.IconButton}
                onPress={() =>
                  setViewMode((prev) => (prev === "list" ? "grid" : "list"))
                }
              >
                <Ionicons
                  name={viewMode === "list" ? "grid-outline" : "list-outline"}
                  size={25}
                  color="black"
                />
              </TouchableOpacity>

              {/* Filter */}
              <TouchableOpacity
                style={styles.IconButton}
                onPress={() => setIsFilterVisible(true)}
              >
                <Ionicons name="filter-outline" size={25} color="black" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Diary List */}
          <FlatList
            data={filteredDiaries}
            key={viewMode}
            numColumns={viewMode === "grid" ? 2 : 1}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.DiaryCard,
                  viewMode === "grid" ? styles.GridCard : styles.ListCard,
                ]}
              >
                <Text style={styles.DiaryTitle}>{item.title}</Text>
                <Text style={styles.DiaryDate}>
                  {item.date} {item.time}
                </Text>

                <View style={styles.CardActions}>
                  <TouchableOpacity
                    onPress={() => startEdit(item)}
                    style={{ marginRight: 12 }}
                  >
                    <Ionicons name="create-outline" size={20} color="#066AFF" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      Alert.alert("Delete", "Delete this diary?", [
                        { text: "Cancel", style: "cancel" },
                        {
                          text: "Delete",
                          style: "destructive",
                          onPress: () => handleDelete(item.id),
                        },
                      ])
                    }
                  >
                    <Ionicons name="trash-outline" size={20} color="red" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
            ListEmptyComponent={
              <View style={styles.DiaryCard}>
                <Text style={{ color: "grey" }}>
                  {searchQuery ? "No diaries found" : "No diaries yet"}
                </Text>
              </View>
            }
            columnWrapperStyle={
              viewMode === "grid" ? { justifyContent: "space-between" } : undefined
            }
          />

          {/* Add Button */}
          <TouchableOpacity
            style={styles.AddButton}
            onPress={() => setMode("create")}
          >
            <Ionicons name="add" size={28} color="white" />
          </TouchableOpacity>
        </>
      ) : (
        // Create/Edit screen
        <View style={styles.Form}>
          <Text style={styles.FormHeader}>
            {mode === "edit" ? "Edit Diary" : "New Diary"}
          </Text>
          <TextInput
            style={styles.Input}
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={styles.BodyInput}
            placeholder="Write your diary..."
            value={body}
            onChangeText={setBody}
            multiline
          />
          <View style={styles.ButtonRow}>
            <TouchableOpacity
              style={[styles.SmallButton, { backgroundColor: "grey" }]}
              onPress={() => {
                setMode("list");
                setTitle("");
                setBody("");
                setEditingDiaryId(null);
              }}
            >
              <Text style={styles.SmallButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.SmallButton, { backgroundColor: "#066AFF" }]}
              onPress={handleSave}
            >
              <Text style={styles.SmallButtonText}>
                {mode === "edit" ? "Update" : "Save"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Filter Modal */}
      <Modal
        isVisible={isFilterVisible}
        onBackdropPress={() => setIsFilterVisible(false)}
        style={styles.Modal}
      >
        <View style={styles.ModalContent}>
          <Text style={styles.ModalTitle}>Filter Diaries</Text>

          <Text style={styles.PickerLabel}>Month</Text>
          <Picker
            selectedValue={filterMonth}
            onValueChange={(val) => setFilterMonth(val)}
          >
            <Picker.Item label="All" value={null} />
            {Array.from({ length: 12 }, (_, i) => (
              <Picker.Item
                key={i}
                label={new Date(0, i).toLocaleString("default", { month: "long" })}
                value={i + 1}
              />
            ))}
          </Picker>

          <Text style={styles.PickerLabel}>Year</Text>
          <Picker
            selectedValue={filterYear}
            onValueChange={(val) => setFilterYear(val)}
          >
            <Picker.Item label="All" value={null} />
            {Array.from({ length: 10 }, (_, i) => {
              const year = new Date().getFullYear() - 5 + i;
              return <Picker.Item key={year} label={year.toString()} value={year} />;
            })}
          </Picker>

          <View style={styles.FilterButtons}>
            <TouchableOpacity
              style={[styles.FilterBtn, { backgroundColor: "grey" }]}
              onPress={() => {
                setFilterMonth(null);
                setFilterYear(null);
                setIsFilterVisible(false);
              }}
            >
              <Text style={styles.FilterBtnText}>Clear</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.FilterBtn, { backgroundColor: "#066AFF" }]}
              onPress={() => setIsFilterVisible(false)}
            >
              <Text style={styles.FilterBtnText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: { flex: 1, backgroundColor: "white", paddingTop: 55, paddingHorizontal: 20 },
  Header: { flexDirection: "row", justifyContent: "space-between", marginBottom: 15 },
  SearchRow: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
  SearchBar: { flex: 1, borderWidth: 1, borderColor: "grey", borderRadius: 10, paddingHorizontal: 12, paddingVertical: 15 },
  SectionHeaderRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  SectionTitle: { fontSize: 25, fontWeight: "bold" },
  ActionButtons: { flexDirection: "row", alignItems: "center" },
  IconButton: { padding: 8, marginLeft: 5 },
  DiaryCard: { backgroundColor: "#f4f4f4", borderRadius: 12, padding: 15, marginBottom: 12 },
  CardActions: { flexDirection: "row", marginTop: 10, justifyContent: "flex-end" },
  ListCard: { width: "100%" },
  GridCard: { width: GRID_CARD_WIDTH },
  DiaryTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
  DiaryDate: { fontSize: 12, color: "grey" },
  AddButton: { position: "absolute", bottom: 25, right: 25, backgroundColor: "#066AFF", width: 55, height: 55, borderRadius: 30, justifyContent: "center", alignItems: "center", elevation: 4 },

  // New Diary form
  Form: { flex: 1, justifyContent: "flex-start" },
  FormHeader: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  Input: { backgroundColor: "#f4f4f4", padding: 15, borderRadius: 10, marginBottom: 15 },
  BodyInput: { backgroundColor: "#f4f4f4", padding: 15, borderRadius: 10, flex: 1, textAlignVertical: "top", marginBottom: 15 },
  ButtonRow: { flexDirection: "row", justifyContent: "flex-end", marginBottom: 20 },
  SmallButton: { paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8, marginLeft: 10 },
  SmallButtonText: { color: "white", fontWeight: "bold", fontSize: 14 },

  // Modal
  Modal: { justifyContent: "flex-end", margin: 0 },
  ModalContent: { backgroundColor: "white", padding: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20 },
  ModalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  PickerLabel: { fontSize: 14, marginTop: 10, fontWeight: "600" },
  FilterButtons: { flexDirection: "row", justifyContent: "flex-end", marginTop: 20 },
  FilterBtn: { paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8, marginLeft: 10 },
  FilterBtnText: { color: "white", fontWeight: "bold" },
});

export default Diary;