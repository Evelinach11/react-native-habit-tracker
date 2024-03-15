import React, { useState, useEffect } from "react";
import { getUserById } from "../../db/usersDBService";
import { View, Text, StyleSheet, Image } from "react-native";

const ProfileScreen = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    getUserById().then((result) => {
      setUserData(result[0]);
    });
  }, []);

  return (
    <View style={styles.container}>
      {userData ? (
        <View>
          <View style={styles.photoContainer}>
            <View style={styles.photoWrapper}>
              <View style={styles.photoBackground}>
                {userData.photo ? (
                  <Image
                    source={{ uri: userData.photo }}
                    style={styles.photo}
                  />
                ) : (
                  <Text>No photo available</Text>
                )}
              </View>
            </View>
          </View>
          <View style={styles.card}>
            <View style={styles.textContainer}>
              <View style={styles.textBlock}>
                <Text style={styles.label}>Name</Text>
                <Text style={styles.text}>{userData.name}</Text>
              </View>

              <View style={styles.textBlock}>
                <Text style={styles.label}>Age</Text>
                <Text style={styles.text}>{userData.age}</Text>
              </View>
              <View style={styles.textBlock}>
                <Text style={styles.label}>Dream</Text>
                <Text style={styles.text}>{userData.dream}</Text>
              </View>
            </View>
          </View>
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#FFFFFF",
  },
  card: {
    backgroundColor: "#F3F8FF",
    paddingTop: 120,
    paddingHorizontal: 20,
    borderRadius: 20,
    shadowColor: "#49108B",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
  },
  photoContainer: {
    alignItems: "center",
    marginBottom: -100,
    zIndex: 100,
  },
  photoWrapper: {
    width: 200,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    backgroundColor: "#7F27FF",
  },
  photoBackground: {
    backgroundColor: "#FFFFFF",
    width: 195,
    height: 195,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  photo: {
    width: 170,
    height: 170,
    borderRadius: 100,
    position: "absolute",
  },
  textContainer: {
    alignItems: "flex-start",
  },
  label: {
    fontSize: 16,
    fontWeight: "400",
    marginTop: 10,
    color: "#7F27FF",
  },
  text: {
    color: "#FF8911",
    fontSize: 30,
    marginBottom: 10,
    fontWeight: "400",
  },
  textBlock: {
    backgroundColor: "#FFE7CE",
    width: "100%",
    marginVertical: 20,
    paddingLeft: 10,
    borderRadius: 10,
    shadowColor: "grey",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default ProfileScreen;
