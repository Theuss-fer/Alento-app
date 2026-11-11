import {createContext, useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@alento/preferencias';
const TraditionContext = createContext(undefined);

export function useTradition() {
  const ctx = useContext(TraditionContext);

  if (!ctx) {
    throw new Error('useTradition deve ser usado dentro de TraditionProvider');
  }

  return ctx;
}

export function TraditionProvider({children}) {
  const [tradicao, setTradicaoState] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    let ativo = true;

    async function carregarTradicao() {
      try {
        const preferenciasSalvas = await AsyncStorage.getItem(STORAGE_KEY);
        if (!ativo) return;

        if (preferenciasSalvas) {
          const preferencias = JSON.parse(preferenciasSalvas);
          if (preferencias && typeof preferencias.tradicao === 'string') {
            setTradicaoState(preferencias.tradicao);
          }
        }
      } catch (error) {
        console.error('Não foi possível carregar a tradição salva.', error);
      } finally {
        if (ativo) {
          setCarregando(false);
        }
      }
    }

    carregarTradicao();
    return () => {
      ativo = false;
    };
  }, []);

  async function setTradicao(novaTradicao) {
    setTradicaoState(novaTradicao);
    try {
      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({tradicao: novaTradicao}),
      );
    } catch (error) {
      console.error('Não foi possível salvar a tradição.', error);
    }
  }

  return (
    <TraditionContext.Provider value={{carregando, tradicao, setTradicao}}>
      {children}
    </TraditionContext.Provider>
  );
}