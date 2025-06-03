// import { Stack } from 'expo-router';
// import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

// export default function ProfilePage() {
//   return (
//     <>
//       <Stack.Screen options={{ title: 'Profile' }} />
//       <ScrollView style={{ flex: 1, backgroundColor: '#f3f4f6' }}>
//         {/* Header */}
//         <View style={{ backgroundColor: '#3b82f6', padding: 24, alignItems: 'center' }}>
//           <Image 
//             style={{ width: 96, height: 96, borderRadius: 48, borderWidth: 4, borderColor: 'white' }}
//             source={require('../assets/icon.png')}
//           />
//           <Text style={{ marginTop: 16, color: 'white', fontSize: 24, fontWeight: 'bold' }}>John Doe</Text>
//           <Text style={{ color: '#bfdbfe' }}>Software Developer</Text>
//         </View>

//         {/* Stats */}
//         <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 16, backgroundColor: 'white', margin: 16, borderRadius: 8, elevation: 2 }}>
//           <View style={{ alignItems: 'center' }}>
//             <Text style={{ color: '#6b7280' }}>Projects</Text>
//             <Text style={{ fontSize: 20, fontWeight: 'bold' }}>24</Text>
//           </View>
//           <View style={{ alignItems: 'center' }}>
//             <Text style={{ color: '#6b7280' }}>Followers</Text>
//             <Text style={{ fontSize: 20, fontWeight: 'bold' }}>1.2K</Text>
//           </View>
//           <View style={{ alignItems: 'center' }}>
//             <Text style={{ color: '#6b7280' }}>Following</Text>
//             <Text style={{ fontSize: 20, fontWeight: 'bold' }}>450</Text>
//           </View>
//         </View>

//         {/* Bio Section */}
//         <View style={{ margin: 16, padding: 16, backgroundColor: 'white', borderRadius: 8, elevation: 2 }}>
//           <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>About Me</Text>
//           <Text style={{ color: '#4b5563' }}>
//             Passionate developer creating mobile apps with React Native. Love open source and hiking in my free time.
//           </Text>
//         </View>

//         {/* Skills */}
//         <View style={{ margin: 16, padding: 16, backgroundColor: 'white', borderRadius: 8, elevation: 2 }}>
//           <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>Skills</Text>
//           <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
//             {['React Native', 'JavaScript', 'TypeScript', 'Node.js', 'Firebase', 'UI/UX'].map((skill) => (
//               <View key={skill} style={{ backgroundColor: '#dbeafe', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 16, marginRight: 8, marginBottom: 8 }}>
//                 <Text style={{ color: '#1e40af' }}>{skill}</Text>
//               </View>
//             ))}
//           </View>
//         </View>

//         {/* Action Buttons */}
//         <View style={{ flexDirection: 'row', margin: 16, marginTop: 24 }}>
//           <TouchableOpacity 
//             style={{ flex: 1, backgroundColor: '#3b82f6', padding: 12, borderRadius: 8, marginRight: 8, alignItems: 'center' }}
//             activeOpacity={0.7}
//           >
//             <Text style={{ color: 'white', fontWeight: 'bold' }}>Follow</Text>
//           </TouchableOpacity>
//           <TouchableOpacity 
//             style={{ flex: 1, backgroundColor: 'white', borderWidth: 1, borderColor: '#3b82f6', padding: 12, borderRadius: 8, marginLeft: 8, alignItems: 'center' }}
//             activeOpacity={0.7}
//           >
//             <Text style={{ color: '#3b82f6', fontWeight: 'bold' }}>Message</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </>
//   );
// } 