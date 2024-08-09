export function cls(...classnames: string[]) {
  return classnames.join(" ");
}

export const MB = 1024 * 1024;

export function formatToWon(price: number): string {
  return price.toLocaleString("ko-KR");
}
//한화(원)으로 바꿔주는 함수

export function formatToTimeAgo(date: string): string {
  const dayInMs = 1000 * 60 * 60 * 24; //24시간 밀리초
  const time = new Date(date).getTime();
  const now = new Date().getTime();
  const diff = Math.round((time - now) / dayInMs);
  //생성된 시간 - 현재시간을 밀리초로 나눠서 몇일전에 생성됐는지 알 수 있음

  const formatter = new Intl.RelativeTimeFormat("ko");
  //-3일전 이렇게 된걸 3일전으로 바꿔줌

  return formatter.format(diff, "days");
}
//몇일전에 업로드 됐는지 알 수 있는 함수
