import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function HomeScreen() {
  const [purchasePrice, setPurchasePrice] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [invest, setInvest] = useState('');
  const [profit, setProfit] = useState<number | null>(null);

  const calculateProfit = () => {
    const purchase = parseFloat(purchasePrice);
    const sale = parseFloat(salePrice);
    const inv = parseFloat(invest);

    if (!isNaN(purchase) && !isNaN(sale) && !isNaN(inv) && purchase > 0) {
      const result = (sale - purchase) * (inv / purchase);
      setProfit(result);
    } else {
      setProfit(null);
    }
  };

  const clearInputs = () => {
    setPurchasePrice('');
    setSalePrice('');
    setInvest('');
    setProfit(null);
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      keyboardShouldPersistTaps="handled"
      extraScrollHeight={Platform.OS === 'android' ? 20 : 0}
      enableOnAndroid={true}
    >
      <View style={styles.innerContainer}>
        <Text style={styles.label}>Preço de Compra:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={purchasePrice}
          onChangeText={setPurchasePrice}
        />
        <Text style={styles.label}>Preço de Venda:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={salePrice}
          onChangeText={setSalePrice}
        />
        <Text style={styles.label}>Valor Investido:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={invest}
          onChangeText={setInvest}
        />

        <TouchableOpacity style={styles.calculateButton} onPress={calculateProfit}>
          <Text style={styles.buttonText}>Calcular Lucro</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.clearButton} onPress={clearInputs}>
          <Text style={styles.buttonText}>Limpar</Text>
        </TouchableOpacity>

        {profit !== null && (
          <Text style={styles.result}>Lucro Potencial: €{profit.toFixed(1)}</Text>
        )}
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  innerContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginVertical: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    fontSize: 16,
    marginVertical: 8,
    borderRadius: 10,
  },
  calculateButton: {
    backgroundColor: '#1E90FF',
    borderRadius: 10,
    padding: 10,
    marginVertical: 8,
    alignItems: 'center',
  },
  clearButton: {
    backgroundColor: '#FF6347',
    borderRadius: 10,
    padding: 10,
    marginVertical: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  result: {
    fontSize: 18,
    marginVertical: 20,
    color: '#8b2e44',
  },
});