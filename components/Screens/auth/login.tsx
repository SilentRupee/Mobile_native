import React, { useState } from "react";
import { Toast, ToastTitle, useToast } from "@/components/ui/toast";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { LinkText } from "@/components/ui/link";
import { Link } from "expo-router";
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
    <VStack className="w-full flex-1 px-5 pt-4 min-h-screen" space="md">
      <VStack className="w-full mb-8" space="lg">
       
        <VStack space="sm">
          <Heading className="text-4xl font-bold leading-tight text-gray-900">
            Sign in
          </Heading>
          <Text className=" text-base leading-6 text-gray-600">
            Sign in to your Silentrupee account  Merchant
            </Text>
        </VStack>
      </VStack>

      <VStack className="w-full flex-1" space="xl">
        <VStack space="lg" className="w-full">

          <FormControl isInvalid={!!errors.email}>
            <FormControlLabel className="mb-3">
              <FormControlLabelText className="text-sm font-medium text-gray-800">
                Email
                </FormControlLabelText>
            </FormControlLabel>
            <Controller
              name="email"
              defaultValue=""
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input className="h-[52px]">
                  <InputField
                    className="text-base px-4 h-[52px] text-gray-900"
                    placeholder="Email"
                    type="text"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    onSubmitEditing={handleKeyPress}
                    returnKeyType="done"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholderTextColor="#9CA3AF"
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
            <FormControlLabel className="mb-3">
              <FormControlLabelText className="text-sm font-medium text-gray-800">
                Password
                </FormControlLabelText>
            </FormControlLabel>
            <Controller
              defaultValue=""
              name="password"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input className="h-[52px] relative">
                  <InputField
                    className="text-base px-4 pr-12 h-[52px] text-gray-900"
                    placeholder="Password"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    onSubmitEditing={handleKeyPress}
                    returnKeyType="done"
                    type={showPassword ? "text" : "password"}
                     placeholderTextColor="#9CA3AF"
                  />
                  <InputSlot 
                  onPress={handleState} 
                  className="absolute right-4 h-[52px] justify-center"
                  >
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
                className="flex-row items-start mt-2"
              >
                <CheckboxIndicator className="w-[18px] h-[18px] mr-3 mt-0.5">
                  <CheckboxIcon as={CheckIcon} />
                </CheckboxIndicator>
                <CheckboxLabel className="text-sm leading-5 text-gray-700">
                  Remember me
                </CheckboxLabel>
              </Checkbox>
            )}
          />
        </VStack>

        <VStack className="flex-1" />

        <VStack className="w-full mb-6" space="md">
          <Button 
          className="w-full h-[52px] rounded-lg bg-gray-800" 
          onPress={handleSubmit(onSubmit)} 
          isDisabled={loading}
          >
            <ButtonText className="font-medium text-base text-white">
              {loading ? "Signing in..." : "Sign in"}
            </ButtonText>
          </Button>

          <Button
            variant="outline"
            action="secondary"
            className="w-full  h-[52px] rounded-lg border border-gray-300 flex-row items-center justify-center gap-2 "
            onPress={() => {}}
          >
            <ButtonText className="font-medium text-base text-gray-700">
              Continue with Google
            </ButtonText>
            <ButtonIcon as={GoogleIcon} />
          </Button>
        </VStack>

          {/* <Button onPress={()=>{router.push("/(auth)/customerlogin")}}>
            <ButtonText>Customer Login</ButtonText>
          </Button> */}
          <HStack className="self-center mb-6 items-center justify-center" space="sm">
                    <Text className="text-base text-gray-600">
                      Want to log in as a customer?
                    </Text>
                    <Link href="/(auth)/customerlogin">
                      <LinkText className="font-semibold text-base text-primary-700 group-hover/link:text-primary-600 group-hover/pressed:text-primary-700">
                        customerlogin
                      </LinkText>
                    </Link>
                  </HStack>
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