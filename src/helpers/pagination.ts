import type { Request } from "express";
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  PAGE_SIZE_LIMIT,
} from "../constants/pagination";

class PaginationHelper {
  static getPagination = (query: Request["query"]) => {
    const { page, pageSize } = query;
    const _page = isNaN(Number(page)) ? DEFAULT_PAGE : Number(page)
    const _pageSize = isNaN(Number(pageSize)) ? DEFAULT_PAGE_SIZE : Number(pageSize)

    if (_pageSize > PAGE_SIZE_LIMIT)
      throw new Error(
        `Invalid page-size \n page size is too large \n got: ${_pageSize}`
      );

    return [_page, _pageSize];
  };
}

export default PaginationHelper;
