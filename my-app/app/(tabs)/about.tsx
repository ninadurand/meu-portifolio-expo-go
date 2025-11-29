import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors } from '@/constants/Colors';

export default function AboutScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Sobre Mim</Text>
        <Text style={styles.text}>
          Encontro nos traços uma forma de expressar sentimentos, ideias e histórias. 
          Minha paixão é transformar imaginação em imagens, explorando cores, formas e 
          detalhes que transmitam emoção. Busco sempre aprender novas técnicas e estilos, 
          unindo criatividade e dedicação em cada projeto.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    padding: 20,
  },
  contentContainer: {
    backgroundColor: colors.card, // Usando o fundo um pouco mais claro do tema
    padding: 25,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 20,
    textAlign: 'center',
  },
  text: {
    fontSize: 18,
    lineHeight: 28,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});