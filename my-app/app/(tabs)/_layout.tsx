import React from 'react'; // Requerido em TSX/JSX
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
// Supondo que você criou um arquivo de constantes de cores
import { colors } from '@/constants/Colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: colors.primary || '#0baa75ff', // Usando um fallback
        tabBarInactiveTintColor: colors.textSecondary || '#888',
        tabBarStyle: {
          backgroundColor: colors.background || '#fff',
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
          tabBarIcon: ({ color }) => <Ionicons name="information-circle" color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="academic"
        options={{
          title: 'Acadêmica',
          tabBarIcon: ({ color }) => <Ionicons name="school" color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="(exp)/skills"
        options={{
          title: 'Habilidades',
          tabBarIcon: ({ color }) => <Ionicons name="code-slash" color={color} size={24} />,
        }}
      />
    </Tabs>
  );
}