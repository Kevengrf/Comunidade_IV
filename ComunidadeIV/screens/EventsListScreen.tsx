import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type RootStackParamList = {
  EventQRCode: { eventId: string; eventName: string };
};

interface Event {
  id: string;
  nome: string;
  local: string;
  data: string;
  hora: string | null;
}

const EventsListScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:3000/events');
        const formattedEvents = response.data.map((event: any) => ({
          id: event.id,
          nome: event.nome,
          local: event.local,
          data: event.data ? new Date(event.data).toLocaleDateString() : 'Data não informada',
          hora: event.hora || 'Hora não informada'
        }));
        setEvents(formattedEvents);
      } catch (err) {
        setError('Erro ao carregar eventos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

const handleEventPress = (event: Event) => {
  navigation.navigate('EventQRCode', { 
    eventId: event.id,
    eventName: event.nome 
  });
};

  const renderEventItem = ({ item }: { item: Event }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => handleEventPress(item)}
    >
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.nome}</Text>
        <View style={styles.cardDetails}>
          <Text style={styles.cardDetail}><Ionicons name="location-outline" size={16} /> {item.local}</Text>
          <Text style={styles.cardDetail}><Ionicons name="time-outline" size={16} /> {item.hora}</Text>
        </View>
      </View>
      <Ionicons name="chevron-forward-outline" size={24} color="#666" />
    </TouchableOpacity>
  );


  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Meus Eventos</Text>

      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={renderEventItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum evento encontrado</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  cardDetails: {
    flexDirection: 'row',
    gap: 16,
  },
  cardDetail: {
    fontSize: 14,
    color: '#666',
    flexDirection: 'row',
    alignItems: 'center',
  },
  emptyText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  errorText: {
    color: '#ff4444',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});

export default EventsListScreen;