import { useMutation, useQueryClient } from "react-query";

interface FollowActionProps {
  followCount: number;
  isFollowing: boolean;
  id: number;
}

interface MutationContext {
  prevItemDetail?: FollowActionProps;
  prevUserProfile?: FollowActionProps;
  prevFollowingList?: FollowActionProps[];
}

export function useFollowAction(userId: number) {
  const queryClient = useQueryClient();

  return useMutation<FollowActionProps, unknown, void, MutationContext>(
    async () => {
      const response = await fetch(`/api/user/${userId}/follow`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("팔로우 / 언팔로우 액션에 실패했습니다.");
      }

      return response.json();
    },
    {
      onMutate: async () => {
        //itemDetail과 profile 페이지에 전부 낙관적 업데이트를 해야 되기 때문에 쿼리키를 2개를 불러옴
        //요청 발생하기 전에 캐시 업데이트 - 기존 데이터를 가져옴
        await queryClient.cancelQueries(["itemDetail", userId]);
        await queryClient.cancelQueries(["userProfile", userId]);
        await queryClient.cancelQueries("followingList");

        const prevItemDetail = queryClient.getQueryData<FollowActionProps>([
          "itemDetail",
          userId,
        ]);

        const prevUserProfile = queryClient.getQueryData<FollowActionProps>([
          "userProfile",
          userId,
        ]);

        const prevFollowingList =
          queryClient.getQueryData<FollowActionProps[]>("followingList");

        // 새로운 팔로우 상태를 낙관적 업데이트 적용
        if (prevItemDetail) {
          queryClient.setQueryData<FollowActionProps>(["itemDetail", userId], {
            ...prevItemDetail,
            isFollowing: !prevItemDetail.isFollowing,
            followCount:
              prevItemDetail.followCount +
              (prevItemDetail.isFollowing ? -1 : 1),
          });
        }

        if (prevUserProfile) {
          queryClient.setQueryData<FollowActionProps>(["userProfile", userId], {
            ...prevUserProfile,
            isFollowing: !prevUserProfile.isFollowing,
            followCount:
              prevUserProfile.followCount +
              (prevUserProfile.isFollowing ? -1 : 1),
          });
        }

        if (prevFollowingList) {
          queryClient.setQueryData<FollowActionProps[]>(
            "followingList",
            (prev) =>
              prev
                ? prev.map((user) =>
                    user.id === userId
                      ? { ...user, isFollowing: !user.isFollowing }
                      : user
                  )
                : []
          );
        }

        // 에러 발생 시 롤백할 수 있도록 이전 데이터를 반환
        return { prevItemDetail, prevUserProfile, prevFollowingList };
      },
      onError: (err, variables, context) => {
        if (context?.prevItemDetail) {
          queryClient.setQueryData(
            ["itemDetail", userId],
            context.prevItemDetail
          );
        }

        if (context?.prevUserProfile) {
          queryClient.setQueryData(
            ["userProfile", userId],
            context.prevUserProfile
          );
        }

        if (context?.prevFollowingList) {
          queryClient.setQueryData("followingList", context.prevFollowingList);
        }
      },
      // 성공 또는 실패 후에 캐시 무효화하여 최신 데이터를 가져옴
      onSettled: () => {
        queryClient.invalidateQueries(["itemDetail", userId]);
        queryClient.invalidateQueries(["userProfile", userId]);
        queryClient.invalidateQueries("followingList");
        queryClient.invalidateQueries("items");
      },
    }
  );
}
