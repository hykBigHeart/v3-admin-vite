import { request } from "@/utils/service"
import type * as Table from "./types/own"

/** 增 */
export function createTableDataApi(data: Table.CreateOrUpdateTableRequestData) {
  return request({
    url: "user",
    method: "post",
    data
  })
}

/** 删 */
export function deleteTableDataApi(id: string) {
  return request({
    url: `user/${id}`,
    method: "delete"
  })
}

/** 批量删 */
export function deleteBatchTableDataApi(ids: string[]) {
  return request({
    url: `users`,
    method: "delete",
    data: { ids }
  })
}

/** 改 */
export function updateTableDataApi(data: Table.CreateOrUpdateTableRequestData) {
  return request({
    url: "user",
    method: "put",
    data
  })
}

/** 查 */
export function getTableDataApi(params: Table.GetTableRequestData) {
  return request<Table.GetTableResponseData>({
    url: "users",
    method: "get",
    params
  })
}
