import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/constants/Colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, // Esconde o cabeçalho padrão
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: '#888',
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.primary,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          tabBarIcon: ({ color }) => <Ionicons name="home" color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'Sobre',
          tabBarIcon: ({ color }) => <Ionicons name="person" color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="projects" // Nome do arquivo que criamos acima
        options={{
          title: 'Artes',
          tabBarIcon: ({ color }) => <Ionicons name="images" color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="game" // Você já tem o arquivo game.tsx, só precisa ajustar as cores nele
        options={{
          title: 'Forca',
          tabBarIcon: ({ color }) => <Ionicons name="game-controller" color={color} size={24} />,
        }}
      />
      
      {/* Oculte as abas que não quer mostrar, mas mantenha os arquivos se necessário */}
      <Tabs.Screen name="explore" options={{ href: null }} />
      <Tabs.Screen name="academic" options={{ href: null }} />
      <Tabs.Screen name="skills" options={{ href: null }} />
    </Tabs>
  );
}