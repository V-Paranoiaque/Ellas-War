import { fakeAsync } from '@angular/core/testing';
import { environment } from './environment.mobile';

describe('The Mobile env', () => {
  it('Test env', fakeAsync(() => {
    expect(environment.mobile).toBe(1);
  }));
});
