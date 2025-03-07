'use client'

import { useAtom } from "jotai";
import { usernameAtom, isLoggedInAtom } from "src/_store/atoms";
import TestButton from "src/_components/TestButton";
import Form from "src/_components/Form";
import * as z from "zod";


interface FormField {
  name: string;
  validationRule: z.ZodString;
}

export default function Home() {
  const [username] = useAtom(usernameAtom);
  const [isLoggedIn] = useAtom(isLoggedInAtom);

  const formSchema = z.object({
    name: z.string().min(2, "이름은 최소 2글자 이상이어야 합니다."),
    bio: z.string().min(10, "자기소개는 최소 10글자 이상이어야 합니다.").max(160, "자기소개는 최대 160글자까지 가능합니다."),
    role: z.string({ required_error: "역할을 선택해주세요" }),
    terms: z.boolean().refine((val) => val === true, {
      message: "약관에 동의해주세요",
    }),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values, 'ㅅㄷㄴㅅ');
  }

  const fields: FormField[] = [
    { name: "name", validationRule: z.string().min(2, "이름은 최소 2자 이상이어야 합니다.") },
    { name: "bio", validationRule: z.string().min(10, "자기소개는 최소 10글자 이상이어야 합니다.").max(160, "자기소개는 최대 160글자까지 가능합니다.") },
    { name: "role", validationRule: z.string().min(1, "역할을 선택해주세요.") },
    // { name: "terms", validationRule: z.boolean().refine((val) => val === true, { message: "약관에 동의해주세요" }) }
  ];

  const defaultValues = {
    name: "홍길동",
    bio: "개발자입니다.",
    role: "admin",
    // terms: true,
  };

  const roleOptions = [
    { value: "admin", label: "관리자" },
    { value: "user", label: "일반 사용자" },
    { value: "editor", label: "편집자" },
  ];

  return (
    <div>
      <h2>테스트</h2>
      <TestButton label="테스트" />
      <Form.FormRoot fields={fields} onSubmit={onSubmit} defaultValues={defaultValues} >
        <Form.FormInput name="name" placeholder="이름 입력" />
        <Form.FormInput name="bio" placeholder="자기소개 입력" />
        <Form.SelectBox
          name="role"
          label="역할"
          placeholder="역할을 선택하세요"
          options={roleOptions}
        />
      </Form.FormRoot>
      {/* <Form.Ex /> */}
    </div>
  );
}
