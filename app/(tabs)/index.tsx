import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';

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
    <View style={styles.container}>
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
      <Button title="Calcular Lucro" onPress={calculateProfit} />
      <Button title="Limpar" onPress={clearInputs} color="#ff4d47" />
      {profit !== null && (
        <Text style={styles.result}>Lucro Potencial: €{profit.toFixed(2)}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({


  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
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
    borderRadius: 80, // Corrigido para borderRadius
  },
  result: {
    fontSize: 18,
    marginVertical: 20,
    color: '#8b2e44',
  },
});