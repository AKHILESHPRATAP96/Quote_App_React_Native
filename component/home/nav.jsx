import React from 'react';
import { View, Image, Text } from 'react-native';

// Navigation component for the app header
function Nav() {
    return (
        // Header container styles
        <View style={{
            flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
            padding: 10, backgroundColor: "#ECECE1", shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.8, shadowRadius: 2, elevation: 5, width: "100%", marginBottom: 5
        }}>

            {/* App logo */}
            <Image source={require('../assets/appLogo.png')} style={{ height: 50, width: 50 }} />

            {/* App title */}
            <Text style={{
                textAlign: 'center', flex: 1, marginLeft: 20,
                fontWeight: '600', fontSize: 32, color: '#33D486',
                textShadowColor: '#000', textShadowOffset: { width: 1, height: 1 },
                textShadowRadius: 2
            }}>Wisdom Words</Text>
        </View>
    );
}

export default Nav;
