import React, { useState, useContext } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text, TouchableOpacity, Image } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { ThemeContext } from '../context/ThemeContext';

export default function LoginScreen({ navigation }) {
  const { theme } = useContext(ThemeContext);
  const styles = getDynamicStyles(theme);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email.trim() === '' || password.trim() === '') {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Usuário logado com sucesso!", userCredential.user.uid);
      })
      .catch((error) => {
        let errorMessage = "Ocorreu um erro ao fazer login.";
        if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
          errorMessage = "Email ou senha inválidos.";
        } else if (error.code === 'auth/invalid-email') {
          errorMessage = "O formato do email é inválido.";
        }
        Alert.alert("Erro de Login", errorMessage);
      });
  };

  const handleAdminLogin = () => {
    signInWithEmailAndPassword(auth, 'admin@admin.com', 'admin')
      .then((userCredential) => {
        console.log("Admin logado com sucesso!", userCredential.user.uid);
      })
      .catch((error) => {
        Alert.alert("Erro de Login Admin", "Não foi possível logar como admin. Verifique se o usuário 'admin@admin.com' existe no Firebase.");
      });
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/LogoComunidadeIV.png')} style={styles.logo} />
      <TextInput
        style={styles.input}
        placeholder="Email (CPF)"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor={theme === 'dark' ? '#999' : '#666'}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor={theme === 'dark' ? '#999' : '#666'}
      />
      <Button title="Entrar" onPress={handleLogin} />
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.link}>Não tem uma conta? Cadastre-se</Text>
      </TouchableOpacity>

      <View style={styles.adminButtonContainer}>
        <Button title="Entrar direto (dev)" onPress={() => navigation.navigate('ProfileForm')} color="#336699" />
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
      padding: 20,
      backgroundColor: isDark ? '#121212' : '#f5f5f5',
    },
    logo: {
      width: 120,
      height: 120,
      marginBottom: 50,
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
    link: {
      marginTop: 20,
      color: '#007bff',
      textDecorationLine: 'underline',
    },
    adminButtonContainer: {
      marginTop: 20,
      width: '100%',
    },
  });
};