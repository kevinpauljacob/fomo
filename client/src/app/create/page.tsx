"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "react-toastify";

interface EventData {
  eventName: string;
  organizer: string;
  organizerWalletAddress: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location: string;
  capacity: number;
  approval: boolean;
  ticketId: string;
  ticketPrice: number;
  nftIpfsUri: string;
  picture: File | null;
}

export default function CreateEvent() {
  const router = useRouter();
  const [formData, setFormData] = useState<EventData>({
    eventName: "",
    organizer: "",
    organizerWalletAddress: "",
    description: "",
    startDate: new Date(),
    endDate: new Date(),
    location: "",
    capacity: 0,
    approval: false,
    ticketId: "",
    ticketPrice: 0,
    nftIpfsUri: "",
    picture: null,
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFormData((prevData) => ({
      ...prevData,
      picture: file || null,
    }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prevData) => ({
      ...prevData,
      approval: checked,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/events/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create event");
      }

      const responseData = await response.json();
      console.log(responseData);
      toast.success("Event created successfully", { position: "top-right" });
      router.push("/events");
    } catch (error) {
      console.error("Error creating event:", error);
      toast.error("Failed to create event", { position: "top-right" });
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
              <div className="w-[323px] h-[323px]">
                {formData.picture && (
                  <img
                    src={URL.createObjectURL(formData.picture)}
                    alt="Preview"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "15px",
                    }}
                  />
                )}
                <div className="grid w-full items-center gap-1.5">
                  <input
                    type="file"
                    accept="image/jpeg, image/png"
                    onChange={handleFileChange}
                    className="w-max"
                  />
                </div>
              </div>
              <p className="text-white/70 font-bold mt-5 mb-1">Event Options</p>
              <div>
                <button></button>
                <button></button>
                <button></button>
              </div>
            </div>
            <div className="w-[58%]">
              <div className="pb-1">
                <Input
                  className="bg-transparent outline-none border-none text-4xl font-bold text-white placeholder:text-white/50 px-0"
                  type="text"
                  placeholder="Event Name"
                  value={formData.eventName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="pb-1">
                <Label>Organizer:</Label>
                <Input
                  type="text"
                  placeholder="Organizer"
                  value={formData.organizer}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="pb-1">
                <Label>Organizer Wallet Address</Label>
                <Input
                  type="text"
                  placeholder="Wallet Address"
                  value={formData.organizerWalletAddress}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="pb-1">
                <Label>Start Date:</Label>
                <Input
                  type="date"
                  placeholder="Event Name"
                  value={formData.startDate.toISOString().split("T")[0]}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="pb-1">
                <Label>End Date:</Label>
                <Input
                  type="date"
                  name="endDate"
                  value={formData.endDate.toISOString().split("T")[0]}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="pb-1">
                <Label>Location:</Label>
                <Input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="relative mt-2 rounded-md shadow-sm mb-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="text-gray-500 sm:text-sm">
                    <Image
                      src={"/free_icon_1.svg"}
                      alt="desc"
                      width={15}
                      height={15}
                    />
                  </span>
                </div>
                <Input
                  type="text"
                  name="price"
                  id="price"
                  className="block w-full rounded-md border-0 py-1.5 pl-7 pr-24 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="description..."
                  required
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
