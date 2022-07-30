import React, { useState } from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { get } from '../lib/api';

export function Home() {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);

  const getUser = async name => {
    if (!name) {
      Alert.alert('Error', 'Please enter a username', [{ text: 'OK' }]);
      setUser(null);
      return;
    }

    const response = await get(`https://api.github.com/users/${name}`);
    if (response.message === 'Not Found') {
      Alert.alert('User notFound', 'Please try again', [{ text: 'OK' }]);
      return;
    }
    setUser(response);
    setUsername('');
  };

  return (
    <View style={user ? styles.containerFixed : styles.container}>
      <Text style={!user ? styles.title : styles.textDisabled}>
        Search profiles on GitHub
      </Text>
      <TextInput
        style={user ? styles.inputDisabled : styles.input}
        placeholder={user ? null : 'Enter username'}
        onChangeText={text => setUsername(text)}
        value={username}
      />
      <TouchableOpacity
        onPress={() => getUser(username)}
        style={!user ? styles.button : styles.buttonDisabled}>
        <Text>Get user</Text>
      </TouchableOpacity>
      {user && (
        <View style={styles.user}>
          <Text style={styles.title}>Github Profile</Text>
          <Image style={styles.avatar} source={{ uri: user.avatar_url }} />
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.bio}>Bio: {user.bio}</Text>
          <Text style={styles.location}>{user.location}</Text>
          <Text style={styles.email}>Repositories: {user.public_repos}</Text>
        </View>
      )}
      <TouchableOpacity
        onPress={() => setUser(null)}
        style={user ? styles.button : styles.buttonDisabled}>
        <Text>Pesquisar novamente</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerFixed: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  title: {
    fontSize: 32,
    marginBottom: 10,
    padding: 10,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    width: 300,
    borderRadius: 5,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    padding: 5,
  },
  user: {
    marginTop: 20,
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  bio: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
    lineHeight: 18,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    margin: 10,
  },
  location: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
    lineHeight: 18,
    textAlign: 'center',
  },
  email: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
    lineHeight: 18,
    textAlign: 'center',
  },

  inputDisabled: {
    zIndex: -1,
    opacity: 0,
  },
  buttonDisabled: {
    zIndex: -1,
    opacity: 0,
  },
  textDisabled: {
    zIndex: -1,
    opacity: 0,
  },
});
