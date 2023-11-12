import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import user from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import SearchForm from '@src/components/search-form/search-form';

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
    const submitHandler = jest.fn();
    const store: Record<string, string> = {};
    global.Storage.prototype.getItem = jest.fn((key: string): string | null => {
      return store[key] || null;
    });
    global.Storage.prototype.setItem = jest.fn(
      (key: string, value: string): void => {
        store[key] = value;
      }
    );
    render(
      <MemoryRouter>
        <SearchForm submitHandler={submitHandler} />
      </MemoryRouter>
    );
    const searchInput: HTMLButtonElement =
      await screen.findByPlaceholderText('Search');
    searchInput.value = 'Mock value';
    const submitButton: HTMLButtonElement = await screen.findByText('Search');
    await user.click(submitButton);
    await waitFor(() => {
      expect(global.Storage.prototype.setItem).toHaveBeenCalled();
    });
    expect(store['lastSearchRow']).toEqual('Mock value');
  });
});
