import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function TabTwoScreen() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [birthDate, setBirthDate] = useState(new Date());
  const [storedUser, setStoredUser] = useState('');
  const [storedPassword, setStoredPassword] = useState('');
  const [storedBirthDate, setStoredBirthDate] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSave = () => {
    if (user && password && birthDate) {
      setStoredUser(user);
      setStoredPassword(password);
      setStoredBirthDate(birthDate.toDateString());
      Alert.alert('Success', 'Data saved successfully!');
    } else {
      Alert.alert('Error', 'Please fill out all fields.');
    }
  };

  const handleClear = () => {
    setUser('');
    setPassword('');
    setBirthDate(new Date());
    setStoredUser('');
    setStoredPassword('');
    setStoredBirthDate('');
  };

  const handleLogin = () => {
    if (user === storedUser && password === storedPassword) {
      Alert.alert('Login Successful', `Date of Birth: ${storedBirthDate}`);
    } else {
      Alert.alert('Login Failed', 'User or password is incorrect.');
    }
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || birthDate;
    setShowDatePicker(Platform.OS === 'ios');
    setBirthDate(currentDate);
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.label}>User:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter username"
          placeholderTextColor="#ccc"
          value={user}
          onChangeText={setUser}
        />
        <Text style={styles.label}>Password:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter password"
          placeholderTextColor="#ccc"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Text style={styles.label}>Date of Birth:</Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <Text style={styles.dateText}>{birthDate.toDateString()}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={birthDate}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}
        <Button title="Save" onPress={handleSave} color="#1E90FF" />
        <Button title="Clear" onPress={handleClear} color="#ff5f47" />
        <Button title="Login" onPress={handleLogin} color="#32CD32" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    padding: 20,
  },
  formContainer: {
    backgroundColor: '#111',
    padding: 20,
    borderRadius: 10,
  },
  label: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#333',
    color: '#fff',
    padding: 10,
    fontSize: 16,
    marginBottom: 12,
    borderRadius: 5,
  },
  dateText: {
    backgroundColor: '#333',
    color: '#fff',
    padding: 10,
    fontSize: 16,
    marginBottom: 12,
    borderRadius: 5,
    textAlign: 'center',
  },
});