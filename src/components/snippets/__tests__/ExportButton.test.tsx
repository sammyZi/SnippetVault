import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ExportButton } from '../ExportButton';

// Mock html-to-image
vi.mock('html-to-image', () => ({
  toPng: vi.fn(() => Promise.resolve('data:image/png;base64,mock')),
}));

describe('ExportButton', () => {
  const mockProps = {
    snippetTitle: 'Test Snippet',
    code: 'console.log("Hello World");',
    language: 'javascript',
  };

  it('should render export button', () => {
    render(<ExportButton {...mockProps} />);
    expect(screen.getByText('Export as Image')).toBeInTheDocument();
  });

  it('should render with download icon', () => {
    render(<ExportButton {...mockProps} />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('should render hidden export element with snippet title', () => {
    const { container } = render(<ExportButton {...mockProps} />);
    const hiddenElement = container.querySelector('[style*="position: absolute"]');
    expect(hiddenElement).toBeInTheDocument();
    expect(hiddenElement?.textContent).toContain('Test Snippet');
  });

  it('should render hidden export element with language label', () => {
    const { container } = render(<ExportButton {...mockProps} />);
    const hiddenElement = container.querySelector('[style*="position: absolute"]');
    expect(hiddenElement?.textContent).toContain('javascript');
  });
});
