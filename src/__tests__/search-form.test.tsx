import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import user from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import SearchForm from '@src/components/search-form/search-form';
import { Provider } from 'react-redux';
import { store } from '@app/store/store';

// global.fetch = jest.fn();

// (fetch as jest.Mock).mockImplementationOnce(() =>
// Promise.resolve({
//   status: 200,
//   json: (): Promise<RickAndMortyResponse> =>
//     Promise.resolve({
//       info: cardData.info,
//       results: [cardData.results[1]],
//     }),
// })
// );

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
        <Provider store={store}>
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
