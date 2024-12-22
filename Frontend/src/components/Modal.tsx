import React from "react";
import { FaTimes } from "react-icons/fa";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ModalProps {
  data: string;
  onClose: () => void;
  type?: "confession" | "message";
  hint: string;
  timestamp: string;
}

const Modal: React.FC<ModalProps> = ({
  data,
  onClose,
  type,
  hint,
  timestamp,
}) => {
  return (
    <div className=" fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 shadow-lg w-full max-w-md relative h-full pt-16">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <FaTimes size={24} />
        </button>
        <div className="relative text-center flex flex-col gap-4">
          {type === "message" ? (
            <img
              src="/confidential.png"
              className="absolute -top-2 md:-top-8 left-[4px] md:left-[34px] w-[97%]"
            />
          ) : (
            <img
              src="/confession.png"
              className="absolute top-2 md:-top-8 left-[1px] md:left-[34px] w-full bg-blend-lighten"
            />
          )}
          <p className=" bg-gray-100 rounded-lg mt-32 py-6">{data}</p>
        </div>
        <div className="text-gray-500 text-sm mt-4">
          {new Date(timestamp).toLocaleString()}
        </div>
        <Accordion type="single" collapsible className="w-full mt-4">
          <AccordionItem value="item-1">
            <AccordionTrigger>hints?</AccordionTrigger>
            <AccordionContent>{hint}</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default Modal;
