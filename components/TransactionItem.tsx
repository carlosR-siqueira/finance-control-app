import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal as RNModal, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { IconButton, MD3Colors } from 'react-native-paper';

interface TransactionItemProps {
  transaction: { description: string; value: number; type: 'income' | 'outcome' };
  onDelete: () => void;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction, onDelete }) => {
  const [visible, setVisible] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<TouchableOpacity | null>(null);

  const showModal = () => {
    if (buttonRef.current) {
      buttonRef.current.measure((fx, fy, width, height, px, py) => {
        const modalWidth = 100; // Largura do modal
        const offset = -5; // Deslocamento para a esquerda (ajuste esse valor conforme necessário)
        const adjustedLeft = Math.max(0, px + (width / 2) - (modalWidth / 2) + offset); // Centraliza o modal em relação ao botão com o deslocamento
        const adjustedTop = py - 35; // Mover 35 pixels para cima, ajuste conforme necessário
        setModalPosition({ top: adjustedTop, left: adjustedLeft }); // Ajusta a posição do modal
      });
    }
    setVisible(true);
  };

  const hideModal = () => setVisible(false);

  const handleEdit = () => {
    hideModal();
    console.log('Edit option selected');
  };

  const handleDelete = () => {
    hideModal();
    onDelete();
  };

  return (
    <View style={styles.transaction}>
      <Text style={styles.transactionDescription}>{transaction.description}</Text>
      <Text style={styles.transactionValue}>R$ {transaction.value.toFixed(2)}</Text>
      <Text style={styles.transactionType}>
        {transaction.type === 'income' ? (
          <Icon name="arrow-up" size={20} color="green" />
        ) : (
          <Icon name="arrow-down" size={20} color="red" />
        )}
      </Text>
      <TouchableOpacity style={styles.actionButton} ref={buttonRef} onPress={showModal}>
        <IconButton
          icon="dots-vertical"
          iconColor={MD3Colors.error0}
          size={20}
        />
      </TouchableOpacity>
      
      <RNModal
        visible={visible}
        transparent={true}
        animationType="fade"
        onRequestClose={hideModal}
        
      >
        <TouchableWithoutFeedback onPress={hideModal}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={[styles.modalContainer, { top: modalPosition.top, left: modalPosition.left }]}>
                <TouchableOpacity onPress={handleEdit} style={styles.editButton}>
                  <Text style={styles.btnTxt}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
                  <Text style={styles.btnTxt}>Deletar</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </RNModal>
    </View>
  );
};

const styles = StyleSheet.create({
  transaction: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  transactionDescription: {
    flex: 1,
    textAlign: 'center',
    fontSize: 13,
  },
  transactionValue: {
    flex: 1,
    textAlign: 'center',
    fontSize: 13,
  },
  transactionType: {
    flex: 1,
    textAlign: 'center',
  },
  actionButton: {
    padding: 10,
    borderRadius: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    position: 'absolute',
    backgroundColor: '#fff',
    padding: 7,
    borderRadius: 8,
    width: 100,
    gap: 10,
    shadowRadius: 4,
    elevation: 5,
  },
  editButton: {
    backgroundColor: '#f7ef04',
    padding: 5,
    borderRadius: 5,
    
  },
  btnTxt: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
  },
  deleteButton: {
    backgroundColor: '#FF0000',
    padding: 5,
    borderRadius: 5,
   
  },
});

export default TransactionItem;
