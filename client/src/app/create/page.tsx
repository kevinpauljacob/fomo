"use client";
import Image from "next/image";
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
} from "@/components/ui/dialog"

import { use, useState } from "react";

export default function CreateEvent() {
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
    if (name === 'startDate' || name === 'endDate') {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
                <div className=" w-full items-center gap-1.5 absolute bottom-4 left-[17rem] cursor-pointer">
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
              <p className="text-white/70 font-bold mt-5 mb-1">Event Options</p>
              <div>
                <div className="flex justify-between bg-black/20 autofill-none outline-none border border-white/20 rounded-lg px-3 py-1.5 mt-1 h-2/3">
                  <Label className="flex justify-center items-center">Ticket Price</Label>
                  <div className="flex gap-2 justify-center items-center">
                  <Dialog>
                    <DialogTrigger asChild className="bg-black/20 h-5/6">
                      <Button variant="outline" className="gap-2 border-none bg-transparent hover:bg-transparent p-1">
                      <p className="text-white/50">Edit</p>
                      <Image
                        src={"/pencilo.svg"}
                        alt="edit"
                        width={15}
                        height={15}
                        className="cursor-pointer"
                      />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] bg-gray-950 border-none">
                      <DialogHeader>
                        <DialogTitle>Edit Price</DialogTitle>
                        <DialogDescription>
                          Make changes to your Price here. Click save when you're done.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">
                            Price
                          </Label>
                          <Input
                            id="name"
                            defaultValue=""
                            className="col-span-3 bg-black/20 autofill-none outline-none border border-white/20 focus:border-white/50 focus:bg-black/30 rounded-lg px-3 py-1.5 mt-1 placeholder:text-sm"
                          />
                        </div>
                      
                      </div>
                      <DialogFooter>
                        <Button type="submit">Save changes</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  </div>
                </div>
                <div className="flex justify-between bg-black/20 autofill-none outline-none border border-white/20 rounded-lg px-3 py-1.5 mt-1">
                  <Label className="flex justify-center items-center">Required</Label>
                  <div className="flex justify-center items-center">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" value="" className="sr-only peer" />
                      <div className="group peer ring-0 bg-rose-400  rounded-full outline-none duration-300 after:duration-300 w-11 h-6 shadow-md peer-checked:bg-emerald-500  peer-focus:outline-none  after:rounded-full after:absolute after:bg-gray-50 after:outline-none after:h-4 after:w-4 after:top-1 after:left-1 after:flex after:justify-center after:items-center peer-checked:after:translate-x-5  peer-hover:after:scale-95"></div>
                    </label>
                  </div>
                </div>
                <div className="flex justify-between bg-black/20 autofill-none outline-none border border-white/20 rounded-lg px-3 py-1.5 mt-1">
                  <Label className="flex justify-center items-center">Capacity</Label>
                  <div className="flex gap-2 justify-center items-center">
                  <Dialog>
                    <DialogTrigger asChild className="bg-black/20 h-5/6">
                      <Button variant="outline" className="gap-2 border-none bg-transparent hover:bg-transparent p-1">
                      <p className="text-white/50">Unlimited</p>
                      <Image
                        src={"/pencilo.svg"}
                        alt="edit"
                        width={15}
                        height={15}
                        className="cursor-pointer"
                      />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] bg-gray-950 border-none">
                      <DialogHeader>
                        <DialogTitle>Edit Capacity</DialogTitle>
                        <DialogDescription>
                          Make changes to your Event Capacity here. Click save when you're done.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">
                            Capacity
                          </Label>
                          <Input
                            id="name"
                            defaultValue="0"
                            className="col-span-3 bg-black/20 autofill-none outline-none border border-white/20 focus:border-white/50 focus:bg-black/30 rounded-lg px-3 py-1.5 mt-1 placeholder:text-sm"
                          />
                        </div>
                      
                      </div>
                      <DialogFooter>
                        <Button type="submit">Save changes</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[58%]">
              <div className="pb-1">
                <Input
                  className="bg-transparent outline-none border-none text-4xl font-bold text-white placeholder:text-white/50 px-0"
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
                  name="price"
                  id="price"
                  className="bg-black/20 autofill-none outline-none border border-white/20 focus:border-white/50 focus:bg-black/30 rounded-lg px-3 py-1.5 mt-1 placeholder:text-sm"
                  placeholder="description..."
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
