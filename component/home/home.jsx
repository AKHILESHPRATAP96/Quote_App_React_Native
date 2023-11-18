// Import necessary modules and components
import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Image, StatusBar, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native';
import Quotelist from './QuotesList';
import { Clipboard } from 'react-native';
import ViewShot, { captureRef } from "react-native-view-shot";
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';

// Define the Home component
function Home() {
  // Define an array of background colors for quotes
  const backgroundColors = [
    "#E74C3C", "#2ECC71", "#F39C12", "#9B59B6",
    "#3498DB", "#1ABC9C", "#E67E22", "#34495E", "#D35400",
    "#16A085", "#2980B9", "#C0392B", "#8E44AD", "#2C3E50",
    "#F1C40F", "#27AE60", "#D35400", "#7F8C8D",
  ];
  const viewShotRef = useRef(); // Reference to ViewShot component

  // State variables for quote data and background color
  const [quote, setQuote] = useState("Loading....");
  const [author, setAuthor] = useState('Loading....');
  const [backgroundColor, setBackgroundColor] = useState(backgroundColors[0]);
  const [fetchData, setFetchData] = useState('');
  const [capturedImage, setCapturedImage] = useState(null);

  // Fetch a random quote from the API
  async function randomQuotes() {
    try {
      let response = await fetch("https://api.quotable.io/quotes/random");
      let data = await response.json();
      setQuote(data[0].content);
      setAuthor(data[0].author);
      const randomColorIndex = Math.floor(Math.random() * backgroundColors.length);
      setBackgroundColor(backgroundColors[randomColorIndex]);
    } catch (err) {
      console.log('error', err);
    }
  }

  // Fetch a list of quotes from the API
  async function fetchQuotes() {
    try {
      let response = await fetch("https://api.quotable.io/quotes/");
      let data = await response.json();
      setFetchData(data.results);
    } catch (err) {
      console.log('error', err);
    }
  }

  // Copy the current quote to the clipboard
  function copyToClipboard() {
    Clipboard.setString(`${quote} - ${author}`)
    Alert.alert('Copied!', 'Quote copied to clipboard.');
  }

  // Capture the current view and save it to the device's library
  async function captureAndSave() {
    try {
      if (viewShotRef.current) {
        const result = await viewShotRef.current.capture();

        if (result) {
          await MediaLibrary.saveToLibraryAsync(result);
          Alert.alert('Saved!', 'Quote image saved to your device.');
        }
      } else {
        console.error('ViewShot ref is null or undefined.');
      }
    } catch (error) {
      console.error('Error capturing or saving image:', error);
    }
  }

  // Capture the current view and set the captured image state
  const captureView = async () => {
    try {
      const result = await captureRef(viewShotRef, {
        format: 'png',
        quality: 0.9,
      });
      setCapturedImage(result);
    } catch (error) {
      console.error('Error capturing view:', error);
    }
  };

  // Share the captured image
  const shareImage = async () => {
    await captureView();
    if (capturedImage) {
      try {
        await Sharing.shareAsync(capturedImage);
      } catch (e) {
        console.log(e);
      }
    }
  };

  // Fetch random and initial quotes on component mount
  useEffect(() => {
    randomQuotes();
    fetchQuotes();
  }, []);

  // Render the Home component
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor="#FF5733" />

      {/* Main content */}
      <ScrollView contentContainerStyle={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#63B4E6", paddingHorizontal: 10 }}>
        {/* Quote display container */}
        <View style={{
          width: '100%', backgroundColor: backgroundColor, borderRadius: 20, padding: 10, marginVertical: 10, shadowColor: 'black',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
        }}>
          {/* ViewShot component for capturing the view */}
          <ViewShot ref={viewShotRef} options={{ format: "jpg", quality: 0.9 }} style={{ width: '100%', backgroundColor: backgroundColor, borderRadius: 20, padding: 10, marginBottom: 20, marginTop: 10 }}>
            <Text style={{ textAlign: "center", fontSize: 22, fontWeight: "600", marginBottom: 10, color: "#fff", textShadowColor: '#000', textShadowRadius: 2 }}>Quote of the Day</Text>
            <Text style={{
              color: "#000",
              fontSize: 20,
              lineHeight: 26,
              letterSpacing: 1,
              fontWeight: 500,
              textAlign: "center",
              marginBottom: 10,
            }}>{`"${quote}"`}</Text>
            <Text style={{ textAlign: "right", fontWeight: "400", fontStyle: "italic", fontSize: 14, color: "#000" }}>{`--${author}`}</Text>
          </ViewShot>
          {/* Buttons for actions */}
          <TouchableOpacity onPress={randomQuotes} style={{ backgroundColor: "#182025", padding: 15, borderRadius: 20, marginVertical: 10 }}>
            <Text style={{ color: "#fff", fontSize: 14, textAlign: "center" }}>New Quote</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: "row", justifyContent: "space-around", marginBottom: 10 }}>
            <TouchableOpacity
              onPress={copyToClipboard}
              style={{ borderWidth: 2, borderColor: "#fff", borderRadius: 30, padding: 10 }}>
              <FontAwesome5 name="copy" size={18} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity onPress={captureAndSave} style={{ borderWidth: 2, borderColor: "#fff", borderRadius: 30, padding: 10 }}>
              <FontAwesome5 name="download" size={18} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity onPress={shareImage} style={{ borderWidth: 2, borderColor: "#fff", borderRadius: 30, padding: 10 }}>
              <FontAwesome5 name="share" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* List of quotes */}
        <Quotelist data={fetchData} backgroundColor={backgroundColor} copyToClipboard={copyToClipboard} captureAndSave={captureAndSave}
          shareImage={shareImage} />
      </ScrollView>
    </SafeAreaView>
  );
}

export default Home;
