import { request } from "@/utils/httpRequest"


export function login(data) {
  console.log(data);
  return request({
    url: 'login/userlogin',
    method: 'post',
    params: data
  })
}