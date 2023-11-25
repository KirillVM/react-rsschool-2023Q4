import 'whatwg-fetch';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import user from '@testing-library/user-event';
import Button from '@components/button/button';
import Data from '@components/data-list/data/data';
import Catalog from '@src/pages/catalog/catalog';
import { MemoryRouter } from 'react-router-dom';
import { cardData } from '../types/card-data';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { getCardDataFromResponse } from '@src/utils/get-narrow-data';
import { CatalogState } from '@src/app/redusers/catalog-slice';

const middleware = [thunk];
const mockStore = configureStore(middleware);
const initialState: CatalogState = {
  data: cardData,
  detailedData: getCardDataFromResponse(cardData.results[1]),
  searchParams: '',
  pageNumber: 1,
  itemPerPage: 20,
  isDetailedLoading: false,
  isCatalogLoading: false,
};

const currentMockStore = mockStore(initialState);

describe('Button', (): void => {
  test('button test', (): void => {
    render(<Button className={['button']} text={'but'} />);
    expect(screen.getByText('but')).toHaveTextContent('but');
  });
});

describe('Data', (): void => {
  test('is render relevant data', (): void => {
    const clickHandler = jest.fn();
    render(
      <Data
        id={99}
        name={'Morty'}
        image={'mock/link'}
        onClickDataHandler={clickHandler}
      />
    );
    expect(screen.getByRole('listitem')).toHaveTextContent('Morty');
    expect(screen.getByRole('img')).toHaveAttribute('src', 'mock/link');
  });

  test('is clicking on a card opens a detailed card component', async (): Promise<void> => {
    render(
      <MemoryRouter>
        <Provider store={currentMockStore}>
          <Catalog />
        </Provider>
      </MemoryRouter>
    );
    await waitFor(() => expect(screen.getAllByTestId('card')).toHaveLength(1));
    const card: HTMLDivElement = await screen.findByTestId('card');
    const detailedCard = await screen.findByTestId('catalog-detailed');
    expect(detailedCard).not.toHaveClass('visible');
    await user.click(card);
    expect(detailedCard).toHaveClass('visible');
  });
});
