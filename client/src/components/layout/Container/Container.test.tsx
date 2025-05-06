import { render, screen } from '@testing-library/react';
import { Container } from './Container';


describe('Container component tests', () => {
  it('renders children', () => {
    render(
      <Container>
        <p>Test content</p>
      </Container>
    );
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('renders with custom wrapper component', () => {
    render(
      <Container componentType="section">
        <p>Inside section</p>
      </Container>
    );
    const section = screen.getByText('Inside section').closest('section');
    expect(section).toBeInTheDocument();
  });

  it('applies custom wrapperStyles and contentStyles', () => {
    const contentTestId = 'content';

    render(
      <Container
        wrapperStyles={{ backgroundColor: 'red' }}
        contentStyles={{ padding: '20px' }}
      >
        <div data-testid={contentTestId}>Styled Content</div>
      </Container>
    );
    expect(screen.getByTestId(contentTestId)).toBeInTheDocument();
  });

  it('uses correct maxWidth on MUI Container', () => {
    render(
      <Container containerMaxWidth="md">
        <div>Max Width Test</div>
      </Container>
    );
    expect(screen.getByText('Max Width Test')).toBeInTheDocument();
  });
});