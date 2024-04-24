"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CreateJobValues, createJobScheme } from "@/lib/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { jobTypes, locationTypes } from "@/lib/jobTypes";
import { LocationInput } from "@/components/LocationInput";
import { Label } from "@/components/ui/label";
import RichTextEditor from "@/components/RichTextEditor";
import { draftToMarkdown } from "markdown-draft-js";
import { formatCurrency } from "@/lib/utils";
import LoadingButton from "@/components/LoadingButton";
import { CreateJobPost } from "./actions";
import ErrorToast from "@/components/ErrorToast";
export default function JobForm() {
  const form = useForm<CreateJobValues>({
    resolver: zodResolver(createJobScheme),
  });
  const {
    handleSubmit,
    watch,
    trigger,
    control,
    setValues,
    setFocus,
    formState: { isSubmitting },
  } = form;
  const onSubmit = async (values: CreateJobValues) => {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value);
      }
    });
    try {
      await CreateJobPost(formData);
    } catch (error) {
      alert("Something went wrong");
    }
  };
  return (
    <section className="relative text-purple-950">
      <div className="mx-auto my-10 max-w-5xl">
        <div className=" text-center">
          <h1 className="text-2xl font-bold  md:text-4xl">
            Find your Next developer by a click of a button
          </h1>
          <p className="font-medium text-muted-foreground">
            Get your job annonce seen by thousands of developers
          </p>
        </div>
        <div className="space-y-6 rounded-lg border p-4">
          <div>
            <h2 className="font-bold">Job details</h2>
            <p className="text-sm font-semibold text-muted-foreground">
              Fill out the form to find a suitable developer for your project.
            </p>
          </div>
          <Form {...form}>
            <form
              className="space-y-4"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
            >
              <FormField
                control={control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Front-end Developer"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job type</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select job type" />
                        </SelectTrigger>
                        <SelectContent>
                          {jobTypes.map((jobType) => (
                            <SelectItem key={jobType} value={jobType}>
                              {jobType}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. ACME Co." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="companyLogo"
                render={({ field: { value, ...fieldValues } }) => (
                  <FormItem>
                    <FormLabel>Job title</FormLabel>
                    <FormControl>
                      <Input
                        type={"file"}
                        accept="image/*"
                        {...fieldValues}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          fieldValues.onChange(file);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="locationType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location type</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select location type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {locationTypes.map((city) => (
                              <SelectItem key={city} value={city}>
                                {city}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Office location</FormLabel>
                    <FormControl>
                      <LocationInput />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <Label htmlFor="applicationEmail">How to apply</Label>
              </div>
              <div className="flex items-center gap-1.5">
                <FormField
                  control={control}
                  name="applicationEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="email"
                          id="applicationEmail"
                          placeholder="Email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <span className="text-lg font-medium">or</span>
                <FormField
                  control={control}
                  name="applicationUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="url"
                          id="applicationUrl"
                          placeholder="Website"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <Label onClick={() => setFocus("description")}>
                      Job Description
                    </Label>
                    <FormControl>
                      <RichTextEditor
                        onChange={(draft) =>
                          field.onChange(draftToMarkdown(draft))
                        }
                        ref={field.ref}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="salary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Salary</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder={`e.g. ${formatCurrency(30000)}`}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <LoadingButton type="submit" loading={isSubmitting}>
                Post Job
              </LoadingButton>
            </form>
          </Form>
        </div>
      </div>
      <div className="sticky bottom-4 pr-4  flex justify-end right-10">
        <ErrorToast />
      </div>
    </section>
  );
}
