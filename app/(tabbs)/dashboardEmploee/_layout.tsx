import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  console.log('TabLayout chamado');
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'blue',
        tabBarInactiveBackgroundColor: '#dfdfdf',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Serviços Agendados',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="calendar" color={color} />,
        }}
      />
      <Tabs.Screen
        name="ScheduledTimes"
        options={{
          title: 'Horários Agendados',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="clock-o" color={color}  />,
        }}
      />
      <Tabs.Screen
        name="EmpoyeeProfile"
        options={{
          title: 'Meu Perfil',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />,
        }}
      />
    </Tabs>
  );
}

