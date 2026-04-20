export function getPageNumbers(
  page: number,
  pageCount: number,
): (number | "...")[] {
  if (pageCount <= 5)
    return Array.from({ length: pageCount }, (_, index) => index + 1);

  const alwaysShow = new Set(
    [1, pageCount, page, page - 1, page + 1].filter(
      (pageNum) => pageNum >= 1 && pageNum <= pageCount,
    ),
  );

  const sortedPages = Array.from(alwaysShow).sort((a, b) => a - b);

  return sortedPages.reduce<(number | "...")[]>((pageItems, pageNum, index) => {
    if (index > 0 && pageNum - sortedPages[index - 1] > 1)
      pageItems.push("...");
    pageItems.push(pageNum);
    return pageItems;
  }, []);
}
