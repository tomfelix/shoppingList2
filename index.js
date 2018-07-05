import { AppRegistry } from 'react-native'
import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import { YellowBox } from 'react-native'

import App from './App'
import rootReducer from './reducers/index'


YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader'])

const persistConfig = {
	key: 'root',
	storage: storage,
	stateReconciler: autoMergeLevel2
}
const pReducer = persistReducer(persistConfig, rootReducer)
export const store = createStore(pReducer)
export const persistor = persistStore(store)








AppRegistry.registerComponent('ShoppingList', () => App)
