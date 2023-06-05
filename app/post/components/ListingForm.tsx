"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import * as z from "zod"

import { houses, rooms } from "@/config/navbar"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/react-hook-form/form"

import { LocationSearch } from "./LocationSearch"

const listingFormSchema = z.object({
  title: z
    .string()
    .min(10, {
      message: "Title must be at least 10 characters.",
    })
    .max(60, {
      message: "Title must not be longer than 30 characters.",
    }),
  price: z.coerce.number().min(0),
  location: z.string(),
  unit: z.string().optional(),
  description: z.string().max(160).min(4),
  house: z.string(),
  room: z.string(),
  tenants: z.coerce
    .number()
    .min(1)
    .max(6, { message: "Maximum allowed as HDB is 6 registered tenants" }),
  roommates: z.coerce
    .number()
    .min(1)
    .max(6, { message: "Maximum allowed as HDB is 6 registered tenants" }),
})

type ProfileFormValues = z.infer<typeof listingFormSchema>

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
  title: "",
  price: 0,
  location: "",
  unit: "",
  description: "",
  house: "",
  room: "",
  tenants: 1,
  roommates: 1,
}

const ListingForm = () => {
  const { watch, setValue } = useForm()
  const location = watch("location")
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(listingFormSchema),
    defaultValues: { ...defaultValues, location: "" },
    mode: "onChange",
  })

  // console.log("location", location)

  function onSubmit(data: ProfileFormValues) {
    console.log("data", { ...data, location: location })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-4 gap-x-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="col-span-3">
                <FormLabel>Listing Title</FormLabel>
                <FormControl>
                  <Input placeholder="Room for rent ..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="0" {...field} />
                </FormControl>
                <FormDescription>SGD per month</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem className="col-span-3">
              <FormLabel>Location</FormLabel>
              <FormControl>
                <LocationSearch
                  value={location}
                  onSetValue={(value) => setValue("location", value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="unit"
          render={({ field }) => (
            <FormItem className="col-span-3">
              <FormLabel>Unit No.</FormLabel>
              <FormControl>
                <Input placeholder="Unit X-12..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell something about your listing"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-x-2">
          <FormField
            control={form.control}
            name="house"
            render={({ field }) => (
              <FormItem>
                <FormLabel>House Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Type of house" />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    {houses.map((house) => (
                      <SelectItem key={crypto.randomUUID()} value={house}>
                        {house}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="room"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Room Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        key={crypto.randomUUID()}
                        placeholder="Type of room"
                      />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    {rooms.map((room) => (
                      <SelectItem key={crypto.randomUUID()} value={room}>
                        {room}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-x-2">
          <FormField
            control={form.control}
            name="tenants"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total Person in Unit</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="0" {...field} />
                </FormControl>
                <FormDescription className="text-xs">
                  Includes the future tenant of the unit.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="roommates"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total Person in Room</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="0" {...field} />
                </FormControl>
                <FormDescription className="text-xs">
                  Includes the future tenant of the unit.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default ListingForm