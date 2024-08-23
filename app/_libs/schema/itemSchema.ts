import { z } from "zod";
import { zfd } from "zod-form-data";
import { MB } from "../_client/utils";

//업로드 스키마 설정
export const itemUploadSchema = z.object({
  image: zfd.file(
    z
      .any()
      .refine((file) => file !== undefined && file !== null, {
        message: "이미지 파일을 업로드 해주세요!",
      })
      // 파일이 없으면 추가 검사를 하지 않음
      .superRefine((file, ctx) => {
        if (file === undefined || file === null) {
          return;
        }

        if (file.size > 5 * MB) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "파일 크기가 5MB를 초과했습니다.",
          });
        }

        if (file.size <= 0) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom, // 사용자 정의 코드 사용
            message: "이미지 파일이 올바르지 않거나 없습니다.",
          });
        }

        if (!file.type.startsWith("image/")) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "이미지 파일만 업로드 가능합니다.",
          });
        }
      })
  ),
  title: z.string().min(1, { message: "제목을 입력해주세요." }),
  category: z.string().min(1, { message: "카테고리를 선택해주세요." }),
  description: z.string().min(1, { message: "설명을 입력해주세요." }),
});

//업데이트 스키마 설정
export const itemUpdateSchema = z.object({
  id: z.string().optional(),
  image: zfd
    .file(
      z
        .any()
        .optional() // 수정 시 이미지는 선택적임
        .superRefine((file, ctx) => {
          if (file === undefined || file === null) {
            return;
          }

          if (file.size > 5 * MB) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "파일 크기가 5MB를 초과했습니다.",
            });
          }

          if (file.size <= 0) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom, // 사용자 정의 코드 사용
              message: "이미지 파일이 올바르지 않거나 없습니다.",
            });
          }

          if (!file.type.startsWith("image/")) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "이미지 파일만 업로드 가능합니다.",
            });
          }
        })
    )
    .optional(),
  title: z.string().min(1, { message: "제목을 입력해주세요." }),
  category: z.string().min(1, { message: "카테고리를 선택해주세요." }),
  description: z.string().min(1, { message: "설명을 입력해주세요." }),
});
