import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "@/components/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import Loader from "@/components/Loader";
import { Link } from "react-router-dom";
import { useUserContext } from "@/contexts/UserContext";

const FormSchema = z.object({
  confession: z.string().min(1, {
    message: "Confession cannot be empty.",
  }),
});

const API_URL = import.meta.env.VITE_API_URL;
const ConfessionsPage = () => {
  const { user } = useUserContext();
  const [lastConfession, setLastConfession] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      confession: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    if (data.confession === lastConfession) {
      toast({
        title: "Error",
        description: "This confession was already sent.",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/sendConfession`, {
        method: "POST",
        body: JSON.stringify({
          confession: data.confession,
          navig: navigator.appVersion,
          username: user?.username,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to send confession");
      }

      const result = await response.json();
      setLastConfession(data.confession);
      toast({
        title: result,
      });
    } catch (error) {
      if (error instanceof Error)
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
        });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col-reverse md:flex-row items-center justify-around md:justify-center min-h-screen w-screen">
      <div className="md:-rotate-90 text-center font-semibold text-2xl flex flex-col gap-2">
        <p>Made by :</p>
        <Link
          to="https://instagram.com/pankha.hu"
          className="bg-red-400 p-2 -rotate-3 font-bold cursor-pointer"
        >
          @pankha.hu
        </Link>
      </div>
      <div className="p-6 pt-0 w-full max-w-md gap-4 flex flex-col relative">
        <img
          src="/confession.png"
          className="absolute top-2 md:-top-8 left-[16px] md:left-[34px] w-[90%]"
        />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 mt-32"
          >
            <FormField
              control={form.control}
              name="confession"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Your anonymous confession"
                      {...field}
                      className="w-full bg-gray-100 outline-none border-none focus:border-none pt-6 pb-6"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
              disabled={isLoading}
            >
              {isLoading ? <Loader /> : "Send Anonymously"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ConfessionsPage;
