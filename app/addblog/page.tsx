"use client";

import { Button } from "@/components/ui/button";
const sluggify = require("slugify");
import Markdown from "react-markdown";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm, Controller, FormProvider } from "react-hook-form";
import * as z from "zod";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import Formsuccess from "@/components/ui/formsuccess";
import { ReloadIcon } from "@radix-ui/react-icons";
import Formerror from "@/components/ui/formerror";

const blogPostSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Title should contain a minimum of 5 characters" })
    .max(150, { message: "Title should contain a maximum of 150 characters" }),
  content: z
    .string()
    .min(20, { message: "Content should contain a minimum of 20 characters" }),
  image: z.string().min(5, {message: "Image link should be minimum 5 charecters."}),
  author: z
    .string()
    .min(3, { message: "Author name should contain a minimum of 3 characters" })
    .max(50, {
      message: "Author name should contain a maximum of 50 characters",
    }),
  tags: z.array(z.string()).optional(),
  slug: z
    .string()
    .optional(),
});

const AddBlog = () => {
  const methods = useForm({
    resolver: zodResolver(blogPostSchema),
    defaultValues: {
      title: "",
      content: "",
      slug: "",
      author: "",
      tags: [],
    },
  });

  const {
    handleSubmit,
    control,
    getValues,
    setValue,
    formState: { errors },
  } = methods;

  const [tag, setTag] = useState('') ;
  const [success, setSuccess] = useState(false) ;
  const [error, setError] = useState('') ; 
  const [loading, setLoading] = useState(false) ;

  const onSubmitt = async (data: any) => {
    const dat = {...data , slug: sluggify(data.title).toLowerCase()}
    setLoading(true)
    const response = await fetch("/api/blog", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(dat),
    });


    const da = await response.json() ; 
    setLoading(false) ;
    if(da.success){
      setSuccess(true) ;
    }
    else {
      setError(da.error)
    }
    
  };

  const handleTagKey = (e: any)=>{
    const inputValue: string = e.target.value;
      if (e.key === 'Enter' || e.key === ',') {
        e.preventDefault();
        if (inputValue.trim()) {
          
          setValue('tags', [...getValues().tags, inputValue])
          setTag('')
        }
      }

  }

  return (
    <Form {...methods}>
      <form onSubmit={handleSubmit(onSubmitt)} className=" mt-20 px-5">
        <Card className="max-w-5xl mx-auto md:p-5 ">
          <CardHeader>
            <CardTitle>Add blog</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <FormField
              control={control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter title"
                      {...field}
                      onChange={(e) => {
                        setValue("title", e.target.value);
                        setValue("slug", sluggify(e.target.value));
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    This is the title of your blog post.
                  </FormDescription>
                  {errors.title && (
                    <FormMessage>{errors.title.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="slug"
              disabled
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter slug" {...field} />
                  </FormControl>
                  {errors.slug && (
                    <FormMessage>{errors.slug.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter image link" {...field} />
                  </FormControl>
                  {errors.image && (
                    <FormMessage>{errors.image.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter content"
                      {...field}
                      className="input"
                    ></Textarea>
                  </FormControl>
                  {errors.content && (
                    <FormMessage>{errors.content.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />

            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  Preview the blog content here
                </AccordionTrigger>
                <AccordionContent>
                  <Markdown
                    className={"prose prose-headings:text-neutral-50  "}
                  >
                    {methods.getValues().content}
                  </Markdown>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <FormField
              control={control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter author name" {...field} />
                  </FormControl>
                  {errors.author && (
                    <FormMessage>{errors.author.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />

         <FormField
          control={control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <Input value={tag} placeholder="Enter tag" onChange={(newTags) => setTag(newTags.target.value)} onKeyDown={handleTagKey} />
              </FormControl>
              
              <FormDescription>Press Enter or , key to add the tag</FormDescription>
              {errors.tags && <FormMessage>{errors.tags.message}</FormMessage>}
            </FormItem>
          )}
        />
        <div className="flex space-x-2 py-2">
          {getValues().tags.map((e, i)=><Badge variant={'outline'} key={i}>{e}</Badge>)}
        </div>
          </CardContent>

          <CardFooter className="flex flex-col">
            {success && <Formsuccess msg="Blog added successfully."/>}
            {error.length > 0 && <Formerror error={error}/>}
            <Button
            type="submit"
            className="w-full"
            disabled={loading ? true : false}
          >
            {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            Sign up
          </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default AddBlog;
