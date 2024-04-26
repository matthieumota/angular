import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthorComponent } from './author.component';
import { User } from '../models/user';

describe('Test component Author', () => {
    let component: AuthorComponent; // L'instance du composant
    let fixture: ComponentFixture<AuthorComponent>; // DOM du composant

    beforeEach(() => {
        fixture = TestBed.createComponent(AuthorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    
    it('should instanciate component', () => {
        // Arrange
        // On affecte le @Input du composant
        component.author = new User('Mota', 'Fiorella', '2019-12-31', 'avatar.jpg');
        fixture.detectChanges();

        // expect(fixture.nativeElement.querySelector('.card-img-top')).toBeTruthy();

        // Act
        const checkbox = fixture.nativeElement.querySelector('[type="checkbox"]');
        checkbox.dispatchEvent(new Event('change'));
        fixture.detectChanges();

        // Assert
        const p = fixture.nativeElement.querySelectorAll('.card-text')[1];
        expect(p.textContent).toBe('4 ans');
        expect(fixture.nativeElement.querySelector('.card-img-top')).toBeNull();
    });
});
