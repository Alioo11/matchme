import type { Request } from "express";
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  PAGE_SIZE_LIMIT,
} from "../constants/pagination";

class Pagination {
  private page: number;
  private pageSize: number;
  constructor(query: Request["query"]) {
    const { page, pageSize } = query;
    const _page = isNaN(Number(page)) ? DEFAULT_PAGE : Number(page);
    const _pageSize = isNaN(Number(pageSize))
      ? DEFAULT_PAGE_SIZE
      : Number(pageSize);

    if (_pageSize > PAGE_SIZE_LIMIT)
      throw new Error(
        `Invalid page-size \n page size is too large \n got: ${_pageSize}`
      );

    this.page = _page;
    this.pageSize = _pageSize;
  }

  get state() {
    return [this.page, this.pageSize];
  }
  wrapIn<T>(data: T, total: number) {
    return {
      data: data,
      total: total,
      page: this.page,
      page_size: this.pageSize,
    };
  }
}

export default Pagination;
