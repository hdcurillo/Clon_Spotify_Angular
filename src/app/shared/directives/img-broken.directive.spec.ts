import { ImgBrokenDirective } from './img-broken.directive';
import { Component, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

// todo: 1.- necesita un componente de prueba
@Component({
  template: '<img class="testing-directive" appImgBroken [src]="srcMock">',
})
class TestComponent {
  public srcMock: any = null;
}

describe('ImgBrokenDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, ImgBrokenDirective],
    });

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges()
  });

  it('should create an instance', () => {
    const mockElement = new ElementRef('');
    const directive = new ImgBrokenDirective(mockElement);
    expect(directive).toBeTruthy();

  });

  // todo: debe instanciar correctamente
  it('TestComponent an instance correct', () => {
    expect(component).toBeTruthy();
  });

  // todo: imagen por base 64
  it('Image to base64', (done: DoneFn) => {
    // !Arrange
    const beforeImgElement = fixture.debugElement.query(
      By.css('.testing-directive')

    ).nativeElement;

    const beforeImgSrc = beforeImgElement.src; //todo: se obtiene la url antes de ser cambiada la directiva
    component.srcMock = undefined;

    setTimeout(() => {

      const afterImgElement = fixture.debugElement.query(By.css('.testing-directive')).nativeElement;

      const afterImgSrc = afterImgElement.src; //todo: se obtiene la url despues de ser cambiada la directiva

      expect(afterImgSrc).toMatch(/\bdata:image\b/)

      done()

    }, 3000);
  });
});
