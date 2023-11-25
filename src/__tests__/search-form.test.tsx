import 'whatwg-fetch';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import user from '@testing-library/user-event';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import SearchForm from '@src/components/search-form/search-form';
import { Provider } from 'react-redux';
import { cardData } from '@src/types/card-data';
import { getCardDataFromResponse } from '@src/utils/get-narrow-data';
import { CatalogState } from '@src/app/redusers/catalog-slice';
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

describe('searchForm', (): void => {
  test('is correctly displays the detailed card data', async (): Promise<void> => {
    // const submitHandler = jest.fn();
    const storage: Record<string, string> = {};
    global.Storage.prototype.getItem = jest.fn((key: string): string | null => {
      return storage[key] || null;
    });
    global.Storage.prototype.setItem = jest.fn(
      (key: string, value: string): void => {
        storage[key] = value;
      }
    );
    render(
      <MemoryRouter>
        <Provider store={currentMockStore}>
          <SearchForm />
        </Provider>
      </MemoryRouter>
    );
    const searchInput: HTMLButtonElement =
      await screen.findByPlaceholderText('Search');
    await fireEvent.change(searchInput, { target: { value: 'Mock value' } });
    const submitButton: HTMLButtonElement = await screen.findByText('Search');
    await user.click(submitButton);
    await waitFor(() => {
      expect(global.Storage.prototype.setItem).toHaveBeenCalled();
    });
    expect(storage['lastSearchRow']).toEqual('Mock value');
  });
});
