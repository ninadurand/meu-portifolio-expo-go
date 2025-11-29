import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const SkillsScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Experiências e Habilidades</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Hackathon Participação</Text>
        <Text style={styles.cardSubtitle}>Desenvolvimento e Resolução de Problemas</Text>
        <Text style={styles.cardText}>
          Participação ativa em Hackathons, trabalhando sob pressão para desenvolver soluções inovadoras e colaborar em equipe.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Treinamento de Analista Funcional</Text>
        <Text style={styles.cardSubtitle}>Foco em Análise de Requisitos e Processos</Text>
        <Text style={styles.cardText}>
          Treinamento focado em **Análise Funcional**, com ênfase na compreensão das necessidades do negócio, documentação de requisitos e prototipagem.
        </Text>
      </View>
      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Linguagens e Ferramentas</Text>
        <Text style={styles.cardText}>
          **Linguagens:** TypeScript, JavaScript, Python, Java, SQL.
          {'\n'}
          **Front-end:** React Native, HTML, CSS.
          {'\n'}
          **Outras:** Git, UML, Metodologias Ágeis (Scrum/Kanban).
        </Text>
      </View>
    </ScrollView>
  );
};

export default SkillsScreen;

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
    color: '#007AFF',
  },
  cardSubtitle: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#666',
    marginBottom: 10,
  },
  cardText: {
    fontSize: 15,
    color: '#444',
    lineHeight: 22,
  },
});