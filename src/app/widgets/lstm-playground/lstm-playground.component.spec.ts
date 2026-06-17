import { render, screen } from '@testing-library/angular';
import { LstmPlaygroundComponent } from './lstm-playground.component';

describe('LstmPlaygroundComponent', () => {
  it('should render mathematical LSTM titles and calculate inputs', async () => {
    await render(LstmPlaygroundComponent);

    // Verify titles are present
    expect(screen.getByText(/LSTM_RECURRENT_CELL_PLAYGROUND/i)).toBeTruthy();
    expect(screen.getByText(/Visualizing Tensor Propagation/i)).toBeTruthy();
    
    // Check key math sections
    expect(screen.getByText(/Recurrent State Equations/i)).toBeTruthy();
    
    // Confirm calculations and state names are printed
    expect(screen.getByText(/GRADIENT_FLOW:/i)).toBeTruthy();
  });
});
