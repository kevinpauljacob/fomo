import React, { createContext, useState, useEffect, useMemo } from "react";
import {
  Metaplex,
  bundlrStorage,
  toMetaplexFile,
  walletAdapterIdentity,
} from "@metaplex-foundation/js";
import { Connection, PublicKey } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";

type User = {
  email: string;
  token: string;
  isLoggedIn: boolean;
  walletConnected: boolean;
  walletAddress: string;
};

const initialUserState: User = {
  email: "",
  token: "",
  isLoggedIn: false,
  walletConnected: false,
  walletAddress: "",
};

type ContextType = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  metaplex: any; // Change 'any' to the appropriate type of METAPLEX instance
};

export const UserContext = createContext<ContextType>({
  user: initialUserState,
  setUser: () => {},
  metaplex: null,
});

type UserProviderProps = {
  children: React.ReactNode;
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>(initialUserState);
  const wallet = useWallet();

  const RPC_ENDPOINT =
    "https://old-small-tent.solana-devnet.discover.quiknode.pro/34f843136b5a8476e55f8b424fb9c3a04938c912/";

  const METAPLEX = useMemo(() => {
    const CONNECTION = new Connection(RPC_ENDPOINT);
    const metaplexInstance = Metaplex.make(CONNECTION).use(
      bundlrStorage({
        address: "https://devnet.bundlr.network",
        providerUrl: RPC_ENDPOINT,
        timeout: 60000,
      })
    );

    if (wallet.connected) {
      metaplexInstance.use(walletAdapterIdentity(wallet));
    }

    return metaplexInstance;
  }, [wallet]);

  useEffect(() => {
    if (wallet.connected) {
      const publicKey = METAPLEX.identity().publicKey.toBase58();
      setUser((prevUser) => ({
        ...prevUser,
        walletConnected: true,
        walletAddress: publicKey,
      }));
      console.log(user);
    } else {
      setUser(initialUserState);
    }
  }, [wallet.connected, METAPLEX]);

  return (
    <UserContext.Provider value={{ user, setUser, metaplex: METAPLEX }}>
      {children}
    </UserContext.Provider>
  );
};
