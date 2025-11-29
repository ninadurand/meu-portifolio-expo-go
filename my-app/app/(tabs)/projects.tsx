import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Modal, Dimensions } from 'react-native';
import { colors } from '@/constants/Colors';

// No React Native, precisamos do require estático para imagens locais
// Certifique-se de criar a pasta assets/images/Desenhos e colocar os arquivos lá
const DATA = [
  { id: '1', title: 'Contra Cardume', image: require('@/assets/images/Desenhos/Contra_cardume.jpeg') },
  { id: '2', title: 'O Tigre', image: require('@/assets/images/Desenhos/O_Tigre.jpeg') },
  { id: '3', title: 'Inverso de Mim', image: require('@/assets/images/Desenhos/Inverso_de_mim.jpeg') },
  { id: '4', title: 'Rascunho', image: require('@/assets/images/Desenhos/Rascunho.jpeg') },
  { id: '5', title: 'Cardume Digital', image: require('@/assets/images/Desenhos/cardume_digital.jpg') },
  { id: '6', title: 'Vrum Vrum', image: require('@/assets/images/Desenhos/Vrum_Vrum.jpg') },
  { id: '7', title: 'Nosferatu', image: require('@/assets/images/Desenhos/Nosferatu.jpg') },
  { id: '8', title: 'O -', image: require('@/assets/images/Desenhos/O -.jpg') },
];

const { width } = Dimensions.get('window');
const COLUMN_WIDTH = width / 2 - 25; // Calculando largura para 2 colunas

export default function ProjectsScreen() {
  const [selectedImage, setSelectedImage] = useState<any>(null);

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => setSelectedImage(item)}
    >
      <Image source={item.image} style={styles.cardImage} resizeMode="cover" />
      <Text style={styles.cardTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Galeria de Arte</Text>
      
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
      />

      <Modal
        visible={selectedImage !== null}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setSelectedImage(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedImage && (
              <>
                <Image 
                  source={selectedImage.image} 
                  style={styles.modalImage} 
                  resizeMode="contain" 
                />
                <Text style={styles.modalTitle}>{selectedImage.title}</Text>
                <TouchableOpacity 
                  style={styles.closeButton}
                  onPress={() => setSelectedImage(null)}
                >
                  <Text style={styles.closeButtonText}>Fechar</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 50,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 20,
  },
  listContent: {
    padding: 15,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  card: {
    width: COLUMN_WIDTH,
    backgroundColor: colors.card,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.primary,
    overflow: 'hidden',
    paddingBottom: 10,
  },
  cardImage: {
    width: '100%',
    height: 150,
    backgroundColor: '#000',
  },
  cardTitle: {
    color: colors.primary,
    textAlign: 'center',
    marginTop: 8,
    fontWeight: 'bold',
    fontSize: 14,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    height: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalImage: {
    width: '100%',
    height: '80%',
    borderRadius: 10,
  },
  modalTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
  },
  closeButton: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: colors.textSecondary,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  closeButtonText: {
    color: colors.textSecondary,
    fontSize: 16,
  },
});