import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ActivityIndicator, RefreshControl } from 'react-native';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { ThemeContext } from '../context/ThemeContext';

// Componente para renderizar cada item da grade
// Agora ele recebe os estilos como propriedade para poder reagir ao tema
const MemberItem = ({ item, styles }) => (
  <View style={styles.itemContainer}>
    <Image source={{ uri: item.photoURL }} style={styles.itemImage} />
    <Text style={styles.itemName}>{item.fullName}</Text>
  </View>
);

export default function MuralScreen() {
  const { theme } = useContext(ThemeContext);
  const styles = getDynamicStyles(theme);

  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = () => {
    const q = query(collection(db, "users"));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const usersList = [];
      querySnapshot.forEach((doc) => {
        usersList.push(doc.data());
      });
      setMembers(usersList);
      setLoading(false);
      setRefreshing(false);
    }, (error) => {
      console.error("Erro ao buscar membros: ", error);
      setLoading(false);
      setRefreshing(false);
    });

    return unsubscribe;
  };

  useEffect(() => {
    const unsubscribe = fetchData();
    return () => unsubscribe();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  if (loading) {
    return <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
        <Text style={styles.header}>Membros da Comunidade</Text>
        <FlatList
            data={members}
            renderItem={({ item }) => <MemberItem item={item} styles={styles} />}
            keyExtractor={(item) => item.uid}
            numColumns={2}
            columnWrapperStyle={styles.row}
            ListEmptyComponent={<Text style={styles.emptyText}>Nenhum membro encontrado.</Text>}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={theme === 'dark' ? '#fff' : '#000'} />
            }
        />
    </View>
  );
}

const getDynamicStyles = (theme) => {
  const isDark = theme === 'dark';
  return StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 50,
      paddingHorizontal: 10,
      backgroundColor: isDark ? '#121212' : '#f5f5f5',
    },
    loader: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 20,
      color: isDark ? '#fff' : '#000',
    },
    row: {
      flex: 1,
      justifyContent: "space-around",
    },
    itemContainer: {
      backgroundColor: isDark ? '#1e1e1e' : 'white',
      borderRadius: 8,
      padding: 10,
      margin: 8,
      alignItems: 'center',
      width: '45%',
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
    },
    itemImage: {
      width: 120,
      height: 120,
      borderRadius: 60,
      marginBottom: 10,
    },
    itemName: {
      fontWeight: 'bold',
      textAlign: 'center',
      color: isDark ? '#fff' : '#000',
    },
    emptyText: {
      color: isDark ? '#ccc' : '#555',
      textAlign: 'center',
      marginTop: 50,
    },
  });
};