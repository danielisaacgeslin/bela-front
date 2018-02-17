import { Component, Input, forwardRef, ViewChild, ElementRef } from '@angular/core';
import { CurrencyPipe, registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

registerLocaleData(localeEs, 'es-AR');

@Component({
  selector: 'bela-currency-input',
  templateUrl: './currency-input.component.html',
  styleUrls: ['./currency-input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CurrencyInputComponent),
    multi: true
  }]
})
export class CurrencyInputComponent implements ControlValueAccessor {
  @ViewChild('input') input: ElementRef;
  @Input() set value(val: number) { this.innerValue = this.formatCurrency(val); }
  get value() { return this.innerValue as any; }
  @Input() placeholder: string = '';
  @Input() disabled: boolean = false;
  @Input() currency: string = 'EUR';
  @Input() symbolDisplay: 'code' | 'symbol' | 'symbol-narrow' = 'symbol';
  public innerValue: string | number = '';
  public digits: string = '1.2-4';
  public type: string = 'string';

  constructor(private currencyPipe: CurrencyPipe) { }

  public onChange(val: number) { }
  public onTouched() { }
  public registerOnChange(fn: (val: number) => void): void { this.onChange = fn; }
  public registerOnTouched(fn: () => void): void { this.onTouched = fn; }

  public writeValue(val: number) {
    this.value = val;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public onBlur(): void {
    this.type = 'string';
    const currentValue: number = Number(this.getInputValue());
    const newValue: string = this.formatCurrency(currentValue);
    setTimeout(() => this.innerValue = newValue);
    this.onChange(currentValue);
  }

  public onFocus(): void {
    this.type = 'number';
    const currentValue: string = this.getInputValue();
    const newValue: number = this.formatNumber(currentValue);
    setTimeout(() => this.innerValue = newValue);
  }

  private getInputValue(): string {
    return this.input.nativeElement.value;
  }

  private formatCurrency(num: number): string {
    return this.currencyPipe.transform(num, this.currency, this.symbolDisplay, this.digits, 'es-AR');
  }

  private formatNumber(str: string): number {
    return Number(str
      .split('')
      .map((char: string) => {
        if (char === '.') char = ',';
        else if (char === ',') char = '.';
        return char;
      })
      .filter((char: any) => !isNaN(char) || char === '.')
      .join('')
    ) || null;
  }
}
