import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

import { DecimalPipe } from '@angular/common';

@Component({
	selector: 'app-lstm-playground',
	standalone: true,
	imports: [DecimalPipe],
	templateUrl: './lstm-playground.component.html',
	styleUrl: './lstm-playground.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LstmPlaygroundComponent {
	// Inputs
	readonly xt1 = signal<number>(0.8);
	readonly xt2 = signal<number>(-0.4);
	readonly xt3 = signal<number>(0.1);
	readonly prevHidden = signal<number>(0.5);
	readonly prevCell = signal<number>(0.6);

	// Weights & biases (simplified for interactivity)
	readonly biasForget = signal<number>(1.5);
	readonly biasInput = signal<number>(-0.5);
	readonly biasOutput = signal<number>(0.0);

	// Compute gates using sigmoid activation
	private sigmoid(x: number): number {
		return 1 / (1 + Math.exp(-x));
	}

	// Linear combinations (weights are pre-defined constants for simplicity)
	readonly forgetGate = computed(() => {
		// f_t = sigmoid(W_f * [h_{t-1}, x_t] + b_f)
		const raw = 0.5 * this.xt1() + -0.8 * this.xt2() + 1.2 * this.prevHidden() + this.biasForget();
		return this.sigmoid(raw);
	});

	readonly inputGate = computed(() => {
		// i_t = sigmoid(W_i * [h_{t-1}, x_t] + b_i)
		const raw = 0.9 * this.xt1() + 0.4 * this.xt2() + -0.5 * this.prevHidden() + this.biasInput();
		return this.sigmoid(raw);
	});

	readonly outputGate = computed(() => {
		// o_t = sigmoid(W_o * [h_{t-1}, x_t] + b_o)
		const raw = 0.2 * this.xt1() + 1.1 * this.xt2() + 0.8 * this.prevHidden() + this.biasOutput();
		return this.sigmoid(raw);
	});

	readonly candidateCell = computed(() => {
		// c_tilde_t = tanh(W_c * [h_{t-1}, x_t] + b_c)
		const raw = 1.0 * this.xt1() - 0.7 * this.xt2() + 0.3 * this.prevHidden();
		return Math.tanh(raw);
	});

	readonly cellState = computed(() => {
		// C_t = f_t * C_{t-1} + i_t * c_tilde_t
		return this.forgetGate() * this.prevCell() + this.inputGate() * this.candidateCell();
	});

	readonly hiddenState = computed(() => {
		// h_t = o_t * tanh(C_t)
		return this.outputGate() * Math.tanh(this.cellState());
	});

	// Interpretations
	readonly gradientStatus = computed(() => {
		const f = this.forgetGate();
		if (f < 0.3) {
			return {
				label: 'GRADIENT_VANISHING',
				desc: 'Forget gate is low. Error backpropagation path is blocked. Long-term dependencies are forgotten.',
				color: 'text-[--color-danger] border-[--color-danger]',
				glow: 'shadow-[0_0_15px_rgba(239,68,68,0.25)]',
			};
		} else if (f < 0.7) {
			return {
				label: 'MODERATE_RETENTION',
				desc: 'Balanced state retention. Information decays gracefully over time steps.',
				color: 'text-[--color-secondary] border-[--color-secondary]',
				glow: 'shadow-[0_0_15px_rgba(245,158,11,0.25)]',
			};
		} else {
			return {
				label: 'GRADIENT_PRESERVED',
				desc: 'Forget gate is active. Linear cell state updates bypass exponential decay. Long-term memory is active.',
				color: 'text-[--color-success] border-[--color-success]',
				glow: 'shadow-[0_0_15px_rgba(16,185,129,0.25)]',
			};
		}
	});

	updateForget(val: number): void {
		this.biasForget.set(val);
	}
	updateInput(val: number): void {
		this.biasInput.set(val);
	}
	updateOutput(val: number): void {
		this.biasOutput.set(val);
	}
	updateXt1(val: number): void {
		this.xt1.set(val);
	}
	updateXt2(val: number): void {
		this.xt2.set(val);
	}
	updateXt3(val: number): void {
		this.xt3.set(val);
	}
	updatePrevHidden(val: number): void {
		this.prevHidden.set(val);
	}
	updatePrevCell(val: number): void {
		this.prevCell.set(val);
	}
}
