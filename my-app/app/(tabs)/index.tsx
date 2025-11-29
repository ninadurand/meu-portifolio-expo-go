import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking, ScrollView } from 'react-native';
import { colors } from '@/constants/Colors';

export default function HomeScreen() {
  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <Image 
          // Certifique-se de mover sua foto para assets/images/minha-foto.jpeg
          source={require('@/assets/images/minha-foto.jpeg')} 
          style={styles.profileImage} 
        />
      </View>
      
      <Text style={styles.title}>Olá, sou Marina Durand</Text>
      <Text style={styles.subtitle}>
        Sou estudante de Computação e gosto de Desenhar.
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => openLink('https://www.linkedin.com/in/marina-durand-a71150307')}
        >
          <Text style={styles.buttonText}>LinkedIn</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, styles.outlineButton]} 
          onPress={() => openLink('https://github.com/ninadurand')}
        >
          <Text style={styles.outlineButtonText}>GitHub</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    padding: 20,
  },
  imageContainer: {
    marginBottom: 20,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: colors.primary,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 30,
    opacity: 0.8,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 15,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    minWidth: 120,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.background,
    fontWeight: 'bold',
    fontSize: 16,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.primary,
  },
  outlineButtonText: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 16,
  },
});