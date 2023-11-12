import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import user from '@testing-library/user-event';
import Catalog from '@src/pages/catalog/catalog';
import { MemoryRouter } from 'react-router-dom';
import { cardData } from '../types/card-data';

global.fetch = jest.fn();

// jest.mock("../utils/get-response", () => {
//   return {
//     convert: jest.fn().mockImplementation( async (): Promise<Response | void> => {
//       return (Promise.resolve({status: 200, json: (): Promise<RickAndMortyResponse> => Promise.resolve(cardData)}) as unknown) as Response | void;
//     }),
//   };
// });
describe('DataList', () => {
  test('is specified number of cards', async (): Promise<void> => {
    (fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({ status: 200, json: () => Promise.resolve(cardData) })
    );
    const { findByRole, findAllByRole } = render(
      <MemoryRouter>
        <Catalog type={'character'} />
      </MemoryRouter>
    );
    await waitFor(() => expect(screen.getAllByTestId('card')).toHaveLength(5));
    const cardsCount: HTMLElement[] = await findAllByRole('img');
    expect(cardsCount).toHaveLength(5);

    let combobox = screen.getByRole('combobox');
    user.selectOptions(combobox, '5');
    (fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({ status: 200, json: () => Promise.resolve(cardData) })
    );
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
