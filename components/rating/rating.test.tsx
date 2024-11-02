import { render, screen, fireEvent } from '@testing-library/react';
import { Rating } from './rating';
import '@testing-library/jest-dom';

describe('Rating', () => {
  it('should render initial value successfully', () => {
    render(<Rating count={5} value={3} readOnly />);
    const grayIcons = screen.getAllByTestId('rating-item-gray');
    const coloredIcons = screen.getAllByTestId('rating-item-yellow');
    expect(grayIcons).toHaveLength(5);
    expect(coloredIcons).toHaveLength(3);
  });

  it('should render half value successfully', () => {
    render(<Rating count={5} value={3.5} readOnly />);
    const grayIcons = screen.getAllByTestId('rating-item-gray');
    const coloredIcons = screen.getAllByTestId('rating-item-yellow');
    const halfIcon = screen.getByTestId('rating-item-half-yellow');

    expect(grayIcons).toHaveLength(5);
    expect(coloredIcons).toHaveLength(3);
    expect(halfIcon).toBeInTheDocument();
  });

  it('should set and reset hover value', () => {
    render(<Rating count={5} value={3} />);
    const grayIcons = screen.getAllByTestId('rating-item-gray');
    let coloredIcons = screen.getAllByTestId('rating-item-yellow');
    const fourthIcon = grayIcons[3];

    expect(coloredIcons).toHaveLength(3);

    fireEvent.mouseEnter(fourthIcon);
    coloredIcons = screen.getAllByTestId('rating-item-yellow');
    expect(coloredIcons).toHaveLength(4);

    fireEvent.mouseLeave(fourthIcon);
    coloredIcons = screen.getAllByTestId('rating-item-yellow');
    expect(coloredIcons).toHaveLength(3);
  });

  it('should set selected value', () => {
    const setValue = jest.fn();
    render(<Rating count={5} value={3} setValue={setValue} />);
    const grayIcons = screen.getAllByTestId('rating-item-gray');

    const fourthIcon = grayIcons[3];
    fireEvent.click(fourthIcon);
    expect(setValue).toHaveBeenCalledWith(4);
  });
});
