/* eslint-disable @typescript-eslint/no-explicit-any */
export const getPagination = (offset: number, limit: number) => {
  limit = limit ? +limit : 5;
  offset = offset ? limit * +offset : 0;

  return { limit, offset };
};

export const paginateData = (data: any, offset: number, limit: number) => {
  const { count: totalItems, rows: tutorials } = data;
  const currentPage = offset ? +offset : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, tutorials, totalPages, currentPage };
};
