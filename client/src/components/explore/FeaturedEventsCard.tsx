"use client";
import { useState, useContext, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { UserContext } from "@/context/userContext";
import { toast } from "react-toastify";
import axios from "axios";
import QRCode from "qrcode";
import { v4 as uuidv4 } from "uuid";
import { PublicKey } from "@solana/web3.js";
import { toMetaplexFile } from "@metaplex-foundation/js";
interface CardProps {
  event: {
    eventName: string;
    organizer: string;
    organizerWalletAddress: string;
    description: string;
    startDate: Date;
    endDate: Date;
    location: string;
    capacity: string;
    ticketPrice: string;
    eventId: string;
    imgUri: string;
  };
}

interface NFT {
  uri: string;
  name: string;
  sellerFeeBasisPoints: number;
  symbol: string;
  creators: Object;
  isMutable: boolean;
  address: string | PublicKey;
}

const Card: React.FC<CardProps> = ({ event }) => {
  const { user, metaplex } = useContext(UserContext);

  const [file, setFile] = useState<File | null>(null);
  const [imgUri, setImgUri] = useState<string>("");
  const [arweaveImgUri, setArweaveImgUri] = useState<string>("");
  const [metaDataUri, setMetaDataUri] = useState<string>("");
  const [explorerAddress, setExplorerAddress] = useState<string>("");
  const [loadingState, setLoadingState] = useState<boolean>(false);
  const [showNFTDetails, setShowNFTDetails] = useState<boolean>(false);

  const generateTicketId = (): string => {
    return uuidv4();
  };

  const [ticket, setTicket] = useState({
    eventName: event.eventName,
    eventId: event.eventId,
    walletAddress: user.walletAddress,
    email: user.email,
    ticketId: generateTicketId(),
  });

  const generateQRCode = async () => {
    try {
      const qrCodeDataURL = await QRCode.toDataURL(JSON.stringify(ticket));

      const blob = await fetch(qrCodeDataURL).then((res) => res.blob());
      const qrCodeFile = new File([blob], "ticket.png", { type: "image/png" });
      const imgUri = await uploadImage(qrCodeFile);
      setFile(qrCodeFile);
      return imgUri;
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  };

  useEffect(() => {
    console.log("QR Code generated successfully", file);
  }, [file]);

  async function uploadImage(file: File | null) {
    if (!file) {
      console.error("File is null");
      return;
    }
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = async (event: any) => {
        try {
          const imgBuffer = new Uint8Array(event.target.result);
          const imgMetaplexFile = toMetaplexFile(imgBuffer, file.name);

          const imgUri = await metaplex.storage().upload(imgMetaplexFile);
          setImgUri(imgUri);
          setArweaveImgUri(imgUri);
          console.log("Image URI:", imgUri);
          toast.success("Image Uploaded to Arweave", {
            position: "bottom-right",
          });
          resolve(imgUri);
        } catch (error) {
          console.error("Error uploading image:", error);
          toast.error("Error uploading image", {
            position: "bottom-right",
          });
          reject(error);
        }
      };

      reader.readAsArrayBuffer(file);
    });
  }

  async function uploadMetadata(
    imageUri: string,
    imageType: string,
    eventName: string,
    eventId: string,
    ticketId: string,
    walletAddress: string,
    email: string,
    attributes: any
  ) {
    try {
      const metadataUri = await metaplex.nfts().uploadMetadata({
        eventName: eventName,
        eventId: eventId,
        ticketId: ticketId,
        walletAddress: walletAddress,
        email: email,
        image: imageUri,
        attributes: attributes,
        properties: {
          files: [
            {
              type: imageType,
              uri: imageUri,
            },
          ],
        },
      });

      console.log("Metadata URI:", metadataUri);
      setMetaDataUri(metadataUri.uri);
      toast.success("MetaData uploaded to Arweave", {
        position: "bottom-right",
      });
      return metadataUri;
    } catch (error) {
      console.error("Error uploading metadata:", error);
      toast.error("Error uploading MetaData to Arweave", {
        position: "bottom-right",
      });
      throw error;
    }
  }

  async function mintNft(
    metadataUri: string,
    name: string,
    sellerFee: number,
    symbol: string,
    creators: any
  ) {
    try {
      console.log("Step 3 - Minting NFT");

      const { nft }: { nft: NFT } = await metaplex.nfts().create(
        {
          uri: metadataUri,
          name: name,
          sellerFeeBasisPoints: sellerFee,
          symbol: symbol,
          creators: creators,
          isMutable: false,
        },
        { commitment: "finalized" }
      );

      console.log(`Success! 🎉`);
      console.log("nft", nft);
      if (nft.address !== undefined) {
        console.log(
          `Minted NFT: https://explorer.solana.com/address/${nft.address}?cluster=devnet`
        );
        setExplorerAddress(
          `https://explorer.solana.com/address/${nft.address}?cluster=devnet`
        );
        toast.success("NFT Minted Successfully!", {
          position: "bottom-right",
        });
        setLoadingState(false);

        const ticketData = {
          eventId: ticket.eventId,
          ticketId: ticket.ticketId,
          nftAddress: nft.address.toString(),
          walletAddress: user.walletAddress,
        };

        const response = await axios.post(
          "http://localhost:3333/api/tickets/create",
          ticketData,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        if (response.status === 201 && response.data) {
          console.log("Data sent to server successfully");
        } else {
          console.error("Failed to send data to the server");
        }
      }
    } catch (error) {
      console.error("Error minting NFT:", error);
      toast.error("Error minting NFT!", {
        position: "bottom-right",
      });
    }
  }

  const mint = async () => {
    if (!user.walletConnected) {
      toast.error("Connect your wallet.", {
        position: "bottom-right",
      });
      return;
    }

    try {
      setLoadingState(true);
      setShowNFTDetails(true);
      // Step 1 - Generate QR code &  Upload the image if file is generated successfully
      const imgUri = await generateQRCode();

      // Step 2 - Upload the metadata
      const imgType = "image/png";
      const attributes = [
        { trait_type: "Speed", value: "Quick" },
        { trait_type: "Type", value: "Pixelated" },
        { trait_type: "Background", value: "QuickNode Blue" },
      ];
      const metadataUri = await uploadMetadata(
        imgUri as string,
        imgType,
        ticket.eventName,
        ticket.eventId,
        ticket.ticketId,
        ticket.walletAddress,
        ticket.email,
        attributes
      );

      // Step 3 - Mint the NFT
      const sellerFee = 500;
      const nftSymbol = "TICKET";
      const creators = [{ address: metaplex.identity().publicKey, share: 100 }];

      await mintNft(
        metadataUri.uri,
        ticket.eventName,
        sellerFee,
        nftSymbol,
        creators
      );

      // Reset file and image URI after minting
      setFile(null);
      setImgUri("");
    } catch (error) {
      console.error("Error minting NFT:", error);
    } finally {
      setLoadingState(false);
    }
  };

  return (
    <div className="bg-black/30 hover:bg-black/40 transition-all rounded-lg border border-black/10 p-3 min-h-[220px]">
      <div className="flex justify-between mb-2">
        <Image
          src={event.imgUri}
          alt=""
          width={40}
          height={40}
          className="rounded-md"
        />
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="bg-white/10 hover:bg-white/20 text-sm font-semibold text-white text-opacity-90 hover:text-opacity-100 transition-all px-4 py-1 h-min"
            >
              Attend
            </Button>
          </SheetTrigger>
          <SheetContent className="bg-gray-950">
            <SheetHeader>
              <SheetTitle className="text-white text-opacity-90">
                {event.eventName}
              </SheetTitle>
              <SheetDescription>{event.description}</SheetDescription>
            </SheetHeader>
            <button onClick={() => mint()} disabled={loadingState}>
              {loadingState ? "Minting..." : "Buy Tickets"}
            </button>
          </SheetContent>
        </Sheet>
      </div>
      <h2 className="text-xl font-semibold">{event.eventName}</h2>
      <p className="text-sm font-semibold text-white text-opacity-80 text-ellipsis overflow-hidden">
        {event.description}
      </p>
    </div>
  );
};

export default Card;
