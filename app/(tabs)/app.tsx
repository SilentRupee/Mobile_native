import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

const ProfilePage = () => {
  return (
    <ScrollView className="bg-gray-100 flex-1">
      {/* Header */}
      <View className="bg-red-500 p-6 items-center">
        <Image 
          className="w-24 h-24 rounded-full border-4 border-white"
          source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
        />
        <Text className="mt-4 text-white text-2xl font-bold">John Doe</Text>
        <Text className="text-blue-200">Software Developer</Text>
      </View>

      {/* Stats */}
      <View className="flex-row justify-around py-4 bg-white mx-4 mt-6 rounded-lg shadow">
        <View className="items-center">
          <Text className="text-gray-500">Projects</Text>
          <Text className="text-xl font-bold">24</Text>
        </View>
        <View className="items-center">
          <Text className="text-gray-500">Followers</Text>
          <Text className="text-xl font-bold">1.2K</Text>
        </View>
        <View className="items-center">
          <Text className="text-gray-500">Following</Text>
          <Text className="text-xl font-bold">450</Text>
        </View>
      </View>

      {/* Bio Section */}
      <View className="mx-4 mt-6 p-4 bg-white rounded-lg shadow">
        <Text className="text-lg font-bold mb-2">About Me</Text>
        <Text className="text-gray-600">
          Passionate developer creating mobile apps with React Native. Love open source and hiking in my free time.
        </Text>
      </View>

      {/* Skills */}
      <View className="mx-4 mt-6 p-4 bg-white rounded-lg shadow">
        <Text className="text-lg font-bold mb-3">Skills</Text>
        <View className="flex-row flex-wrap">
          {['React Native', 'JavaScript', 'TypeScript', 'Node.js', 'Firebase', 'UI/UX'].map((skill) => (
            <View key={skill} className="bg-blue-100 px-3 py-1 rounded-full mr-2 mb-2">
              <Text className="text-blue-800">{skill}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Action Buttons */}
      <View className="flex-row mx-4 my-6">
        <TouchableOpacity 
          className="flex-1 bg-blue-500 py-3 rounded-lg mr-2 items-center"
          activeOpacity={0.7}
        >
          <Text className="text-white font-bold">Follow</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          className="flex-1 bg-white border border-blue-500 py-3 rounded-lg ml-2 items-center"
          activeOpacity={0.7}
        >
          <Text className="text-blue-500 font-bold">Message</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProfilePage; 