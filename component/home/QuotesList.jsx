
import React from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

function Quotelist({ data, backgroundColor, shareImage, captureAndSave, copyToClipboard }) {
    // console.log(data);

    return (
        <ScrollView contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: "#63B4E6",
            width: "100%"
        }}>
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
                    <Text style={{
                        color: "#000",
                        fontSize: 20,
                        lineHeight: 26,
                        letterSpacing: 1,
                        fontWeight: 500,
                        textAlign: "center",
                        marginBottom: 10,
                    }}>{`"${item.content}"`}</Text>
                    <Text style={{
                        textAlign: "right",
                        fontWeight: "400",
                        fontStyle: "italic",
                        fontSize: 16,
                        color: "#000",
                        marginTop: 10
                    }}>{`--${item.author}`}</Text>
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
