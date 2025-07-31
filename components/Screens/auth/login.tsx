import React, { useState } from "react";
import { Toast, ToastTitle, useToast } from "@/components/ui/toast";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { LinkText } from "@/components/ui/link";
import Link from "@unitools/link";
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import {
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from "@/components/ui/checkbox";
import {
  ArrowLeftIcon,
  CheckIcon,
  EyeIcon,
  EyeOffIcon,
  Icon,
} from "@/components/ui/icon";
import { Button, ButtonText, ButtonIcon } from "@/components/ui/button";
import { Keyboard } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle } from "lucide-react-native";
import { GoogleIcon } from "./assets/google";
import { Pressable } from "@/components/ui/pressable";
import { router } from "expo-router";
import { AuthLayout } from "../layout/layout";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosError } from "axios";
import { jwtDecode } from "jwt-decode";
import {BACKEND_URL} from "@/BackendUrl";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
  rememberme: z.boolean().optional(),
});
type LoginSchemaType = z.infer<typeof loginSchema>;

const LoginWithLeftBackground = () => {
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });
  const toast = useToast();
  const onSubmit = async (data: LoginSchemaType) => {
    setLoading(true);
    try {

      console.log("Checking server status...");
      console.log("Baek",BACKEND_URL);
      await axios.get(`${BACKEND_URL}/check`);
      console.log("Server is responsive.");

     
      const response = await axios.post(`${BACKEND_URL}/api/auth/login`, {
        email: data.email,
        password: data.password,
      });

      console.log("Login successful:", response.data);

      // Store the token
      await AsyncStorage.setItem("token", response.data.token);

      // Decode token for potential use (e.g., storing user info)
      const decoded = jwtDecode(response.data.token);
      console.log("Decoded Token:", decoded);

      // Navigate to the merchant tab
      router.replace("/(tabs)/(merchant)");

      // Show success message
      toast.show({
        placement: "bottom right",
        render: ({ id }: any) => {
          return (
            <Toast nativeID={id} variant="solid" action="success">
              <ToastTitle>Login successful!</ToastTitle>
            </Toast>
          );
        },
      });

    } catch (err) {
      console.error("An error occurred during login:", err); // Log the full error for debugging

      let errorMessage = "An unexpected error occurred. Please try again.";

      // Safely check if the error is an Axios error and has a response from the server
      if (axios.isAxiosError(err) && err.response) {
        // Use the specific error message from the API if available
        errorMessage = err.response.data?.message || "Login failed. Please check your credentials.";
        console.error("API Error Response:", err.response.data);
      } else if (err instanceof Error) {
        // Handle other types of errors (e.g., network issues)
        errorMessage = err.message;
      }

      // Show error message
      toast.show({
        placement: "bottom right",
        render: ({ id }: any) => {
          return (
            <Toast nativeID={id} variant="solid" action="error">
              <ToastTitle>{errorMessage}</ToastTitle>
            </Toast>
          );
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };

  const handleKeyPress = () => {
    Keyboard.dismiss();
    handleSubmit(onSubmit)();
  };

  return (
    <VStack className="max-w-[440px] w-full" space="md">
      <VStack className="md:items-center" space="md">
       
        <VStack>
          <Heading className="md:text-center" size="3xl">
            Sign in
          </Heading>
          <Text>Sign in to your Silentrupee account  Merchant</Text>
        </VStack>
      </VStack>
      <VStack className="w-full">
        <VStack space="xl" className="w-full">
          <FormControl isInvalid={!!errors.email}>
            <FormControlLabel>
              <FormControlLabelText>Email</FormControlLabelText>
            </FormControlLabel>
            <Controller
              name="email"
              defaultValue=""
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input>
                  <InputField
                    className="text-sm"
                    placeholder="Email"
                    type="text"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    onSubmitEditing={handleKeyPress}
                    returnKeyType="done"
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </Input>
              )}
            />
            <FormControlError>
              <FormControlErrorIcon size="md" as={AlertTriangle} />
              <FormControlErrorText>
                {errors?.email?.message}
              </FormControlErrorText>
            </FormControlError>
          </FormControl>
          <FormControl isInvalid={!!errors.password}>
            <FormControlLabel>
              <FormControlLabelText>Password</FormControlLabelText>
            </FormControlLabel>
            <Controller
              defaultValue=""
              name="password"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input>
                  <InputField
                    className="text-sm"
                    placeholder="Password"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    onSubmitEditing={handleKeyPress}
                    returnKeyType="done"
                    type={showPassword ? "text" : "password"}
                  />
                  <InputSlot onPress={handleState} className="pr-3">
                    <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
                  </InputSlot>
                </Input>
              )}
            />
            <FormControlError>
              <FormControlErrorIcon size="sm" as={AlertTriangle} />
              <FormControlErrorText>
                {errors?.password?.message}
              </FormControlErrorText>
            </FormControlError>
          </FormControl>

          <Controller
            name="rememberme"
            defaultValue={false}
            control={control}
            render={({ field: { onChange, value } }) => (
              <Checkbox
                size="sm"
                value="Remember me"
                isChecked={value}
                onChange={onChange}
                aria-label="Remember me"
              >
                <CheckboxIndicator>
                  <CheckboxIcon as={CheckIcon} />
                </CheckboxIndicator>
                <CheckboxLabel>
                  Remember me
                </CheckboxLabel>
              </Checkbox>
            )}
          />
        </VStack>

        <VStack className="w-full my-7" space="lg">
          <Button className="w-full" onPress={handleSubmit(onSubmit)} isDisabled={loading}>
            <ButtonText className="font-medium">
              {loading ? "Signing in..." : "Sign in"}
            </ButtonText>
          </Button>
          <Button
            variant="outline"
            action="secondary"
            className="w-full gap-1"
            onPress={() => {}}
          >
            <ButtonText className="font-medium">
              Continue with Google
            </ButtonText>
            <ButtonIcon as={GoogleIcon} />
          </Button>
        </VStack>
          <Button onPress={()=>{router.push("/(auth)/customerlogin")}}>
            <ButtonText>Customer Login</ButtonText>
          </Button>
      </VStack>
    </VStack>
  );
};

export const Login = () => {
  return (
    <AuthLayout>
      <LoginWithLeftBackground />
    </AuthLayout>
  );
};