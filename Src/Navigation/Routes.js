// In App.js in a new project
import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as Animatable from 'react-native-animatable';


function HomeScreen() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#900' }}>
            <Icon name="rocket" size={30} color="#900" />
            <Text>Home Screen</Text>
        </View>
    );
}
function ProfileScreen() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'green' }}>
            <Text>Profile Screen</Text>
        </View>
    );
}
function MenuScreen() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'yellow' }}>
            <Text>Menu Screen</Text>
        </View>
    );
}

const Tabbutton = (props) => {
    const { onPress, icon, header } = props
    const focused = props.accessibilityState.selected
    const viewRef = React.useRef(null)
    React.useEffect(() => {
        if (focused) {
            viewRef.current.animate({ 0: { scale: 0.5, translateY: 0 }, 1: { scale: 1.2, translateY: -10 } })
        } else {
            viewRef.current.animate({ 0: { scale: 1.2, translateY: -10 }, 1: { scale: 1, translateY: 0 } })
        }
    }, [focused])
    console.log(focused)
    return (
        <TouchableOpacity style={styles.tabContainer} onPress={onPress} activeOpacity={1}>
            <View>
                <Animatable.View ref={viewRef} duration={700} style={focused ? styles.activeTab : styles.tab}>

                    <AntDesign name={icon} size={30} color={focused ? '#ffffff' : 'blue'} />
                </Animatable.View>
            </View>

            <Text style={{ fontSize: 12, color: '#0f0f0f', fontWeight: '400', bottom: 2 }}>{header}</Text>
        </TouchableOpacity>
    )
}



const Tab = createBottomTabNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarStyle: {
                        height: 60,
                        position: 'absolute',
                        bottom: 16,
                        right: 16,
                        left: 16,
                        borderRadius: 10

                    }
                }}
            >
                <Tab.Screen name="Home" component={HomeScreen}
                    options={{
                        tabBarIcon: ({ color, focused }) => (
                            <AntDesign name="home" size={25} color="#900" />
                        ),
                        tabBarButton: (props) => <Tabbutton {...props} icon="home" header="Home" />
                    }}
                />
                <Tab.Screen name="Profile" component={ProfileScreen}
                    options={{
                        tabBarIcon: ({ color, focused }) => (
                            <AntDesign name="user" size={25} color="#900" />
                        ),
                        tabBarButton: (props) => <Tabbutton {...props} icon="user" header="Profile" />
                    }}
                />
                <Tab.Screen name="Menu" component={MenuScreen}
                    options={{
                        tabBarIcon: ({ color, focused }) => (
                            <AntDesign name="appstore-o" size={25} color="#900" />
                        ),
                        tabBarButton: (props) => <Tabbutton {...props} icon="appstore-o" header="Menu" />
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    tabContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    activeTab: {
        backgroundColor: "#689dff",
        padding: 6,
        borderRadius: 50,
        borderColor: '#ffffff',
        borderWidth: 2,
        // transform: [{ translateY: -10 }]
        // bottom: 10,

    },
    tab: {
        backgroundColor: '#ffffff',
        borderColor: '#ffffff',
        padding: 5,
        borderRadius: 50,
    }
})