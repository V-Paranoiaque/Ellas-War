import { TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ToolsComponent as Tools } from './tools.service';

describe('Tools', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [
        Tools,
      ],
      imports: [
      ],
      providers: [
      ],
    }).compileComponents();
  });
  
  it('should create the service', () => {
    const fixture = TestBed.createComponent(Tools);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
  
  it(`test range from 0 to 2`, () => {
    expect(Tools.range(0,2)).toEqual([0,1,2]);
  });
  
  it(`test empty paramToObject`, () => {
    expect(Tools.paramToObject('')).toEqual({});
    expect(Tools.paramToObject('foo=bar')).toEqual({'foo': 'bar'});
  });
  
  it(`test getResId default return`, () => {
    let test = 'myvalue'
    expect(Tools.getResId(test)).toEqual(test);
  });
  
  it(`test getResId values`, () => {
    expect(Tools.getResId('drachma')).toEqual(0);
    expect(Tools.getResId('food')).toEqual(1);
    expect(Tools.getResId('water')).toEqual(2);
    expect(Tools.getResId('wood')).toEqual(3);
    expect(Tools.getResId('iron')).toEqual(4);
    expect(Tools.getResId('stone')).toEqual(5);
    expect(Tools.getResId('marble')).toEqual(6);
    expect(Tools.getResId('grapes')).toEqual(7);
    expect(Tools.getResId('wine')).toEqual(8);
    expect(Tools.getResId('gold')).toEqual(9);
    expect(Tools.getResId('favor')).toEqual(10);
    expect(Tools.getResId('ambrosia')).toEqual(11);
  });
  
  it(`test range from 0 to 2`, () => {
    let array = {'wood': 1};
    let newValues = {
      'drachma': 1,
      'food': 0,
      'wood': 2
    };
    let expected = {
      'drachma': 1,
      'food': 0,
      'wood': 3
    };
    expect(Tools.addToObject(array, newValues)).toEqual(expected);
  });
  
  it(`test nbDigits`, () => {
    expect(Tools.nbDigits(10.1)).toEqual(1);
    expect(Tools.nbDigits(10.10000)).toEqual(1);
    expect(Tools.nbDigits(10.00001)).toEqual(5);
    expect(Tools.nbDigits(10)).toEqual(0);
  });
});
