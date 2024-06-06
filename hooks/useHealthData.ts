import { useEffect, useState } from 'react';
import AppleHealthKit, {
    HealthInputOptions,
    HealthKitPermissions,
    HealthUnit,
    HealthValue,
} from "react-native-health";
import { Platform } from 'react-native';
import { set } from 'react-hook-form';

const useHealthData = () => {
    const [steps, setSteps] = useState(0);
    const [flights, setFlights] = useState(0);
    const [distance, setDistance] = useState(0);
    const [heartRateSamples, setHeatRateSamples] = useState<Array<HealthValue>>([]);
    const [hasPermissions, setHasPermission] = useState(false);

	const { Permissions } = AppleHealthKit.Constants;

    useEffect(() => {
        if (Platform.OS !== 'ios') {
            return;
        }

        AppleHealthKit.initHealthKit(permissions, (err) => {
            if (err) {
                console.log('Error getting permissions');
                return;
          }
          setHasPermission(true);
        });
    }, []);

    useEffect(() => {
        if (!hasPermissions) return;

        const optionsSteps: HealthInputOptions = {
            date: new Date().toISOString()
        };

        AppleHealthKit.getStepCount(optionsSteps, (err, results) => {
            if (err) {
                console.error(err);
                return;
            }
            setSteps(results.value);
        });

        const optionsHeartRate: HealthInputOptions = {
            unit: 'bpm' as HealthUnit.bpm, // optional; default 'bpm'
            startDate: (new Date(2024,6,1)).toISOString(), // required
            endDate: (new Date()).toISOString(), // optional; default now
            ascending: false, // optional; default false
            limit:10, // optional; default no limit
        }
        AppleHealthKit.getHeartRateSamples(optionsHeartRate, (err, results) => {
            if (err) {
                console.error(err);
            }

            setHeatRateSamples(results);
        })
    }, [hasPermissions])

    const permissions: HealthKitPermissions = {
        permissions: {
            read: [
                Permissions.Steps,
                Permissions.FlightsClimbed,
                Permissions.DistanceWalkingRunning,
                Permissions.HeartRate
            ],
            write: [],
        },
    };

    return { steps, flights, distance, heartRateSamples };
};

export default useHealthData;