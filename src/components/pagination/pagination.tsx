import './pagination.css';
import Button from '../button/button';
import { ChangeEvent, useContext } from 'react';
import { CatalogContext } from '@src/context/context';

type PaginationProps = {
  currentPage: number;
  setPageHandler: (num: number) => void;
  setItemPerPageHandler: (count: number) => void;
};

const Pagination = ({
  currentPage,
  setPageHandler,
  setItemPerPageHandler,
}: PaginationProps): JSX.Element => {
  const responseInfo = useContext(CatalogContext).cardData?.info;
  const clickNextHandler = (): void => {
    if (responseInfo && responseInfo.next) setPageHandler(1);
  };

  const clickPrevHandler = (): void => {
    if (responseInfo && responseInfo.prev) setPageHandler(-1);
  };

  const handelSelectChange = (e: ChangeEvent): void => {
    setPageHandler(0);
    setItemPerPageHandler(+(e.target as HTMLSelectElement).value);
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
