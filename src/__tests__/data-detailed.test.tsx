import 'whatwg-fetch';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import user from '@testing-library/user-event';
import Catalog from '@src/pages/catalog/catalog';
import { MemoryRouter } from 'react-router-dom';
import { cardData } from '@src/types/card-data';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { CatalogState } from '@src/app/redusers/catalog-slice';
import { getCardDataFromResponse } from '@src/utils/get-narrow-data';
import thunk from 'redux-thunk';

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

describe('detailData', (): void => {
  test('is correctly displays the detailed card data', async (): Promise<void> => {
    render(
      <MemoryRouter>
        <Provider store={currentMockStore}>
          <Catalog />
        </Provider>
      </MemoryRouter>
    );
    await waitFor(() => expect(screen.getAllByTestId('card')).toHaveLength(1));
    const card: HTMLDivElement = await screen.findByTestId('card');
    await user.click(card);
    const detailedCardRows: HTMLLIElement[] =
      await screen.findAllByTestId('detailed-card-name');
    const isValideData = detailedCardRows.every(
      (element: HTMLLIElement): boolean =>
        Object.values(cardData.results[1]).includes(
          element.innerHTML.split(':')[1].trim()
        )
    );
    expect(isValideData).toBe(true);
  });

  test('is clicking the close button hides the component', async (): Promise<void> => {
    render(
      <MemoryRouter>
        <Provider store={currentMockStore}>
          <Catalog />
        </Provider>
      </MemoryRouter>
    );
    await waitFor(() => expect(screen.getAllByTestId('card')).toHaveLength(1));
    const card: HTMLDivElement = await screen.findByTestId('card');
    await user.click(card);
    const closeButton: HTMLDivElement = await screen.findByTestId('close-card');
    await user.click(closeButton);
    const detailedCard: HTMLDivElement =
      await screen.findByTestId('catalog-detailed');
    expect(detailedCard).not.toHaveClass('visible');
  });
});
