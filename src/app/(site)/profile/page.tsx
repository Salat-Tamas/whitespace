"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { userPics } from "@/lib/constants";
import { toast } from "@/components/ui/use-toast";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import LessonCardMyLessons from "@/components/ui/LessonCardMyLessons";
import { getProfile } from "@/utils/supabase/profileUtils";
const formSchema = z.object({
  username: z.string().min(2).max(50),
  pfp: z.string(),
});

type Props = {};

const page = (props: Props) => {
  const supabase = createClient();

  const [user, setUser] = useState<User>();
  const [profile, setProfile] = useState<any>();
  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        const profileData = getProfile(user.id);
        setProfile(profileData);
      } else {
        return <div>Loading...Only signed users allowed</div>;
      }
    }

    getUser();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      pfp: "",
    },
  });

  if (!user) {
    return (
      <main className="flex flex-col gap-3 justify-center items-center -mt-20 align-top min-h-screen">
        <h1 className="text-4xl font-bold">LOADING...</h1>
        <h2 className="text-3xl">You must be logged in to view this page</h2>
      </main>
    );
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    toast({
      title: "Profile updated",
      description: values.pfp + " " + values.username,
    });
  }

  return (
    <div className="flex flex-col justify-center items-center my-60 sm:my-36 md:my-16 min-h-[100vh] gap-20">
      <div className="flex flex-col md:flex-row gap-32">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      disabled
                      placeholder={user?.user_metadata.name}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pfp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profile pic</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a picture" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {userPics.map((pic) => (
                        <SelectItem value={pic.alt}>
                          <Avatar>
                            <AvatarImage src={pic.src} />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>Select image</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-center w-full">
              <Button className="" type="submit">
                Submit
              </Button>
            </div>
          </form>
        </Form>

        <div className="flex flex-col text-gray-300 justify-center items-center gap-20 p-12 px-20 rounded-md bg-gradient-to-tr from-gray-900 to-indigo-500">
          <div className="flex flex-col items-center gap-4">
            <div className="text-3xl font-bold">My subscription</div>
            <div className="text-xl">Premium</div>
          </div>
          <div className="flex flex-col items-center md:flex-row gap-20">
            <div className="flex flex-col items-center gap-4">
              <div className="font-bold">Score</div>
              <div>{profile.score}</div>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="font-bold">Ranking</div>
              <div>5</div>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="font-bold">Games played</div>
              <div>90</div>
            </div>
          </div>
        </div>
      </div>
      {/* Ez csak a creator-nel*/}
      <div className="flex flex-col justify-center items-center text-gray-300">
        <h2 className="text-3xl flex flex-row justify-center my-8 font-bold">
          My Lessons
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-8">
          <LessonCardMyLessons title={"Health"} />
          <LessonCardMyLessons title={"Fitness"} />
          <LessonCardMyLessons title={"Education"} />
        </div>
      </div>
    </div>
  );
};

export default page;
