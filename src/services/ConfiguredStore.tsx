import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootReducer from '../reducers'

function configureStore (initialState = {}) {
  const store = createStore(persistReducer({
    key: 'root',
    debug: true,
    storage
  }, rootReducer), initialState)

  const persistor = persistStore(store, null, () => {
    console.log('restoredState', store.getState())
  })

  return { store, persistor }
}

export default configureStore