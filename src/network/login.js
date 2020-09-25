import { request } from "@/utils/httpRequest"

export function login(data) {
  console.log(data);
  return request({
    url: 'www.baidu.com',
    method: 'post',
    params: data
  })
}