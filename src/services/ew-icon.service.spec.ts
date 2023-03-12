import { TestBed } from '@angular/core/testing';

import { EwIconSubComponent } from './ew-icon.service';

describe('EwIconSubComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        EwIconSubComponent,
      ],
      imports: [
      ],
      providers: [
      ],
    }).compileComponents();
  });
  
  it('should create the service', () => {
    const fixture = TestBed.createComponent(EwIconSubComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
  
  it(`test default getDivineBonus value`, () => {
    expect(EwIconSubComponent.getDivineBonus(0)).toEqual('default');
  });
  it(`test getDivineBonus values`, () => {
    expect(EwIconSubComponent.getDivineBonus(1)).toEqual('iron');
    expect(EwIconSubComponent.getDivineBonus(2)).toEqual('wood');
    expect(EwIconSubComponent.getDivineBonus(3)).toEqual('grapes');
    expect(EwIconSubComponent.getDivineBonus(4)).toEqual('stone');
    expect(EwIconSubComponent.getDivineBonus(5)).toEqual('marble');
    expect(EwIconSubComponent.getDivineBonus(6)).toEqual('wine');
    expect(EwIconSubComponent.getDivineBonus(7)).toEqual('gold');
    expect(EwIconSubComponent.getDivineBonus(8)).toEqual('favor');
    expect(EwIconSubComponent.getDivineBonus(9)).toEqual('spartan');
    expect(EwIconSubComponent.getDivineBonus(10)).toEqual('menu-temple');
    expect(EwIconSubComponent.getDivineBonus(11)).toEqual('treasure');
    expect(EwIconSubComponent.getDivineBonus(12)).toEqual('menu-agora');
    expect(EwIconSubComponent.getDivineBonus(13)).toEqual('smenu-attacks');
    expect(EwIconSubComponent.getDivineBonus(14)).toEqual('drachma');

    expect(EwIconSubComponent.getDivineBonus(24)).toEqual('basket-iron');
    expect(EwIconSubComponent.getDivineBonus(25)).toEqual('basket-silver');
    expect(EwIconSubComponent.getDivineBonus(26)).toEqual('basket-gold');
  });
});
