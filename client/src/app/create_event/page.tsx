"use client";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

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

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
	};

	return (
		<>
			<div className="flex justify-center items-center my-10">
				<form
					onSubmit={handleSubmit}
					className="border rounded-xl border-slate-800 px-16 pt-11 pb-8"
				>
					<div className="flex">
						<div className=" pr-14">
							{/* Image Preview */}
							<div className="border border-solid border-[#dddddd] p-1 ml-2 mt-2 w-52 h-52">
								{formData.picture && (
									<img
										src={URL.createObjectURL(
											formData.picture
										)}
										alt="Preview"
										style={{
											width: "100%",
											height: "100%",
											objectFit: "cover",
										}}
									/>
								)}
							</div>
							<div className="pb-1">
								<Label>Capacity:</Label>
								<Input
									type="number"
									name="capacity"
									value={formData.capacity}
									onChange={handleInputChange}
									required
								/>
							</div>
							<div className="flex items-center space-x-2 pb-1">
								<Switch
									name="approval"
									checked={formData.approval}
									onCheckedChange={
										handleSwitchChange
									}
									required
								/>
								<Label htmlFor="approval">
									Require Approval
								</Label>
							</div>
							<div className="pb-1">
								<Label>Ticket ID:</Label>
								<Input
									type="text"
									name="ticketId"
									value={formData.ticketId}
									onChange={handleInputChange}
									required
								/>
							</div>
							<div className="pb-1">
								<Label>Ticket Price:</Label>
								<Input
									type="number"
									name="ticketPrice"
									value={formData.ticketPrice}
									onChange={handleInputChange}
									required
								/>
							</div>
							<div className="pb-1">
								<Label>NFT IPFS URI:</Label>
								<Input
									type="text"
									name="nftIpfsUri"
									value={formData.nftIpfsUri}
									onChange={handleInputChange}
									required
								/>
							</div>
						</div>
						<div>
							<div className="pb-1">
								<Label>Event Name:</Label>
								<Input
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
									value={
										formData.organizerWalletAddress
									}
									onChange={handleInputChange}
									required
								/>
							</div>
							<div className="pb-1">
								<Label>Start Date:</Label>
								<Input
									type="date"
									placeholder="Event Name"
									value={
										formData.startDate
											.toISOString()
											.split("T")[0]
									}
									onChange={handleInputChange}
									required
								/>
							</div>
							<div className="pb-1">
								<Label>End Date:</Label>
								<Input
									type="date"
									name="endDate"
									value={
										formData.endDate
											.toISOString()
											.split("T")[0]
									}
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
							<div className="grid w-full items-center gap-1.5">
								<Label htmlFor="picture">Picture</Label>
								<Input
									type="file"
									accept="image/jpeg, image/png"
									onChange={handleFileChange}
								/>
							</div>
						</div>
					</div>
					<div className="mt-4 mb-2">
						<Button type="submit" className="w-full">Create Event</Button>
					</div>
				</form>
			</div>
		</>
	);
}
