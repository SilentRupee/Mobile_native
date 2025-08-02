import React, { useState, useEffect } from "react"
import ProductTable from "../PaymentTableComp/PaymentTable"
import { Button, ButtonText } from '@/components/ui/button';
import { VStack } from '@/components/ui/vstack';
import { router } from 'expo-router';
import axios from "axios"
import { BACKEND_URL } from "@/BackendUrl"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { jwtDecode } from "jwt-decode"

interface ProductData {
  id: string
  name: string
  description?: string
  price: number
  category: string
  subcategory?: string
  stock: number
  isAvailable: boolean
  isVeg?: boolean
  brand?: string
  unit?: string
}

const PaymentDashboard = () => {
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [data, setData] = useState<ProductData[]>([
    {
      id: "1",
      name: "Chicken Biryani",
      description: "Spicy chicken biryani with aromatic rice",
      price: 250.00,
      category: "Main Course",
      subcategory: "Biryani",
      stock: 15,
      isAvailable: true,
      isVeg: false,
      brand: "Restaurant",
      unit: "Plate"
    },
    {
      id: "2",
      name: "Paneer Tikka",
      description: "Grilled cottage cheese with spices",
      price: 180.00,
      category: "Appetizer",
      subcategory: "Tikka",
      stock: 8,
      isAvailable: true,
      isVeg: true,
      brand: "Restaurant",
      unit: "Piece"
    },
    {
      id: "3",
      name: "Butter Chicken",
      description: "Creamy tomato-based curry with chicken",
      price: 220.00,
      category: "Main Course",
      subcategory: "Curry",
      stock: 12,
      isAvailable: true,
      isVeg: false,
      brand: "Restaurant",
      unit: "Plate"
    },
    {
      id: "4",
      name: "Dal Makhani",
      description: "Creamy black lentils",
      price: 120.00,
      category: "Main Course",
      subcategory: "Dal",
      stock: 20,
      isAvailable: true,
      isVeg: true,
      brand: "Restaurant",
      unit: "Bowl"
    },
    {
      id: "5",
      name: "Naan",
      description: "Soft leavened bread",
      price: 30.00,
      category: "Bread",
      subcategory: "Tandoor",
      stock: 25,
      isAvailable: true,
      isVeg: true,
      brand: "Restaurant",
      unit: "Piece"
    },
    {
      id: "6",
      name: "Raita",
      description: "Yogurt with cucumber and spices",
      price: 40.00,
      category: "Side Dish",
      subcategory: "Raita",
      stock: 5,
      isAvailable: true,
      isVeg: true,
      brand: "Restaurant",
      unit: "Bowl"
    },
    {
      id: "7",
      name: "Gulab Jamun",
      description: "Sweet dessert balls in sugar syrup",
      price: 60.00,
      category: "Dessert",
      subcategory: "Indian Sweets",
      stock: 0,
      isAvailable: false,
      isVeg: true,
      brand: "Restaurant",
      unit: "Piece"
    },
    {
      id: "8",
      name: "Masala Chai",
      description: "Spiced Indian tea",
      price: 25.00,
      category: "Beverages",
      subcategory: "Hot Drinks",
      stock: 30,
      isAvailable: true,
      isVeg: true,
      brand: "Restaurant",
      unit: "Cup"
    }
  ])

  useEffect(() => {
    const getToken = async () => {
      const token = await AsyncStorage.getItem("token");
      console.log("Token:", token);
      if(token){
      const decode:any=await jwtDecode(token);
      console.log(decode.merchantId);
      const id=decode.merchantId;
      console.log(id);
      const response=await axios.get(`${BACKEND_URL}/api/merchants/${id}/products`);
   
      setData(response.data);
      }
    };
    
    getToken();
  }, []);

  const toggleRowSelection = (id: string) => {
    setSelectedRows(prev => 
      prev.includes(id) 
        ? prev.filter(rowId => rowId !== id)
        : [...prev, id]
    )
  }

  const handleCreateBill = () => {
    if (selectedRows.length === 0) {
      alert("Please select at least one product");
      return;
    }

    const selectedProducts = data.filter(product => selectedRows.includes(product.id));
    
    router.push({
      pathname: "/(tabs)/(merchant)/bill-payment",
      params: { 
        selectedProducts: JSON.stringify(selectedProducts)
      }
    });
  }

  const filteredData = data

  return (
    <VStack className="flex-1">
      <ProductTable data={filteredData} selectedRows={selectedRows} onToggleRowSelection={toggleRowSelection} />
      
      {/* Create Bill Button */}
      {selectedRows.length > 0 && (
        <VStack className="p-4 bg-white border-t border-gray-200">
          <Button 
            className="w-full" 
            onPress={handleCreateBill}
          >
            <ButtonText>Create Bill with {selectedRows.length} Selected Products</ButtonText>
          </Button>
        </VStack>
      )}
    </VStack>
  )
}

export default PaymentDashboard
