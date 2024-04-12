"use client";
import Image from "next/image";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "react-toastify";
import { UserContext } from "@/context/userContext";
import axios from "axios";
import { toMetaplexFile } from "@metaplex-foundation/js";

interface EventData {
  eventName: string;
  organizer: string;
  organizerWalletAddress: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location: string;
  capacity: string;
  ticketPrice: string;
  imgUri: string;
}

export default function CreateEvent() {
  const { user, metaplex } = useContext(UserContext);
  const router = useRouter();
  const [formData, setFormData] = useState<EventData>({
    eventName: "",
    organizer: "",
    organizerWalletAddress: "",
    description: "",
    startDate: new Date(),
    endDate: new Date(),
    location: "",
    capacity: "0",
    ticketPrice: "0.0",
    imgUri: "",
  });
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (!user || !user.isLoggedIn) {
      router.replace("/auth/signin");
    }
  }, [router, user]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    if (name === "startDate" || name === "endDate") {
      // For date inputs, parse the value into a Date object
      setFormData((prevData) => ({
        ...prevData,
        [name]: new Date(value),
      }));
    } else {
      // For other inputs, update the value directly
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log("Selected file:", file); // Log the selected file to check if it's captured
    setFile(file || null);
  };

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
          setFormData((prevData) => ({
            ...prevData,
            imgUri: imgUri,
          }));
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

  useEffect(() => {
    uploadImage(file);
  }, [file]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data:", formData);

    try {
      console.log("updated form data", formData);
      const response = await axios.post(
        "http://localhost:3333/api/events/create",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      console.log(response.data);
      toast.success("Event created successfully", { position: "bottom-right" });
      router.push("/explore");
    } catch (error) {
      console.error("Error creating event:", error);
      toast.error("Failed to create event", { position: "bottom-right" });
    }
  };

  return (
    <>
      <div className="min-h-[calc(100vh-141px)] w-[850px] mx-auto">
        <div className="border-b border-white/20 pb-5 mb-5">
          <h1 className="text-3xl font-bold">Create Event</h1>
        </div>
        <form onSubmit={handleSubmit} className="">
          <div className="flex justify-between">
            <div className="w-[38%]">
              <div className="w-[323px] h-[323px] relative">
                {file && (
                  <img
                    src={URL.createObjectURL(file)}
                    alt="Preview"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "15px",
                    }}
                  />
                )}
                <div className="items-center gap-1.5 absolute bottom-4 left-[17rem] cursor-pointer">
                  <label>
                    <input
                      type="file"
                      accept="image/jpeg, image/png"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <Image
                      src={"/photograph.svg"}
                      alt="desc"
                      width={35}
                      height={35}
                      className="cursor-pointer"
                    />
                  </label>
                </div>
              </div>
              <p className="text-white/70 font-bold mt-4 mb-1">Event Options</p>
              <div>
                <div className="flex flex-col my-3">
                  <Label>Ticket Price</Label>
                  <input
                    type="text"
                    name="ticketPrice" // The name attribute should match the key in the state object
                    id="ticket-price"
                    className="bg-black/20 autofill-none outline-none border border-white/20 focus:border-white/50 focus:bg-black/30 rounded-lg px-3 py-1.5 mt-1 placeholder:text-sm"
                    placeholder="0.0"
                    value={formData.ticketPrice} // Use formData.description to set the value
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="flex flex-col my-3">
                  <Label>Capacity</Label>
                  <input
                    type="text"
                    name="capacity" // The name attribute should match the key in the state object
                    id="capacity"
                    className="bg-black/20 autofill-none outline-none border border-white/20 focus:border-white/50 focus:bg-black/30 rounded-lg px-3 py-1.5 mt-1 placeholder:text-sm"
                    placeholder="0"
                    value={formData.capacity} // Use formData.description to set the value
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="w-[58%]">
              <div className="pb-1">
                <input
                  className="bg-transparent outline-none ring-0 focus:ring-0 border-none text-4xl font-bold text-white placeholder:text-white/50 px-0"
                  type="text"
                  name="eventName"
                  placeholder="Event Name"
                  value={formData.eventName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="flex flex-col my-3">
                <Label>Description</Label>
                <input
                  type="text"
                  name="description" // The name attribute should match the key in the state object
                  id="description"
                  className="bg-black/20 autofill-none outline-none border border-white/20 focus:border-white/50 focus:bg-black/30 rounded-lg px-3 py-1.5 mt-1 placeholder:text-sm"
                  placeholder="Description"
                  value={formData.description} // Use formData.description to set the value
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="flex flex-col my-3">
                <Label>Organizer:</Label>
                <input
                  type="text"
                  name="organizer"
                  placeholder="Organizer"
                  value={formData.organizer}
                  onChange={handleInputChange}
                  required
                  className="bg-black/20 autofill-none outline-none border border-white/20 focus:border-white/50 focus:bg-black/30 rounded-lg px-3 py-1.5 mt-1 placeholder:text-sm"
                />
              </div>
              <div className="flex flex-col my-3">
                <Label>Organizer Wallet Address</Label>
                <input
                  type="text"
                  name="organizerWalletAddress"
                  placeholder="Wallet Address"
                  value={formData.organizerWalletAddress}
                  onChange={handleInputChange}
                  required
                  className="bg-black/20 autofill-none outline-none border border-white/20 focus:border-white/50 focus:bg-black/30 rounded-lg px-3 py-1.5 mt-1 placeholder:text-sm"
                />
              </div>
              <div className="flex flex-col my-3">
                <Label>Start Date:</Label>
                <input
                  type="date"
                  name="startDate"
                  placeholder="Event Name"
                  value={formData.startDate.toISOString().split("T")[0]}
                  onChange={handleInputChange}
                  required
                  className="bg-black/20 autofill-none outline-none border border-white/20 focus:border-white/50 focus:bg-black/30 rounded-lg px-3 py-1.5 mt-1"
                />
              </div>
              <div className="flex flex-col my-3">
                <Label>End Date:</Label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate.toISOString().split("T")[0]}
                  onChange={handleInputChange}
                  required
                  className="bg-black/20 autofill-none outline-none border border-white/20 focus:border-white/50 focus:bg-black/30 rounded-lg px-3 py-1.5 mt-1"
                />
              </div>
              <div className="flex flex-col my-3">
                <Label>Location:</Label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  className="bg-black/20 autofill-none outline-none border border-white/20 focus:border-white/50 focus:bg-black/30 rounded-lg px-3 py-1.5 mt-1"
                />
              </div>

              <div className="mt-4 mb-2">
                <button
                  type="submit"
                  className="bg-white hover:bg-white/80 text-black text-lg font-semibold transition-all rounded-lg py-2 w-full"
                >
                  Create Event
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
