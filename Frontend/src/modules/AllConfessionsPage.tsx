import { useUserContext } from "@/contexts/UserContext";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Modal from "@/components/Modal";
import { HiTrash } from "react-icons/hi2";

const API_URL = import.meta.env.VITE_API_URL;
const AllConfessionsPage = () => {
  const { user } = useUserContext();
  
  interface Confession {
    _id: string;
    confession: string;
    navig: string;
    timestamp: string;
  }

  const [confessions, setConfessions] = useState<Confession[]>([]);
  const [selectedItem, setSelectedItem] = useState<{
    data: string;
    hint: string;
    timestamp: string;
  } | null>(null);

  useEffect(() => {
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

    fetchConfessions();
  }, [user?.username]);

  const deleteConfession = async (id: string) => {
    const password = prompt("Enter password to delete:");
    if (password !== "baka") {
      alert("Incorrect password");
      return;
    }

    try {
      await fetch(`${API_URL}/deleteConfession`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      setConfessions((prev) =>
        prev.filter((confession) => confession._id !== id)
      );
    } catch (error) {
      console.error("Failed to delete confession", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">All Confessions</h1>
      <div>
        {confessions.length > 0 ? (
          <ul>
            {confessions.map((confession, index) => (
              <li
                key={index}
                className="border p-2 mb-2 flex justify-between items-center"
              >
                <span
                  className="cursor-pointer"
                  onClick={() =>
                    setSelectedItem({
                      data: confession.confession,
                      hint: confession.navig,
                      timestamp: confession.timestamp,
                    })
                  }
                >
                  {confession.confession}
                </span>
                <Button
                  onClick={() => deleteConfession(confession._id)}
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
      </div>
      {selectedItem && (
        <Modal
          data={selectedItem.data}
          onClose={() => setSelectedItem(null)}
          hint={selectedItem.hint}
          timestamp={selectedItem.timestamp}
        />
      )}
    </div>
  );
};

export default AllConfessionsPage;
