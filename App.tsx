import { ExpoRoot } from 'expo-router';
import './global.css';
import "nativewind/tailwind.css";
import AuthProvider from './src/providers/AuthProvider';

export default function App() {
  // @ts-ignore
  const ctx = require.context('./app');
  return (
    <AuthProvider>
      <ExpoRoot context={ctx} />
    </AuthProvider>
  );
}
