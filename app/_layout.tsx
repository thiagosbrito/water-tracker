// Import your global CSS file
import { Slot, useRouter, useSegments } from "expo-router";
import { SafeAreaView } from 'react-native-safe-area-context';
import "../global.css";
import ToastManager from 'toastify-react-native'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthProvider, useAuth } from "../provider/AuthProvider";
import { useEffect } from "react";

const InitialLayout = () => {
    const { session, initialized } = useAuth();
    const segments = useSegments();
    const router = useRouter();
    
    useEffect(() => {
        if (!initialized) return;
        const inAuthGroup = segments[0] === '(auth)';

        if (session && !inAuthGroup) {
            router.push('/(tabs)');
        } else if (!session && inAuthGroup) {
            router.push('/(auth)/SignIn');
        }
    }, [session, initialized])

    return <Slot />;
    
}

export default Layout = () => {
    return (
        <AuthProvider>
            <GestureHandlerRootView>
                <BottomSheetModalProvider>
                    <InitialLayout />
                </BottomSheetModalProvider>
            </GestureHandlerRootView>
        </AuthProvider>
    )
};