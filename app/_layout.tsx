// Import your global CSS file
import { Slot } from "expo-router";
import { SafeAreaView } from 'react-native-safe-area-context';
import "../global.css";
import ToastManager from 'toastify-react-native'

export default function Layout() {
    return (
        <>
            <ToastManager />
            <Slot />
        </>
    );
}