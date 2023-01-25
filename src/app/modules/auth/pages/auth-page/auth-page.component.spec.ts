import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthPageComponent } from './auth-page.component';

describe('AuthPageComponent', () => {
  let component: AuthPageComponent;
  let fixture: ComponentFixture<AuthPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [AuthPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //?el formulario debe ser invalido cuando ingresen datos erroneos
  
  //todo* patron AAA
  
  //todo: primera prueba => debe asegurar lo siguiente:
  it('should return form invalid', () => {
    //! Arrange - Arranque
    const mockCredentials = {
      email: '0x0x0x0x0x0x0x0',
      password: '1111111111111111111111111111',
    }
    
    const emailForm: any = component.formLogin.get('email')
    const passForm : any= component.formLogin.get('password')
    
    //! Act - Actuar
    emailForm.setValue(mockCredentials.email)
    passForm.setValue(mockCredentials.password)
    
    //! Assert - Lo que esperas
    expect(component.formLogin.invalid).toEqual(true);
  });
  
  
  //todo: segunda prueba => debe asegurar lo siguiente:
  it('should return form valid', () => {
    //! Arrange - Arranque
    const mockCredentials = {
      email: 'test@test.com',
      password: '12345678',
    }

    const emailForm: any = component.formLogin.get('email')
    const passForm : any= component.formLogin.get('password')

    //! Act - Actuar
    emailForm.setValue(mockCredentials.email)
    passForm.setValue(mockCredentials.password)

    //! Assert - Lo que esperas
    expect(component.formLogin.invalid).toEqual(false);
  });

  
  //todo: tercera prueba => debe asegurar lo siguiente:
  it('boton debe tener la palabra iniciar sesion', () => {
    //! Arrange - Arranque
    const elementRef = fixture.debugElement.query(By.css('.form-action button'));
    const getInnerText = elementRef.nativeElement.innerText

    //! Act - Actuar

    //! Assert - Lo que esperas
    expect(getInnerText).toEqual('Iniciar sesión');
  });


});
