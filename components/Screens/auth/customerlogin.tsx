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
import { Keyboard,Dimensions } from "react-native";
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

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const BACKEND_URL = "http://192.168.29.157:3003";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
  rememberme: z.boolean().optional(),
});
type LoginSchemaType = z.infer<typeof loginSchema>;

const CustomerLoginWithLeftBackground = () => {
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
      console.log("Attempting to connect to:", `${BACKEND_URL}/api/auth/login`);
      console.log("Request data:", { email: data.email, password: data.password });
      
      const response = await axios.post(`${BACKEND_URL}/api/customer/login`, {
        email: data.email,
        password: data.password,
      });

      console.log("Login successful:", response.data);

      await AsyncStorage.setItem("token", response.data.token);
   

      const decoded = jwtDecode(response.data.token);
      console.log("Decoded Token:", decoded);

      router.replace("/(tabs)/(customer)");


    } catch (err) {
      console.error("An error occurred during login:", err);

      let errorMessage = "An unexpected error occurred. Please try again.";

      if (axios.isAxiosError(err) && err.response) {
        errorMessage = err.response.data?.message || "Login failed. Please check your credentials.";
        console.error("API Error Response:", err.response.data);
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }

    
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
      {/* Header Section */}
      <VStack className="w-full mb-8" space="lg">
        {/* <Pressable
          onPress={() => {
            router.back();
          }}
          className="w-10 h-10 justify-center"
        >
          <Icon
            as={ArrowLeftIcon}
            className="stroke-background-800"
            size="xl"
          />
        </Pressable> */}
        
        <VStack space="sm">
          <Heading className="text-4xl font-bold leading-tight text-gray-900">
            Customer Sign in
          </Heading>
          <Text className="text-base leading-6 text-gray-600">
            Sign in to your Silentrupee account Customer
          </Text>
        </VStack>
      </VStack>

      {/* Form Section */}
      <VStack className="w-full flex-1" space="xl">
        <VStack space="lg" className="w-full">
          {/* Email Input */}
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

          {/* Password Input */}
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

          {/* Remember Me Checkbox */}
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

        {/* Spacer to push buttons down */}
        <VStack className="flex-1" />

        {/* Buttons Section */}
        <VStack className="w-full mb-2" space="md">
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
            className="w-full h-[52px] rounded-lg border border-gray-300 flex-row items-center justify-center gap-2"
            onPress={() => {}}
          >
            <ButtonText className="font-medium text-base text-gray-700">
              Continue with Google
            </ButtonText>
            <ButtonIcon as={GoogleIcon} />
          </Button>
        </VStack>

        {/* Sign Up Link */}
        <HStack className="self-center mb-14 items-center justify-center" space="sm">
          <Text className="text-base text-gray-600">
            Don't have an account?
          </Text>
          <Link href="/(auth)/signUp">
            <LinkText className="font-semibold text-base text-primary-700 group-hover/link:text-primary-600 group-hover/pressed:text-primary-700">
              Sign up
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
      <CustomerLoginWithLeftBackground />
    </AuthLayout>
  );
};