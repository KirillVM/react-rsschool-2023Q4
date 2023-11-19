import './pagination.css';
import Button from '../button/button';
import { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '@src/app/hooks/hooks';
import {
  incPageNumber,
  decPageNumber,
  setItemPerPage,
  setPageNumber,
} from '@src/app/redusers/catalog-slice';

// Math.ceil((currentPage * itemPerPage) / BASE_ITEM_PER_PAGE);

// type PaginationProps = {
//   currentPage: number;
//   setPageHandler: (num: number) => void;
//   setItemPerPageHandler: (count: number) => void;
// };

const Pagination = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const responseInfo = useAppSelector((state) => state.catalog.data.info);
  const currentPage = useAppSelector((state) => state.catalog.pageNumber);

  const clickNextHandler = (): void => {
    if (responseInfo && responseInfo.next) dispatch(incPageNumber());
  };

  const clickPrevHandler = (): void => {
    if (responseInfo && responseInfo.prev) dispatch(decPageNumber());
  };

  const handelSelectChange = (e: ChangeEvent): void => {
    dispatch(setPageNumber(1));
    dispatch(setItemPerPage(+(e.target as HTMLSelectElement).value));
  };

  return (
    <div className="pagination-nav">
      <Button
        className={['prev-button']}
        text={'<<'}
        type={'button'}
        callBack={clickPrevHandler}
      />
      <Button
        className={['page-number']}
        text={currentPage.toString()}
        type={'button'}
      />
      <Button
        className={['next-button']}
        text={'>>'}
        type={'button'}
        callBack={clickNextHandler}
      />
      <select name="item-count" id="count" onChange={handelSelectChange}>
        <option value="20">20</option>
        <option value="10">10</option>
        <option value="5">5</option>
      </select>
    </div>
  );
};

export default Pagination;
