import './pagination.css';
import Button from '../button/button';
import { RickAndMortyResponseinfo } from '../../types/ram-types';

type PaginationProps = {
  currentPage: number;
  setPageHandler: (num: number) => void;
  responseInfo: RickAndMortyResponseinfo | undefined;
};

const Pagination = ({
  currentPage,
  setPageHandler,
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
    </div>
  );
};

export default Pagination;
