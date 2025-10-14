import { FontAwesome, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";

const Media = () => {
  const navigation = useNavigation();
  const [media, setMedia] = useState([]);
  const [previewUri, setPreviewUri] = useState(null);

  useEffect(() => {
    const loadMedia = async () => {
      try {
        const saved = await AsyncStorage.getItem("diaries");
        if (saved) {
          const diaries = JSON.parse(saved);
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
    <View style={styles.Header}>
      <TouchableOpacity onPress= {() => navigation.navigate('menu')}>
        <Ionicons name="menu" size={35} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('profile')}>
        <FontAwesome name="user-circle" size={35} color="grey" />
      </TouchableOpacity>
    </View>
    {media.length === 0 ?(
      <View style = {styles.noImage}>
        <Text style = {styles.noImageText}>No Image Available</Text>
      </View>
    ) : (
      <FlatList
          data={Object.keys(groupedByMonth)}
          keyExtractor={(item) => item}
          contentContainerStyle={styles.flatListContent}
          renderItem={({ item }) => (
            <View style={styles.monthGroup}>
              <Text style={styles.monthTitle}>{item}</Text>
              <View style={styles.grid}>
                {groupedByMonth[item].map((img, idx) => (
                  <TouchableOpacity
                  key={idx}
                  onPress={() => setPreviewUri(img.uri)}
                  style={styles.imageWrapper} >
                    <Image source={{ uri: img.uri }} style={styles.image} />
                  </TouchableOpacity>
                  ))}
                </View>\
              </View>
            )}
          />
        )}

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
  container: { 
    flex: 1, 
    backgroundColor: "white", 
    paddingTop: 55, 
    paddingHorizontal: 20 
  }, 
  monthGroup: { 
    marginBottom: 25 
  },
  Header: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center", 
    marginBottom: 15 
  },
  monthTitle: { 
    fontSize: 18, 
    fontWeight: "bold", 
    marginBottom: 10 
  },
  grid: { 
    flexDirection: "row", 
    flexWrap: "wrap", 
    gap: 10 
  },
  image: { 
    width: '100%', 
    height: '100%',
    borderRadius: 10, 
  },
  previewModal: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },

  previewImage: { 
    width: "90%", 
    height: "70%", 
    resizeMode: "contain",
  },
  closePreview: { 
    position: "absolute", 
    top: 40, 
    right: 20, 
  },
  
  noImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noImageText: {
    fontsize: 18,
    fontWeight: '600',
    color: '#808080',
  }
});

export default Media;