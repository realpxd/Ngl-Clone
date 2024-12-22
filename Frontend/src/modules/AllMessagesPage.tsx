import { useUserContext } from "@/contexts/UserContext";
import { useState, useEffect } from "react";
import Modal from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { HiTrash } from "react-icons/hi2";

const API_URL = import.meta.env.VITE_API_URL;
const AllMessagesPage = () => {
  const { user } = useUserContext();

  interface Message {
    _id: string;
    message: string;
    navig: string;
    timestamp: string;
  }

  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedItem, setSelectedItem] = useState<{
    data: string;
    type: "message" | undefined;
    hint: string;
    timestamp: string;
  }>({ data: "", type: undefined, hint: "", timestamp: "" });

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`${API_URL}/messages`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: user?.username }),
        });
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error("Failed to fetch messages", error);
      }
    };

    fetchMessages();
  }, [user?.username]);

  const deleteItem = async (id: string) => {
    const password = prompt("Enter password to delete:");
    if (password !== "baka") {
      alert("Incorrect password");
      return;
    }

    try {
      await fetch(`${API_URL}/deleteMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      setMessages((prev) => prev.filter((message) => message._id !== id));
    } catch (error) {
      console.error("Failed to delete item", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">All Messages</h1>
      <div>
        {messages.length > 0 ? (
          <ul>
            {messages.map((message, index) => (
              <li
                key={index}
                className="border p-2 mb-2 flex justify-between items-center"
              >
                <span
                  className="cursor-pointer"
                  onClick={() =>
                    setSelectedItem({
                      data: message.message,
                      type: "message",
                      hint: message.navig,
                      timestamp: message.timestamp,
                    })
                  }
                >
                  {message.message}
                </span>
                <Button
                  onClick={() => deleteItem(message._id)}
                  className="ml-2"
                  variant={"link"}
                >
                  <HiTrash />
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No messages yet.</p>
        )}
      </div>
      {selectedItem.data && (
        <Modal
          data={selectedItem.data}
          onClose={() =>
            setSelectedItem({
              data: "",
              type: undefined,
              hint: "",
              timestamp: "",
            })
          }
          type={selectedItem.type}
          hint={selectedItem.hint}
          timestamp={selectedItem.timestamp}
        />
      )}
    </div>
  );
};

export default AllMessagesPage;
