"use server";

import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_MIN_LENGTH_ERROR,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
  checkUniqueEmail,
  checkUniqueUsername,
} from "@/app/_libs/_server/constants";
import db from "@/app/_libs/_server/db";
import bcrypt from "bcrypt";
import { z } from "zod";
import { redirect } from "next/navigation";
import getSession from "@/app/_libs/_server/session";
import noImage from "@/public/asset/noImage.png";

//zod에게 데이터의 형식을 설명해줌
const formSchema = z
  .object({
    username: z
      .string()
      .toLowerCase() //대문자를 소문자로 자동변환
      .trim() //공백제거
      .min(2, "닉네임은 2글자 이상 입력해 주세요")
      .max(8, "넥네임은 8글자 이상 입력할 수 없습니다."),

    email: z.string().email("잘못된 이메일 형식입니다.").toLowerCase(),

    password: z
      .string()
      .min(PASSWORD_MIN_LENGTH, PASSWORD_MIN_LENGTH_ERROR)
      .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    password_check: z
      .string()
      .min(PASSWORD_MIN_LENGTH, PASSWORD_MIN_LENGTH_ERROR),
  })
  .superRefine(checkUniqueUsername)
  .superRefine(checkUniqueEmail)
  //superRefine 다음에 있는 오류들은 앞에 오류가 해결되기 전에는 나타나지 않음(데이터가 많을때는 한꺼번에 불러오기 힘들기 때문에 이것을 사용함)
  .refine(({ password, password_check }) => password === password_check, {
    message: "비밀번호가 다릅니다.",
    path: ["password_check"],
  });

//zod에게 이것이 나타나는 위치(path)를 알려줘야됨
//path를 지정하지 않으면 zod는 이 오류를 form 전체오류로 판단해버림

export async function createAccount(prevState: any, formData: FormData) {
  //form데이터의 name에서 각각의 데이터를 불러옴
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    password_check: formData.get("password_check"),
  };

  const result = await formSchema.safeParseAsync(data);
  //safeParse는 에러가 없으면 success가 뜬다
  //db와 통신을 해야 되므로 async await를 반드시 써야된다.

  if (!result.success) {
    return result.error.flatten(); //유효성 검사 실패했을 경우
  } else {
    const hashedPassword = await bcrypt.hash(result.data.password, 12); //비밀번호 해싱

    const user = await db.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashedPassword,
        avatar: noImage.src,
      },
      select: {
        id: true,
      },
    });

    const session = await getSession();

    session.id = user.id;
    await session.save();

    redirect("/home");
  }
  //return값이 useFormState의state값으로 들어감
}
