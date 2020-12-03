import { Directive, ElementRef, HostListener, NgModule } from '@angular/core';

@Directive({
  selector:'[numberOnly]',
})
export class NumberOnlyDirective{
  constructor(private el: ElementRef) {}

    @HostListener('input', ['$event']) onInputChange(event) {
    const initalValue = this.el.nativeElement.value;

    this.el.nativeElement.value = initalValue.replace(/[^0-9]*/g, '');
    if ( initalValue !== this.el.nativeElement.value) {
      event.stopPropagation();
    }
  }

}

@NgModule({
  declarations: [ NumberOnlyDirective ],
  exports: [ NumberOnlyDirective ]
})

export class NumberOnlyDirectiveModule {}