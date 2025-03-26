"use client";

import { Typography } from "@/components/ui/typography";
import { LINKS } from "@/features/navigation/Links";
import { GetMostUsedTagsAction } from "@/features/tags/get/getMostUsedTags.action";
import { isActionSuccessful } from "@/lib/actions/actionUtils";
import { cn } from "@/lib/utils";
import { SubmitButton } from "@components/form/submitButton";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Badge } from "@ui/badge";
import { Button } from "@ui/button";
import { Card } from "@ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  useZodForm,
} from "@ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@ui/popover";
import { ScrollArea } from "@ui/scroll-area";
import { Textarea } from "@ui/textarea";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { CreateEmojiAction } from "./createEmoji.action";
import { CreateEmojiSchema } from "./createEmoji.schema";

export const AddEmojiForm = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const form = useZodForm({
    schema: CreateEmojiSchema,
    defaultValues: {
      prompt: "a cat on car",
      tags: [] as string[],
    },
  });

  const { data: tags } = useQuery({
    queryKey: ["mostUsedTags"],
    queryFn: async () => {
      const response = await GetMostUsedTagsAction();

      if (!isActionSuccessful(response)) {
        toast.error(response?.serverError ?? "Error fetching most used tags");
        return [];
      }
      return response.data;
    },
  });

  const { mutate: addEmoji, isPending } = useMutation({
    mutationFn: async () => {
      const response = await CreateEmojiAction(form.getValues());

      if (!isActionSuccessful(response)) {
        toast.error(response?.serverError ?? "Something went wrong");
        return;
      }

      return response.data;
    },
    onSuccess(data) {
      router.push(LINKS.Emoji.Emoji.href({ emojiSlug: data?.slug }));
      toast.success("Emoji created successfully");
    },
  });

  const selectedTags = form.watch("tags") || [];

  const handleCreateTag = (value: string) => {
    const currentTags = form.getValues("tags") || [];
    if (!currentTags.includes(value)) {
      form.setValue("tags", [...currentTags, value]);
    }
    setSearch("");
  };

  return (
    <Card className="w-full space-y-4 p-4">
      <Form
        form={form}
        onSubmit={() => {
          addEmoji();
        }}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="prompt"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Describe the emoji you want to generate..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "justify-between",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value?.length > 0
                        ? `${field.value.length} tags selected`
                        : "Select tags"}
                      <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="p-0" align="start">
                  <Command>
                    <CommandInput
                      placeholder="Search for a tag..."
                      value={search}
                      onValueChange={setSearch}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && search) {
                          e.preventDefault();
                          handleCreateTag(search);
                        }
                      }}
                    />
                    <CommandEmpty>
                      {search ? (
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                          onClick={() => handleCreateTag(search)}
                        >
                          Create tag "{search}"
                        </Button>
                      ) : (
                        <Typography>No tag found</Typography>
                      )}
                    </CommandEmpty>
                    <CommandGroup>
                      <ScrollArea className="h-64">
                        {tags?.map((tag) => (
                          <CommandItem
                            value={tag.name}
                            key={tag.id}
                            onSelect={() => {
                              const currentTags = field.value || [];
                              const newTags = currentTags.includes(tag.name)
                                ? currentTags.filter(
                                    (t: string) => t !== tag.name,
                                  )
                                : [...currentTags, tag.name];
                              field.onChange(newTags);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                field.value?.includes(tag.name)
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            {tag.name}
                          </CommandItem>
                        ))}
                      </ScrollArea>
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <div className="flex flex-wrap gap-2">
                {selectedTags.map((tag: string) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {tag}
                    <X
                      className="size-3 cursor-pointer"
                      onClick={() => {
                        field.onChange(
                          selectedTags.filter((t: string) => t !== tag),
                        );
                      }}
                    />
                  </Badge>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <SubmitButton
          type="submit"
          className="mt-4 w-full"
          disabled={!form.formState.isValid || isPending}
          isLoading={isPending}
        >
          Create
        </SubmitButton>
      </Form>
    </Card>
  );
};
