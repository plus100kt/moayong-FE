"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Input } from "src/components/ui/input"
import { Textarea } from "src/components/ui/textarea"
import { Checkbox } from "src/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "src/components/ui/select"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "src/components/ui/form"
import Button from "../Button"

const formSchema = z.object({
  name: z.string().min(2),
  bio: z.string().min(10).max(160),
  role: z.string({
    required_error: "역할을 선택해주세요",
  }),
  terms: z.boolean().refine(val => val === true, {
    message: "약관에 동의해주세요",
  }),
})

export default function TextInput() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      bio: "",
      terms: false,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <FormField
      control={form.control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel>이름</FormLabel>
          <FormControl>
            <Input placeholder="이름을 입력하세요" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}