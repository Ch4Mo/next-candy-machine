/* eslint-disable react-hooks/exhaustive-deps */
import Head from "next/head";
import { useEffect, useState } from "react";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import useCandyMachine from "../hooks/useCandyMachine";
import useWalletBalance from "../hooks/useWalletBalance";
import { useWallet } from "@solana/wallet-adapter-react";

import { Toaster } from "react-hot-toast";
import Countdown from "react-countdown";
import useWalletNfts from "../hooks/useWalletNFTs";
import AnNFT from "../components/AnNFT/AnNFT";

export default function Home() {
  const [balance] = useWalletBalance();
  const {
    isSoldOut,
    mintStartDate,
    isMinting,
    startMint,
    startMintMultiple,
    nftsData,
  } = useCandyMachine();

  const [isLoading, nfts] = useWalletNfts();

  const { connected } = useWallet();

  const [isMintLive, setIsMintLive] = useState(false);

  useEffect(() => {
    if (new Date(mintStartDate).getTime() < Date.now()) {
      setIsMintLive(true);
    }
  }, []);

  const MintMany = () => {
    const [mintCount, setMintCount] = useState(2);

    return (
      <>
              <p className="count">{nftsData.itemsRemaining}/
            {nftsData.itemsAvailable}</p>
        <button
          onClick={() => startMintMultiple(mintCount)}
          disabled={isMinting}
          className="button"
        >
          {isMinting ? "loading" : `MINT`}
          
          <style jsx>{`
        .button {
          background-color: #c038ee;
          color: white;
          border-radius: 5em;
          border: none;
          width: 100px;
          font-weight: bold;
          font-size: 25px;
          margin-top:20px;
          padding-top: 10px;
          padding-bottom: 10px;

        }
      `}</style>

        </button>



      </>
    );
  };

  return (
    <>
      <Head>
        <title>SolDrinks</title>
        <meta
          name="description"
          content="Welcome to SolDrinks Lounge!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col items-center min-h-screen mx-6">
        <Toaster />
        <div className="flex items-center justify-between w-full mt-3">
          <a href="https://www.soldrinks.xyz"><img src="https://www.soldrinks.xyz/img/SolDrinks_Logo.webp"></img></a>
          
          <style jsx>{`
        img {

          width: 200px;
        }
      `}</style>


          <div className="flex items-center">

            <WalletMultiButton style={{
              backgroundColor: '#c038ee',
              borderRadius: '5em',
            }}/>
          </div>
        </div>
       
        <div className="flex items-start justify-center w-11/12 my-10">
          {connected ? (
            <>
              {new Date(mintStartDate).getTime() < Date.now() ? (
                <>
                  {isSoldOut ? (
                    <p>SOLD OUT</p>
                  ) : (
                    <>
                      
                     
                      <div className="container">

                        <img src="https://www.soldrinks.xyz/img/SolDrinks_Front_Page_Gif.gif"></img>
                        

                        <style jsx>{`
                          .container {
                            padding-top: 100px;
                            text-align: center;

                                     }
                                     img {
                                       text-align: center;
                                       margin: auto;
                                       width: 450px;
                                     }
                      `}</style>
                        <MintMany />
                      </div>
                    </>
                  )}
                </>
              ) : (
                <Countdown
                  date={mintStartDate}
                  onMount={({ completed }) => completed && setIsMintLive(true)}
                  onComplete={() => setIsMintLive(true)}
                />
              )}
            </>
          ) : (
            <p>Connect wallet</p>
          )}
        </div>
        
      </div>
    </>
  );
}
