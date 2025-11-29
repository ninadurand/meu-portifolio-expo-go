import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const AboutScreen: React.FC = () => {
  const technologies: string[] = [ // Tipagem explícita para o array de strings
    'React Native',
    'Expo SDK (versão atual)',
    'Expo Router',
    'TypeScript', // Adicionando TypeScript como tecnologia
    'React Hooks (useState, useEffect, etc.)',
    'Módulos Expo: (ex: expo-font, expo-status-bar)',
    'React Navigation (usado internamente pelo Expo Router)',
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Sobre o Aplicativo</Text>
      <Text style={styles.subtitle}>Tecnologias Utilizadas:</Text>
      
      <View style={styles.listContainer}>
        {technologies.map((tech, index) => (
          <Text key={index} style={styles.listItem}>
            • {tech}
          </Text>
        ))}
      </View>

      <Text style={styles.text}>
        Desenvolvido como um projeto de portfólio por um estudante do 5º período de Ciência/Engenharia da Computação.
      </Text>
    </ScrollView>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  listContainer: {
    marginBottom: 20,
    paddingLeft: 10,
  },
  listItem: {
    fontSize: 16,
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    marginTop: 10,
  },
});