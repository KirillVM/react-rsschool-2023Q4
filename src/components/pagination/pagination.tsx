import './pagination.css';
import Button from '../button/button';
import { RickAndMortyResponseinfo } from '../../types/ram-types';
import { ChangeEvent } from 'react';

type PaginationProps = {
  currentPage: number;
  setPageHandler: (num: number) => void;
  setItemPerPageHandler: (count: number) => void;
  responseInfo: RickAndMortyResponseinfo | undefined;
};

const Pagination = ({
  currentPage,
  setPageHandler,
  setItemPerPageHandler,
  responseInfo,
}: PaginationProps): JSX.Element => {
  const clickNextHandler = (): void => {
    console.log(responseInfo);
    if (responseInfo && responseInfo.next) setPageHandler(1);
  };

  const clickPrevHandler = (): void => {
    if (responseInfo && responseInfo.prev) {
      setPageHandler(-1);
    }
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
