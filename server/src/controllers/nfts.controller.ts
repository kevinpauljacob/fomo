import { Request, Response } from "express";
import NFTModel, { NFTDocument } from "../models/nfts.model";

export const getNFTData = async (req: Request, res: Response) => {
  try {
    const nftData: NFTDocument | null = await NFTModel.findOne({});
    console.log(nftData);
    if (nftData) {
      const { nfts } = nftData;
      res.json({ nfts });
    } else {
      res.status(404).json({ message: "No NFT data found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const addNFTData = async (req: Request, res: Response) => {
  try {
    const { newNFTData } = req.body;

    const nftKey = Object.keys(newNFTData)[0];
    const nftValue = Object.values(newNFTData)[0];

    const query = {};

    const update = {
      $set: {
        [`nfts.${nftKey}`]: nftValue,
      },
    };

    const options = { upsert: true };

    await NFTModel.updateOne(query, update, options);

    res.status(201).json({ message: "Data added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
