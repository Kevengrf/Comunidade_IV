import React, { useState, useContext } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text, TouchableOpacity } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { ThemeContext } from '../context/ThemeContext';

export default function SignUpScreen({ navigation }) {
  const { theme } = useContext(ThemeContext);
  const styles = getDynamicStyles(theme);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = () => {
    if (email.trim() === '' || password.trim() === '' || confirmPassword.trim() === '') {
        Alert.alert("Erro", "Por favor, preencha todos os campos.");
        return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Usuário cadastrado com sucesso!", userCredential.user.uid);
      })
      .catch((error) => {
        let errorMessage = "Ocorreu um erro ao criar a conta.";
        if (error.code === 'auth/email-already-in-use') {
          errorMessage = "Este email já está em uso.";
        } else if (error.code === 'auth/invalid-email') {
          errorMessage = "O formato do email é inválido.";
        } else if (error.code === 'auth/weak-password') {
          errorMessage = "A senha é muito fraca. Use pelo menos 6 caracteres.";
        }
        Alert.alert("Erro de Cadastro", errorMessage);
      });
  };

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Crie sua Conta</Text>
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
            placeholder="Senha (mínimo 6 caracteres)"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor={theme === 'dark' ? '#999' : '#666'}
        />
        <TextInput
            style={styles.input}
            placeholder="Confirmar Senha"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            placeholderTextColor={theme === 'dark' ? '#999' : '#666'}
        />
        <Button title="Cadastrar" onPress={handleSignUp} />
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.link}>Já tem uma conta? Faça o login</Text>
        </TouchableOpacity>
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
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 40,
        color: isDark ? '#fff' : '#000',
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
  });
};