import React from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

// Quotelist component for displaying a list of quotes
function Quotelist({ data, backgroundColor, shareImage, captureAndSave, copyToClipboard }) {
    // console.log(data);

    return (
        // ScrollView to contain the list of quotes
        <ScrollView contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: "#63B4E6",
            width: "100%"
        }}>
            {/* Map through the data to render individual quotes */}
            {data && data.map(item => (
                <View key={Math.random()} style={{
                    width: '100%',
                    backgroundColor: backgroundColor,
                    borderRadius: 20,
                    padding: 20,
                    marginBottom: 20,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.8,
                    shadowRadius: 2,
                    elevation: 5,
                }}>
                    {/* Display the content of the quote */}
                    <Text style={{
                        color: "#000",
                        fontSize: 20,
                        lineHeight: 26,
                        letterSpacing: 1,
                        fontWeight: 500,
                        textAlign: "center",
                        marginBottom: 10,
                    }}>{`"${item.content}"`}</Text>
                    {/* Display the author of the quote */}
                    <Text style={{
                        textAlign: "right",
                        fontWeight: "400",
                        fontStyle: "italic",
                        fontSize: 16,
                        color: "#000",
                        marginTop: 10
                    }}>{`--${item.author}`}</Text>
                    {/* Action buttons for copying, downloading, and sharing the quote */}
                    <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 10 }}>
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
            ))}
        </ScrollView>
    );
}

export default Quotelist;
