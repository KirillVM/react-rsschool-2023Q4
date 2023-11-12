import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import user from '@testing-library/user-event';
import Catalog from '@src/pages/catalog/catalog';
import { MemoryRouter } from 'react-router-dom';
import { cardData } from '@src/types/card-data';
import { RickAndMortyResponse } from '@src/types/ram-types';

global.fetch = jest.fn();

describe('detailData', (): void => {
  test('is correctly displays the detailed card data', async (): Promise<void> => {
    (fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        status: 200,
        json: (): Promise<RickAndMortyResponse> =>
          Promise.resolve({
            info: cardData.info,
            results: [cardData.results[1]],
          }),
      })
    );
    render(
      <MemoryRouter>
        <Catalog type={'character'} />
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
    (fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        status: 200,
        json: (): Promise<RickAndMortyResponse> =>
          Promise.resolve({
            info: cardData.info,
            results: [cardData.results[1]],
          }),
      })
    );
    render(
      <MemoryRouter>
        <Catalog type={'character'} />
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
