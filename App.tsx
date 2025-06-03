import { ExpoRoot } from 'expo-router';
import './global.css';

export default function App() {
  // @ts-ignore
  const ctx = require.context('./app');
  return <ExpoRoot context={ctx} />;
}
