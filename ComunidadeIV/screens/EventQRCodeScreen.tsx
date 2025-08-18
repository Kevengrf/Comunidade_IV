import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useRoute } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import QRCode from 'react-qr-code';

type RootStackParamList = {
  EventQRCode: { eventId: string; eventName: string };
};

type EventQRCodeRouteProp = RouteProp<RootStackParamList, 'EventQRCode'>;

const EventQRCodeScreen: React.FC = () => {
  const route = useRoute<EventQRCodeRouteProp>();
  const { eventId, eventName } = route.params;
  const qrValue = `http://localhost:3000/events/${eventId}/register`;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro para: {eventName}</Text>
      
      <View style={styles.qrContainer}>
        <QRCode
          value={qrValue}
          size={250}
          bgColor="#fff"
          fgColor="#000"
          level="H"
        />
      </View>

      <View style={styles.instructions}>
        <Ionicons name="information-circle-outline" size={24} color="#666" />
        <Text style={styles.instructionsText}>
          Escaneie este QR Code para registrar sua presença no evento
        </Text>
      </View>
      
      <View style={styles.eventIdContainer}>
        <Text style={styles.eventIdText}>ID do Evento: {eventId}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  qrContainer: {
    marginBottom: 30,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  instructions: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    maxWidth: '80%',
    marginBottom: 20,
  },
  instructionsText: {
    marginLeft: 10,
    color: '#666',
    textAlign: 'center',
    fontSize: 16,
  },
  eventIdContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
  },
  eventIdText: {
    color: '#555',
    fontSize: 14,
  },
});

export default EventQRCodeScreen;