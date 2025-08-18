// import React, { useState, useEffect } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { onAuthStateChanged } from 'firebase/auth';
// import { doc, getDoc } from 'firebase/firestore';
// import { auth, db } from './firebase/firebaseConfig';
// import { ThemeProvider } from './context/ThemeContext';

// // Importa as telas
// import LoginScreen from './screens/LoginScreen';
// import SignUpScreen from './screens/SignUpScreen';
// import ProfileFormScreen from './screens/ProfileFormScreen';
// import MuralScreen from './screens/MuralScreen';
// import CarteirinhaScreen from './screens/CarteirinhaScreen';

// const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();

// // Navegação principal do app (após o login e perfil completo)
// function AppTabs() {
//   return (
//     <Tab.Navigator screenOptions={{ headerShown: false }}>
//       <Tab.Screen name="Mural" component={MuralScreen} />
//       <Tab.Screen name="Carteirinha" component={CarteirinhaScreen} />
//     </Tab.Navigator>
//   );
// }

// // Navegação de autenticação (antes do login)
// function AuthStack() {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="Login" component={LoginScreen} />
//       <Stack.Screen name="SignUp" component={SignUpScreen} />
//       <Stack.Screen name="ProfileForm" component={ProfileFormScreen} />
//       <Stack.Screen name="Mural" component={MuralScreen} />
//     </Stack.Navigator>
//   );
// }

// function AppContent() {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [profileExists, setProfileExists] = useState(false);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
//       if (currentUser) {
//         const userDocRef = doc(db, 'users', currentUser.uid);
//         const userDoc = await getDoc(userDocRef);
//         setProfileExists(userDoc.exists());
//         setUser(currentUser);
//       } else {
//         setUser(null);
//         setProfileExists(false);
//       }
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   if (loading) {
//     return null; // Ou uma tela de splash
//   }

//   return (
//     <NavigationContainer>
//       <Stack.Navigator screenOptions={{ headerShown: false }}>
//         {user ? (
//           profileExists ? (
//             <Stack.Screen name="App" component={AppTabs} />
//           ) : (
//             <Stack.Screen name="ProfileForm" component={ProfileFormScreen} />
//           )
//         ) : (
//           <Stack.Screen name="Auth" component={AuthStack} />
//         )}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// export default function App() {
//   return (
//     <ThemeProvider>
//       <AppContent />
//     </ThemeProvider>
//   );
// }