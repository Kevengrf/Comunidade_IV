import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Button, Image, ActivityIndicator, Alert, Switch } from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebase/firebaseConfig';
import QRCode from 'react-native-qrcode-svg';
import { ThemeContext } from '../context/ThemeContext';

export default function CarteirinhaScreen() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        } else {
          Alert.alert("Erro", "Não foi possível encontrar os dados do perfil.");
        }
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    signOut(auth).catch((error) => {
      console.error("Erro ao fazer logout: ", error);
      Alert.alert("Erro", "Não foi possível sair. Tente novamente.");
    });
  };

  const styles = getDynamicStyles(theme);

  if (loading) {
    return <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />;
  }

  if (!userData) {
    return (
        <View style={styles.container}><Text style={styles.text}>Não foi possível carregar os dados.</Text></View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image source={{ uri: userData.photoURL }} style={styles.profileImage} />
        <Text style={styles.name}>{userData.fullName}</Text>
        <Text style={styles.jobTitle}>{`${userData.jobTitle} @ ${userData.company}`}</Text>
        
        <View style={styles.qrCodeContainer}>
          {userData.uid && <QRCode value={userData.uid} size={150} backgroundColor={theme === 'dark' ? '#1e1e1e' : 'white'} color={theme === 'dark' ? 'white' : 'black'} />}
        </View>
        <Text style={styles.qrCodeText}>Use este QR Code para validação</Text>
      </View>

      <View style={styles.themeSwitcherContainer}>
        <Text style={styles.themeSwitcherText}>Modo Escuro</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={theme === 'dark' ? "#f4f3f4" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleTheme}
          value={theme === 'dark'}
        />
      </View>
      
      <View style={styles.logoutButton}>
        <Button title="Sair" onPress={handleLogout} color="#ff4d4d" />
      </View>
    </View>
  );
}

const getDynamicStyles = (theme) => {
  const isDark = theme === 'dark';
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: isDark ? '#121212' : '#f0f2f5',
      padding: 20,
    },
    text: {
      color: isDark ? '#fff' : '#000',
    },
    loader: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    card: {
      backgroundColor: isDark ? '#1e1e1e' : 'white',
      borderRadius: 15,
      padding: 25,
      alignItems: 'center',
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.30,
      shadowRadius: 4.65,
      elevation: 8,
      width: '100%',
      maxWidth: 350,
    },
    profileImage: {
      width: 140,
      height: 140,
      borderRadius: 70,
      borderWidth: 3,
      borderColor: '#4a90e2',
      marginBottom: 20,
    },
    name: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 5,
      color: isDark ? '#fff' : '#000',
    },
    jobTitle: {
      fontSize: 16,
      color: isDark ? '#ccc' : '#555',
      marginBottom: 25,
    },
    qrCodeContainer: {
      marginBottom: 10,
    },
    qrCodeText: {
      fontSize: 12,
      color: isDark ? '#aaa' : '#888',
    },
    themeSwitcherContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 20,
      paddingVertical: 10,
      paddingHorizontal: 20,
      backgroundColor: isDark ? '#1e1e1e' : 'white',
      borderRadius: 10,
      width: '100%',
      maxWidth: 350,
    },
    themeSwitcherText: {
      color: isDark ? '#fff' : '#000',
      fontSize: 16,
    },
    logoutButton: {
      marginTop: 20,
      width: '80%',
      maxWidth: 300,
    },
  });
};