import { Component } from '@angular/core';
import { QuoteService } from '../../services/quote.service';

@Component({
  selector: 'app-random-quote',
  templateUrl: './random-quote.component.html',
  styleUrls: ['./random-quote.component.css']
})
export class RandomQuoteComponent {
  randomQuote: string = '';
  loading: boolean = false;

  constructor(private quoteService: QuoteService) {}

  loadRandomQuote(): void {
    this.loading = true;
    this.quoteService.getRandomQuote().subscribe({
      next: (quote) => {
        this.randomQuote = quote;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching random quote:', err);
        this.loading = false;
      }
    });
  }
}