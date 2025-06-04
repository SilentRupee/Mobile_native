import { useLoginWithOAuth } from '@privy-io/expo';
import { Button, View, Text } from 'react-native';

export default function LoginButton() {
  const { login, state } = useLoginWithOAuth();

  const handleGoogleLogin = async () => {
    try {
      await login({ provider: 'google' });
    } catch (error) {
      console.error('Google login error:', error);
    }
  };
  return (
    <View>
      <Button
        onPress={handleGoogleLogin}
        disabled={state.status === 'loading'}
        title={state.status === 'loading' ? 'Logging in...' : 'Login with Google'}
      />
      {state.status === 'error' && (
        <Text style={{ color: 'red', marginTop: 10 }}>
          {state.error?.message || 'Failed to login with Google'}
        </Text>
      )}
    </View>
  );
}