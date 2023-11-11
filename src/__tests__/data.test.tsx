import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
// import user from "@testing-library/user-event";
import Button from '@components/button/button';
// import { RickAndMortyResponseResult } from "@custom-types/ram-types";

describe('Catalog', () => {
  test('firstr test', () => {
    render(<Button className={['button']} text={'but'} />);
    expect(screen.getByText('but')).toHaveTextContent('but');
    expect(screen.getByText('butt'));
  });
});
