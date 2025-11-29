import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const AcademicScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Experiência Acadêmica</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>🎓 Curso de Graduação</Text>
        <Text style={styles.cardSubtitle}>5º Período de Ciência/Engenharia da Computação</Text>
        <Text style={styles.cardText}>
          Foco em estruturas de dados, algoritmos, desenvolvimento de software e análise de sistemas.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>📚 Disciplinas Relevantes</Text>
        <Text style={styles.cardText}>
          Programação Orientada a Objetos, Banco de Dados, Redes de Computadores, Análise e Projeto de Sistemas.
        </Text>
      </View>
    </ScrollView>
  );
};

export default AcademicScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  cardSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  cardText: {
    fontSize: 15,
    color: '#444',
  },
});