import { fakeAsync } from '@angular/core/testing';
import { environment } from './environment.prod';

describe('The Prod env', () => {
  it('Test env', fakeAsync(() => {
    expect(environment.mobile).toBe(0);
  }));
});
