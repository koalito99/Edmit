import * as React from "react"
import { useStudentSwitcher } from "../student-switcher";

// enum FeatureFlagStatus {
//     Enabled,
//     Disabled,
//     Unset
// }

const useFeaturesState = () => {
    const student = useStudentSwitcher()
    const [loading, setLoading] = React.useState(false)
    const [features, setFeatures] = React.useState({})

    const loadFeatures = async () => {
        console.log("trying to load features")
        if (student.studentId) {
            setLoading(true)

            console.log("loading features")

            const response = await fetch(
                `${process.env.REACT_APP_API_BASE_URL}/features`,
                {
                    headers: {
                        'X-Edmit-Student-Id': student.studentId,
                    }
                }
            )

            const resp = await response.json()
            setFeatures(resp)
            setLoading(false)
        }
    }

    React.useEffect(() => { loadFeatures() }, [student.studentId])

    const refresh = () => {
        loadFeatures()
    }

    return {
        loading,
        get: features,
        refresh
    }
}


interface IFeaturesContext {
    loading: boolean;
    get: {};
    refresh: () => void;
}

const defaultFeaturesContext: IFeaturesContext = {
    loading: false,
    get: {},
    refresh: () => null
}

const FeaturesContext = React.createContext<IFeaturesContext>(defaultFeaturesContext)

export const FeaturesProvider: React.FC = (props) => {
    const state = useFeaturesState()

    return (
        <FeaturesContext.Provider value={state}>
            {props.children}
        </FeaturesContext.Provider>
    )
}

export const useFeaturesContext = () => React.useContext(FeaturesContext)