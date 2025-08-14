import React, { useState, useContext } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db, storage } from '../firebase/firebaseConfig';
import { ThemeContext } from '../context/ThemeContext';

export default function ProfileFormScreen({ navigation }) {
  const { theme } = useContext(ThemeContext);
  const styles = getDynamicStyles(theme);

  const [fullName, setFullName] = useState('');
  const [contact, setContact] = useState('');
  const [ies, setIes] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("Permissão necessária", "É necessário permitir o acesso à galeria para escolher uma foto.");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleSaveProfile = async () => {
    // A seleção de imagem agora é opcional para o teste
    if (!fullName) {
      Alert.alert("Erro", "O nome é obrigatório.");
      return;
    }

    setLoading(true);
    const user = {
      uid: `dev-${new Date().getTime()}`,
      email: 'dev-user@example.com',
    };

    try {
      const userDocRef = doc(db, 'users', user.uid);
      await setDoc(userDocRef, {
        uid: user.uid,
        email: user.email,
        fullName,
      });

      Alert.alert("Sucesso", "Perfil salvo com sucesso!");
      
      navigation.navigate('Mural');

    } catch (error) {
      console.error("Erro ao salvar perfil: ", error);
      Alert.alert("Erro", "Não foi possível salvar o perfil. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Complete seu Perfil</Text>
      
      <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.profileImage} />
        ) : (
          <Text style={styles.imagePickerText}>Selecionar Foto de Perfil</Text>
        )}
      </TouchableOpacity>

      <TextInput style={styles.input} placeholder="Nome Completo" value={fullName} onChangeText={setFullName} placeholderTextColor={theme === 'dark' ? '#999' : '#666'} />
      <TextInput style={styles.input} placeholder="Contato (WhatsApp)" value={contact} onChangeText={setContact} keyboardType="phone-pad" placeholderTextColor={theme === 'dark' ? '#999' : '#666'} />
      <TextInput style={styles.input} placeholder="IES (Instituição de Ensino)" value={ies} onChangeText={setIes} placeholderTextColor={theme === 'dark' ? '#999' : '#666'} />
      <TextInput style={styles.input} placeholder="Cargo (Job Title)" value={jobTitle} onChangeText={setJobTitle} placeholderTextColor={theme === 'dark' ? '#999' : '#666'} />
      <TextInput style={styles.input} placeholder="Empresa" value={company} onChangeText={setCompany} placeholderTextColor={theme === 'dark' ? '#999' : '#666'} />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button title="Salvar Perfil" onPress={handleSaveProfile} />
      )}
    </ScrollView>
  );
}

const getDynamicStyles = (theme) => {
  const isDark = theme === 'dark';
  return StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: isDark ? '#121212' : '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: isDark ? '#fff' : '#000',
    },
    imagePicker: {
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: isDark ? '#2c2c2c' : '#e0e0e0',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        overflow: 'hidden',
    },
    imagePickerText: {
        color: isDark ? '#ccc' : '#555',
    },
    profileImage: {
        width: '100%',
        height: '100%',
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: isDark ? '#1e1e1e' : 'white',
        marginBottom: 15,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: isDark ? '#444' : '#ddd',
        borderRadius: 8,
        color: isDark ? '#fff' : '#000',
    },
  });
};