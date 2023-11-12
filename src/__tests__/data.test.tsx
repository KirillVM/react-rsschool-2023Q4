import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import user from '@testing-library/user-event';
import Button from '@components/button/button';
import Data from '@components/data-list/data/data';
import Catalog from '@src/pages/catalog/catalog';
import { MemoryRouter } from 'react-router-dom';
import { cardData } from '../types/card-data';
import { RickAndMortyResponse } from '@src/types/ram-types';

global.fetch = jest.fn();

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
    const detailedCard = await screen.findByTestId('catalog-detailed');
    expect(detailedCard).not.toHaveClass('visible');
    await user.click(card);
    expect(detailedCard).toHaveClass('visible');
  });
});
