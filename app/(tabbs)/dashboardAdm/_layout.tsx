import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
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
        name="RegisteredEmployees"
        options={{
          title: 'Funcionários Registrados',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="users" color={color} />,
        }}
      />
      <Tabs.Screen
        name="RegisteredClients"
        options={{
          title: 'Clientes Cadastrados',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="list-ul" color={color} />,
        }}
      />
      {/* <Tabs.Screen
        name="RegisterSchedule"
        options={{
          tabBarButton: () => null,
          title: 'Cadastrar Horário',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />,
        }}
      /> */}
      <Tabs.Screen
      name="RegisterEmployee"
      options={{ 
        tabBarButton: () => null,
        title: 'Cadastrar Funcionário',
        tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />,
      }}
      />
      <Tabs.Screen
        name="AdmProfile"
        options={{
          title: 'Meu Perfil',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />,
        }}
      />

    </Tabs>
  );
}

