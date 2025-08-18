import { CreateEventDto } from '@/types/event';
import axios from 'axios';
import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

export default function CreateEventScreen() {
  const [form, setForm] = useState<CreateEventDto>({
    nome: "",
    local: "",
    pontos: 0,
    data: "",
    hora: "",
    role: "",
  });

  const handleChange = (name: keyof CreateEventDto, value: string) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:3000/events", form);
      console.log("Evento criado:", response.data);
      alert("Evento criado com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Erro ao criar evento");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView 
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <Text style={styles.title}>Criar Novo Evento</Text>
          
          <Text style={styles.label}>Nome do Evento</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome do evento"
            value={form.nome}
            onChangeText={(text) => handleChange('nome', text)}
          />

          <Text style={styles.label}>Local</Text>
          <TextInput
            style={styles.input}
            placeholder="Local"
            value={form.local}
            onChangeText={(text) => handleChange('local', text)}
          />

          <Text style={styles.label}>Pontos</Text>
          <TextInput
            style={styles.input}
            placeholder="Pontos"
            value={form.pontos.toString()}
            onChangeText={(text) => handleChange('pontos', text)}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Data</Text>
          <TextInput
            style={styles.input}
            placeholder="YYYY-MM-DD"
            value={form.data}
            onChangeText={(text) => handleChange('data', text)}
          />

          <Text style={styles.label}>Hora</Text>
          <TextInput
            style={styles.input}
            placeholder="HH:MM"
            value={form.hora}
            onChangeText={(text) => handleChange('hora', text)}
          />

          <Text style={styles.label}>Função</Text>
          <TextInput
            style={styles.input}
            placeholder="Função (organizador, convidado...)"
            value={form.role}
            onChangeText={(text) => handleChange('role', text)}
          />

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Criar Evento</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    flexGrow: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#000',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});