import * as React from "react";

type Refetcher = () => Promise<void>;

interface ISmartValueContext {
  refetchers: Map<string, Refetcher>;
  refetch: Refetcher;
}

const SmartValueContext = React.createContext<ISmartValueContext | null>(null)

export const SmartValueProvider: React.FC = props => {
  const { current: refetchers } = React.useRef<Map<string, Refetcher>>(new Map())

  return <SmartValueContext.Provider value={{
    refetchers,
    refetch: async () => {
      await Promise.all(Array.from(refetchers, ([key, refetcher]) => refetcher()))
    }
  }}>
    {props.children}
  </SmartValueContext.Provider>
}

export const useSmartValue = () => React.useContext(SmartValueContext);

export const useUpdateSmartValueRefetcher = (id: string, refetcher: Refetcher, deps: any[] = []) => {
  const smartValue = useSmartValue()

  React.useEffect(() => {
    if (smartValue) {
      smartValue.refetchers.set(id, refetcher)
    }

    return () => {
      if (smartValue) {
        smartValue.refetchers.delete(id)
      }
    }
  }, [...deps])
}