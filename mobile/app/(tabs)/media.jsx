import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Modal from "react-native-modal";

const Media = () => {
  const [media, setMedia] = useState([]);
  const [previewUri, setPreviewUri] = useState(null);

  useEffect(() => {
    const loadMedia = async () => {
      try {
        const saved = await AsyncStorage.getItem("diaries");
        if (saved) {
          const diaries = JSON.parse(saved);
          // collect all images
          const allImages = diaries.flatMap((d) =>
            (d.images || []).map((uri) => ({
              uri,
              date: d.date,
              diaryId: d.id,
            }))
          );
          setMedia(allImages);
        }
      } catch (e) {
        console.log("Error loading media:", e);
      }
    };
    loadMedia();
  }, []);

  const groupedByMonth = media.reduce((acc, item) => {
    const monthYear = new Date(item.date).toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
    if (!acc[monthYear]) acc[monthYear] = [];
    acc[monthYear].push(item);
    return acc;
  }, {});

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Media</Text>
      <FlatList
        data={Object.keys(groupedByMonth)}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.monthGroup}>
            <Text style={styles.monthTitle}>{item}</Text>
            <View style={styles.grid}>
              {groupedByMonth[item].map((img, idx) => (
                <TouchableOpacity
                  key={idx}
                  onPress={() => setPreviewUri(img.uri)}
                >
                  <Image source={{ uri: img.uri }} style={styles.image} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      />

      {/* Fullscreen Preview */}
      <Modal isVisible={!!previewUri} onBackdropPress={() => setPreviewUri(null)}>
        <View style={styles.previewModal}>
          {previewUri && (
            <Image source={{ uri: previewUri }} style={styles.previewImage} />
          )}
          <TouchableOpacity
            style={styles.closePreview}
            onPress={() => setPreviewUri(null)}
          >
            <Text style={{ color: "white", fontSize: 16 }}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white", padding: 15 },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 15, textAlign: "center" },
  monthGroup: { marginBottom: 25 },
  monthTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  image: { width: 100, height: 100, borderRadius: 10 },
  previewModal: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  previewImage: { width: "90%", height: "70%", resizeMode: "contain" },
  closePreview: { position: "absolute", top: 40, right: 20 },
});

export default Media;