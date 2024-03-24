"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast, useToast } from "@/components/ui/use-toast";
import { title } from "process";

const FormSchema = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});

export function MemoryList({
  items,
  relevantData,
}: {
  items: string[];
  relevantData: string[];
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: [],
    },
  });
  const { toast } = useToast();

  function onSubmit(data: z.infer<typeof FormSchema>) {
    var count: number, missed: string[];
    // write  the logic to count the number of correct answers
    count = 0;
    missed = [];
    data.items.forEach((item) => {
      if (relevantData.includes(item)) {
        count++;
      }
      if (!relevantData.includes(item)) {
        missed.push(item);
      }
    });

    if (count === relevantData.length) {
      // GOT ALL
      toast({ title: "You got all the items!" });
    } else {
      toast({
        title: `You got ${Math.abs(
          relevantData.length - count
        )} items wrong: ${missed.join(", ")}`,
      });
      // `You missed ${relevantData.length - count} items: ${missed.join(", ")}`
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="items"
          render={() => (
            <FormItem className="overflow-y-scroll h-[350px] p-3">
              {items.map((item) => (
                <FormField
                  key={item}
                  control={form.control}
                  name="items"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            className="w-6 h-6"
                            checked={field.value?.includes(item)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-md font-normal border-b-[1px] w-full p-1 border-gray-800">
                          {item}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
            </FormItem>
          )}
        />
        <div className="flex flex-row justify-end p-2 sm:absolute sm:bottom-[30%]">
          <Button className="absolute top-[350px] sm:top-0" type="submit">
            Done!
          </Button>
        </div>
      </form>
    </Form>
  );
}
