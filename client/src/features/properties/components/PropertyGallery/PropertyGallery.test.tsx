import { render, screen, fireEvent } from '@testing-library/react';
import { PropertyGallery } from './PropertyGallery';
import { vi } from 'vitest';
import '@testing-library/jest-dom';

// Mock translation
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

// Mock react-image-gallery
vi.mock('react-image-gallery', () => ({
  __esModule: true,
  default: ({ items }: { items: any[] }) => (
    <div data-testid="image-gallery">
      {items.map((item, index) => (
        <img key={index} src={item.original} alt={`img-${index}`} />
      ))}
    </div>
  ),
}));

describe('PropertyGallery', () => {
  const images = ['image1.jpg', 'image2.jpg'];

  it('renders the open gallery button', () => {
    render(<PropertyGallery data={images} />);
    expect(screen.getByRole('button', { name: 'pages.property.gallery.allImagesBtn' })).toBeInTheDocument();
  });

  it('does not show the dialog initially', () => {
    render(<PropertyGallery data={images} />);
    expect(screen.queryByTestId('image-gallery')).not.toBeInTheDocument();
  });

  it('opens the dialog with image gallery on button click', () => {
    render(<PropertyGallery data={images} />);
    
    fireEvent.click(screen.getByRole('button'));
    
    expect(screen.getByTestId('image-gallery')).toBeInTheDocument();
    expect(screen.getByAltText('img-0')).toHaveAttribute('src', 'image1.jpg');
    expect(screen.getByAltText('img-1')).toHaveAttribute('src', 'image2.jpg');
  });

  it('closes the dialog on second button click', () => {
    render(<PropertyGallery data={images} />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button); // open
    expect(screen.getByTestId('image-gallery')).toBeInTheDocument();
    
    fireEvent.click(button); // close
    expect(screen.getByTestId('image-gallery')).not.toBeVisible();
  });
});