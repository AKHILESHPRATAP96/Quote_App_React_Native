// Import necessary components
import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';


import Home from './component/home/home'
import Nav from './component/home/nav';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Nav />
      <Home />
     
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#63B4E6",
  },
});
