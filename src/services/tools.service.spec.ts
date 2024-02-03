import { ToolsComponent as Tools } from './tools.service';
import { environment } from '../environments/environment';

describe('The Tools', () => {
  it('Test range', () => {
    expect(Tools.range(0, 1)).toEqual([0, 1]);
  });

  it('Test paramToObject', () => {
    expect(Tools.paramToObject('')).toEqual(new Map<string, string>());
    expect(Tools.paramToObject('&a=b').size).toEqual(1);
  });

  it('Test nameTranslate', () => {
    expect(Tools.nameTranslate('hoplite', 0)).toEqual('hoplite');
    expect(Tools.nameTranslate('hoplite', 1)).toEqual('hoplitemercenary');
    expect(Tools.nameTranslate('spartan', 1)).toEqual('spartan');
    expect(Tools.range(0, 1)).toEqual([0, 1]);
  });

  it('Test getName', () => {
    expect(Tools.getName('dieu', 10, 0)).toEqual('Unknown name');
    expect(Tools.getName('hoplite', 10, 0)).toEqual('Hoplites');
  });

  it('Test getDivineBonus', () => {
    expect(Tools.getDivineBonus(1)).toEqual('bonus-iron');
    expect(Tools.getDivineBonus(2)).toEqual('bonus-wood');
    expect(Tools.getDivineBonus(3)).toEqual('bonus-grapes');
    expect(Tools.getDivineBonus(4)).toEqual('bonus-stone');
    expect(Tools.getDivineBonus(5)).toEqual('bonus-marble');
    expect(Tools.getDivineBonus(6)).toEqual('bonus-wine');
    expect(Tools.getDivineBonus(7)).toEqual('bonus-gold');
    expect(Tools.getDivineBonus(8)).toEqual('bonus-favor');
    expect(Tools.getDivineBonus(9)).toEqual('spartan');
    expect(Tools.getDivineBonus(10)).toEqual('menu-temple');
    expect(Tools.getDivineBonus(11)).toEqual('treasure');
    expect(Tools.getDivineBonus(12)).toEqual('menu-agora');
    expect(Tools.getDivineBonus(13)).toEqual('smenu-attacks');
    expect(Tools.getDivineBonus(14)).toEqual('bonus-drachma');

    expect(Tools.getDivineBonus(24)).toEqual('basket-iron');
    expect(Tools.getDivineBonus(25)).toEqual('basket-silver');
    expect(Tools.getDivineBonus(26)).toEqual('basket-gold');

    expect(Tools.getDivineBonus(-1)).toEqual('default');
  });

  it('Test getDivineBonusName', () => {
    expect(Tools.getDivineBonusName(1)).toEqual('Iron');
    expect(Tools.getDivineBonusName(2)).toEqual('Wood');
    expect(Tools.getDivineBonusName(3)).toEqual('Grapes');
    expect(Tools.getDivineBonusName(4)).toEqual('Stone');
    expect(Tools.getDivineBonusName(5)).toEqual('Marble');
    expect(Tools.getDivineBonusName(6)).toEqual('Wine');
    expect(Tools.getDivineBonusName(7)).toEqual('Gold');
    expect(Tools.getDivineBonusName(8)).toEqual('Favor');
    expect(Tools.getDivineBonusName(9)).toEqual('Spartan');
    expect(Tools.getDivineBonusName(10)).toEqual('Temple units');
    expect(Tools.getDivineBonusName(11)).toEqual('Treasure');
    expect(Tools.getDivineBonusName(12)).toEqual('Agora');
    expect(Tools.getDivineBonusName(13)).toEqual('Attacks');
    expect(Tools.getDivineBonusName(14)).toEqual('Drachma');

    expect(Tools.getDivineBonusName(24)).toEqual('Iron basket');
    expect(Tools.getDivineBonusName(25)).toEqual('Silver basket');
    expect(Tools.getDivineBonusName(26)).toEqual('Golden basket');

    expect(Tools.getDivineBonusName(-1)).toEqual('default');
  });

  it('Test addToObject', () => {
    expect(
      Tools.addToObject({ spartan: 1 }, { myrmidon: 1, spartan: 1 })
    ).toEqual({ spartan: 2, myrmidon: 1 });
  });

  it('Test getResId', () => {
    expect(Tools.getResId('drachma')).toBe(0);
    expect(Tools.getResId('food')).toBe(1);
    expect(Tools.getResId('water')).toBe(2);
    expect(Tools.getResId('wood')).toBe(3);
    expect(Tools.getResId('iron')).toBe(4);
    expect(Tools.getResId('stone')).toBe(5);
    expect(Tools.getResId('marble')).toBe(6);
    expect(Tools.getResId('grapes')).toBe(7);
    expect(Tools.getResId('wine')).toBe(8);
    expect(Tools.getResId('gold')).toBe(9);
    expect(Tools.getResId('favor')).toBe(10);
    expect(Tools.getResId('ambrosia')).toBe(11);

    expect(Tools.getResId('olives')).toBe('olives');
  });

  it('Test getResName', () => {
    expect(Tools.getResName(0)).toBe('drachma');
    expect(Tools.getResName('0')).toBe('drachma');

    expect(Tools.getResName(1)).toBe('food');
    expect(Tools.getResName('1')).toBe('food');

    expect(Tools.getResName(2)).toBe('water');
    expect(Tools.getResName('2')).toBe('water');

    expect(Tools.getResName(3)).toBe('wood');
    expect(Tools.getResName('3')).toBe('wood');

    expect(Tools.getResName(4)).toBe('iron');
    expect(Tools.getResName('4')).toBe('iron');

    expect(Tools.getResName(5)).toBe('stone');
    expect(Tools.getResName('5')).toBe('stone');

    expect(Tools.getResName(6)).toBe('marble');
    expect(Tools.getResName('6')).toBe('marble');

    expect(Tools.getResName(7)).toBe('grapes');
    expect(Tools.getResName('7')).toBe('grapes');

    expect(Tools.getResName(8)).toBe('wine');
    expect(Tools.getResName('8')).toBe('wine');

    expect(Tools.getResName(9)).toBe('gold');
    expect(Tools.getResName('9')).toBe('gold');

    expect(Tools.getResName(10)).toBe('favor');
    expect(Tools.getResName('10')).toBe('favor');

    expect(Tools.getResName(11)).toBe('ambrosia');
    expect(Tools.getResName('11')).toBe('ambrosia');

    expect(Tools.getResName('-1')).toBe('-1');
  });

  it('Test nbDigits', () => {
    expect(Tools.nbDigits(0)).toBe(0);
    expect(Tools.nbDigits(10.01)).toBe(2);
  });

  it('Test getStyle', () => {
    expect(Tools.getStyle('dummny')).toBe(environment.style.default);
    expect(Tools.getStyle('ewnextv3')).toBe('ewnextv3');
  });
});
