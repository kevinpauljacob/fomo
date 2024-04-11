import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

interface CardProps {
  src: string;
  href: string;
  title: string;
  description: string;
}

const Card: React.FC<CardProps> = ({ src, href, title, description }) => {
  return (
    <div className="bg-black/30 hover:bg-black/40 transition-all rounded-lg border border-black/10 p-3 min-h-[220px]">
      <div className="flex justify-between mb-2">
        <Image
          src={src}
          alt={title}
          width={40}
          height={40}
          className="rounded-md"
        />
        <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="bg-white/10 hover:bg-white/20 text-sm font-semibold text-white text-opacity-90 hover:text-opacity-100 transition-all px-4 py-1 h-min">Attend</Button>
        </SheetTrigger>
        <SheetContent className="bg-gray-950">
          <SheetHeader>
            <SheetTitle className="text-white text-opacity-90">{title}</SheetTitle>
            <SheetDescription>
              {description}
            </SheetDescription>
          </SheetHeader>
          {/*Sheet Content can be added*/}


          {/* <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" value="Pedro Duarte" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input id="username" value="@peduarte" className="col-span-3" />
            </div>
          </div> */}
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">Buy Tickets</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      </div>
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-sm font-semibold text-white text-opacity-80 text-ellipsis overflow-hidden">
        {description}
      </p>
    </div>
  );
};

export default Card;
