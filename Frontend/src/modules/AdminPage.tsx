import { useUserContext } from "@/contexts/UserContext";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Modal from "@/components/Modal";
import { HiTrash } from "react-icons/hi2";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const AdminPage = () => {
  const { user } = useUserContext();
  interface Message {
    _id: string;
    message: string;
    navig: string;
    timestamp: string;
  }

  interface Confession {
    _id: string;
    confession: string;
    navig: string;
    timestamp: string;
  }

  const [messages, setMessages] = useState<Message[]>([]);
  const [confessions, setConfessions] = useState<Confession[]>([]);
  const [selectedItem, setSelectedItem] = useState<{
    data: string;
    type: "confession" | "message" | undefined;
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

    const fetchConfessions = async () => {
      try {
        const response = await fetch(`${API_URL}/confessions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: user?.username }),
        });
        const data = await response.json();
        setConfessions(data);
      } catch (error) {
        console.error("Failed to fetch confessions", error);
      }
    };

    fetchMessages();
    fetchConfessions();
  }, [user?.username]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Link copied to clipboard!");
  };

  const deleteItem = async (id: string, type: "message" | "confession") => {
    const password = prompt("Enter password to delete:");
    if (password !== "baka") {
      alert("Incorrect password");
      return;
    }

    const url =
      type === "message"
        ? `${API_URL}/deleteMessage`
        : `${API_URL}/deleteConfession`;

    try {
      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      if (type === "message") {
        setMessages((prev) => prev.filter((message) => message._id !== id));
      } else {
        setConfessions((prev) =>
          prev.filter((confession) => confession._id !== id)
        );
      }
    } catch (error) {
      console.error("Failed to delete item", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Admin Page</h1>
      <p className="mb-4">Welcome, {user?.username}</p>
      <div className="flex gap-4 mb-4">
        <Button
          onClick={() =>
            copyToClipboard(
              `https://ngl-clone-frontend.vercel.app/${user?.username}/confessions`
            )
          }
        >
          Copy Confession Link
        </Button>
        <Button
          onClick={() =>
            copyToClipboard(
              `https://ngl-clone-frontend.vercel.app/${user?.username}/anonymous`
            )
          }
        >
          Copy Message Link
        </Button>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-bold">Incoming Messages</h2>
        {messages.length > 0 ? (
          <ul>
            {messages.slice(0, 5).map((message, index) => (
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
                  onClick={() => deleteItem(message._id, "message")}
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
        {messages.length > 5 && (
          <Link to={`/${user?.username}/admin/messages`}>
            <Button>View All Messages</Button>
          </Link>
        )}
      </div>
      <div>
        <h2 className="text-xl font-bold">Incoming Confessions</h2>
        {confessions.length > 0 ? (
          <ul>
            {confessions.slice(0, 5).map((confession, index) => (
              <li
                key={index}
                className="border p-2 mb-2 flex justify-between items-center"
              >
                <span
                  className="cursor-pointer"
                  onClick={() =>
                    setSelectedItem({
                      data: confession.confession,
                      type: "confession",
                      hint: confession.navig,
                      timestamp: confession.timestamp,
                    })
                  }
                >
                  {confession.confession}
                </span>
                <Button
                  onClick={() => deleteItem(confession._id, "confession")}
                  className="ml-2"
                  variant={"link"}
                >
                  <HiTrash />
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No confessions yet.</p>
        )}
        {confessions.length > 5 && (
          <Link to={`/${user?.username}/admin/confessions`}>
            <Button>View All Confessions</Button>
          </Link>
        )}
      </div>
      {selectedItem?.data && (
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

export default AdminPage;
