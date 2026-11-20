import {createContext, useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TRADICOES, versoesDaTradicao} from '../data/versoes';

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
  const [versaoId, setVersaoIdState] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    let ativo = true;

    async function carregarPreferencias() {
      try {
        const preferenciasSalvas = await AsyncStorage.getItem(STORAGE_KEY);
        if (!ativo) return;

        if (preferenciasSalvas) {
          const preferencias = JSON.parse(preferenciasSalvas);
          const tradicaoSalva = preferencias?.tradicao;
          const tradicaoValida = TRADICOES.some(
            (item) => item.id === tradicaoSalva,
          );

          if (tradicaoValida) {
            const versoes = versoesDaTradicao(tradicaoSalva);
            const versaoValida = versoes.some(
              (versao) => versao.id === preferencias.versaoId,
            );
            setTradicaoState(tradicaoSalva);
            setVersaoIdState(
              versaoValida ? preferencias.versaoId : versoes[0]?.id ?? null,
            );
          }
        }
      } catch (error) {
        console.error('Não foi possível carregar as preferências salvas.', error);
      } finally {
        if (ativo) {
          setCarregando(false);
        }
      }
    }

    carregarPreferencias();
    return () => {
      ativo = false;
    };
  }, []);

  async function salvar(novaTradicao, novaVersaoId) {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({tradicao: novaTradicao, versaoId: novaVersaoId}),
      );
    } catch (error) {
      console.error('Não foi possível salvar as preferências.', error);
    }
  }

  async function setTradicao(novaTradicao) {
    const novaVersaoId = versoesDaTradicao(novaTradicao)[0]?.id ?? null;
    setTradicaoState(novaTradicao);
    setVersaoIdState(novaVersaoId);
    await salvar(novaTradicao, novaVersaoId);
  }

  async function setVersao(novaVersaoId) {
    setVersaoIdState(novaVersaoId);
    await salvar(tradicao, novaVersaoId);
  }

  return (
    <TraditionContext.Provider
      value={{carregando, tradicao, setTradicao, versaoId, setVersao}}
    >
      {children}
    </TraditionContext.Provider>
  );
}