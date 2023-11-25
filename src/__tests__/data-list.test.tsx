import 'whatwg-fetch';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import user from '@testing-library/user-event';
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

describe('DataList', () => {
  test('is specified number of cards', async (): Promise<void> => {
    const { findByRole, findAllByRole } = render(
      <MemoryRouter>
        <Provider store={currentMockStore}>
          <Catalog />
        </Provider>
      </MemoryRouter>
    );
    await waitFor(() => expect(screen.getAllByTestId('card')).toHaveLength(5));
    const cardsCount: HTMLElement[] = await findAllByRole('img');
    expect(cardsCount).toHaveLength(5);

    let combobox = screen.getByRole('combobox');
    user.selectOptions(combobox, '5');
    await waitFor(() =>
      expect(
        (screen.getByRole('option', { name: '5' }) as HTMLOptionElement)
          .selected
      ).toBeTruthy()
    );
    combobox = screen.getByRole('combobox');
    expect(await findByRole('combobox')).toHaveValue('5');
  });
});
