// Import your global CSS file
import { Slot } from "expo-router";
import { SafeAreaView } from 'react-native-safe-area-context';
import "../global.css";
import ToastManager from 'toastify-react-native'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Layout() {
    return (
        
        <GestureHandlerRootView>
            <BottomSheetModalProvider>
                <ToastManager />
                <Slot />
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
        
    );
}