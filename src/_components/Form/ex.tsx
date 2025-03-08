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

export default function Ex() {
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* 텍스트 입력 필드 */}
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

        {/* 텍스트 영역 */}
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>자기소개</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="간단한 자기소개를 입력하세요"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                프로필에 표시될 자기소개입니다.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 셀렉트 박스 */}
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>역할</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="역할을 선택하세요" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="admin">관리자</SelectItem>
                  <SelectItem value="user">일반 사용자</SelectItem>
                  <SelectItem value="editor">편집자</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 체크박스 */}
        <FormField
          control={form.control}
          name="terms"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>이용약관</FormLabel>
                <FormDescription>
                  이용약관에 동의합니다.
                </FormDescription>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button.Default>제출</Button.Default>
      </form>
    </Form>
  )
}