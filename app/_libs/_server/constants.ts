import { z } from "zod";
import db from "./db";

export const PASSWORD_MIN_LENGTH = 10;
export const PASSWORD_REGEX = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).+$/
);
//강력한 비밀번호를 위해서 소문자,대문자,숫자,특수문자를 포함해야되는 변수추가

export const PASSWORD_MIN_LENGTH_ERROR = "10글자이상 입력해 주세요.";
export const PASSWORD_REGEX_ERROR =
  "비밀번호는 소문자,대문자,숫자,특수문자를 포함해야 합니다.";

//-------------------------------------- 가입 로직

//유저 닉네임 중복 유효성 검사 로직
export const checkUniqueUsername = async ({ username }: any, ctx: any) => {
  const user = await db.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
    },
  });
  if (user) {
    ctx.addIssue({
      code: "custom",
      message: "사용 중인 닉네임입니다.",
      path: ["username"],
      fatal: true,
    });
    return z.NEVER;
  }
};

/* superRefine이 NEVER를 리턴하고 거기에 fatal issue가 있을때 
다른 refine들은 실행되지 않는다 (오류가 생긴곳 다음 오류는 실행되지않음) */

//유저 이메일 중복 유효성 검사 로직
export const checkUniqueEmail = async ({ email }: any, ctx: any) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  if (user) {
    ctx.addIssue({
      code: "custom",
      message: "이미 가입된 이메일입니다.",
      path: ["email"],
      fatal: true,
    });
    return z.NEVER;
  }
};

//기존 사용자 로그인 로직

//유저 이메일 유효성 검사
export const checkEmailExists = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  return Boolean(user);
};
