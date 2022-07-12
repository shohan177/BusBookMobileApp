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
    const { onPress } = props
    const focused = props.accessibilityState.selected
    const viewRef = React.useRef(null)
    React.useEffect(() => {
        if (focused) {
            viewRef.current.animate({ 0: { scale: 0.5, rotate: '0deg' }, 1: { scale: 1.5, rotate: '360deg' } })
        } else {
            viewRef.current.animate({ 0: { scale: 1.5, rotate: '360deg' }, 1: { scale: 1, rotate: '0deg' } })
        }
    }, [focused])
    console.log(focused)
    return (
        <TouchableOpacity style={styles.tabContainer} onPress={onPress} activeOpacity={1}>
            <Animatable.View ref={viewRef} duration={1000}>

                <AntDesign name="home" size={30} color={focused ? 'red' : 'blue'} />
            </Animatable.View>
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
                            <AntDesign name="home" size={30} color="#900" />
                        ),
                        tabBarButton: (props) => <Tabbutton {...props} />
                    }}
                />
                <Tab.Screen name="Profile" component={ProfileScreen}
                    options={{
                        tabBarIcon: ({ color, focused }) => (
                            <AntDesign name="user" size={30} color="#900" />
                        ),
                        tabBarButton: (props) => <Tabbutton {...props} />
                    }}
                />
                <Tab.Screen name="Menu" component={MenuScreen}
                    options={{
                        tabBarIcon: ({ color, focused }) => (
                            <AntDesign name="appstore-o" size={30} color="#900" />
                        ),
                        tabBarButton: (props) => <Tabbutton {...props} />
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
    }
})