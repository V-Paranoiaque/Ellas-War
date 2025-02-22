import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnDestroy,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ew-icon',
  template: ` <ng-content></ng-content> `,
  styles: [':host::ng-deep img{width: 100%; height: inherit;}'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EwIconSubComponent implements OnDestroy {
  sub: Subscription;

  @Input() set name(iconName: string) {
    let url: string;
    let title: string;
    const iconArray = {
      ambrosia: { url: 'resources/ambrosia.webp', title: 'Ambrosia' },
      drachma: { url: 'resources/drachma.webp', title: 'Drachmas' },
      favor: { url: 'resources/favor.webp', title: 'Favor' },
      food: { url: 'resources/food.webp', title: 'Food' },
      gold: { url: 'resources/gold.webp', title: 'Gold' },
      grapes: { url: 'resources/grapes.webp', title: 'Grapes' },
      iron: { url: 'resources/iron.webp', title: 'Iron' },
      marble: { url: 'resources/marble.webp', title: 'Marble' },
      stone: { url: 'resources/stone.webp', title: 'Stone' },
      water: { url: 'resources/water.webp', title: 'Water' },
      wine: { url: 'resources/wine.webp', title: 'Wine' },
      wood: { url: 'resources/wood.webp', title: 'Wood' },

      amazon: { url: 'army/amazon.webp', title: 'Amazon' },
      automaton: { url: 'army/automaton.webp', title: 'Automaton' },
      centaur: { url: 'army/centaur.webp', title: 'Centaur' },
      creature: { url: 'army/creature.webp', title: 'Creature of Tartarus' },
      cyclops: { url: 'army/cyclops.webp', title: 'Cyclops' },
      elitehoplite: { url: 'army/elitehoplite.webp', title: 'Elite hoplite' },
      gaia: { url: 'army/gaia.webp', title: 'Defender of Gaia' },
      griffin: { url: 'army/griffin.webp', title: 'Griffin' },
      harpy: { url: 'army/harpy.webp', title: 'Harpy' },
      hecatoncheir: { url: 'army/hecatoncheir.webp', title: 'Hecatoncheir' },
      hippeis: { url: 'army/hippeis.webp', title: 'Hippeis' },
      hoplite: { url: 'army/hoplite.webp', title: 'Hoplite' },
      lampad: { url: 'army/lampad.webp', title: 'Lampad' },
      lion: { url: 'army/lion.webp', title: 'Lion' },
      longbow: { url: 'army/longbow.webp', title: 'Long bow archery' },
      manticore: { url: 'army/manticore.webp', title: 'Manticore' },
      mountedarchery: {
        url: 'army/mountedarchery.webp',
        title: 'Mounted archery',
      },
      mountedhoplite: {
        url: 'army/mountedhoplite.webp',
        title: 'Mounted hoplite',
      },
      myrmidon: { url: 'army/myrmidon.webp', title: 'Myrmidon' },
      peltast: { url: 'army/peltast.webp', title: 'Peltast' },
      satyr: { url: 'army/satyr.webp', title: 'Satyr' },
      shortbow: { url: 'army/shortbow.webp', title: 'Short bow archery' },
      silver_man: { url: 'army/silver_man.webp', title: 'Silver man' },
      slinger: { url: 'army/slinger.webp', title: 'Slinger' },
      soul: { url: 'army/soul.webp', title: 'Soul' },
      spartan: { url: 'army/spartan.webp', title: 'Spartan' },
      spy: { url: 'army/spy.webp', title: 'Spy' },

      cursedcave: { url: 'buildings/cursedcave.webp', title: 'Cursed cave' },
      defense_wall: {
        url: 'buildings/defense_wall.webp',
        title: 'Defense wall',
      },
      farm: { url: 'buildings/farm.webp', title: 'Farm' },
      goldmine: { url: 'buildings/goldmine.webp', title: 'Gold mine' },
      growers: { url: 'buildings/growers.webp', title: "Grower's lodge" },
      habitation: { url: 'buildings/habitation.webp', title: 'Habitation' },
      hut: { url: 'buildings/hut.webp', title: 'Hut' },
      ironmine: { url: 'buildings/ironmine.webp', title: 'Iron mine' },
      militarycamp: { url: 'buildings/militarycamp.webp', title: 'Barracks' },
      mint: { url: 'buildings/mint.webp', title: 'Mint' },
      mirrortower: { url: 'buildings/mirrortower.webp', title: 'Mirror tower' },
      observationtower: {
        url: 'buildings/observationtower.webp',
        title: 'Observation tower',
      },
      palace: { url: 'buildings/palace.webp', title: 'Palace' },
      quarry: { url: 'buildings/quarry.webp', title: 'Quarry' },
      sawmill: { url: 'buildings/sawmill.webp', title: 'Sawmill' },
      towerofduty: { url: 'buildings/towerofduty.webp', title: 'Duty tower' },
      watchtower: { url: 'buildings/watchtower.webp', title: 'Watchtower' },
      well: { url: 'buildings/well.webp', title: 'Well' },
      winery: { url: 'buildings/winery.webp', title: 'Winery' },

      apollo: { url: 'temples/apollo.webp', title: 'Apollo' },
      ares: { url: 'temples/ares.webp', title: 'Ares' },
      athena: { url: 'temples/athena.webp', title: 'Athena' },
      artemis: { url: 'temples/artemis.webp', title: 'Artemis' },
      demeter: { url: 'temples/demeter.webp', title: 'Demeter' },
      dionysus: { url: 'temples/dionysus.webp', title: 'Dionysus' },
      hades: { url: 'temples/hades.webp', title: 'Hades' },
      hephaestus: { url: 'temples/hephaestus.webp', title: 'Hephaestus' },
      hermes: { url: 'temples/hermes.webp', title: 'Hermes' },
      olympus: { url: 'temples/olympus.webp', title: 'Switch temple' },
      poseidon: { url: 'temples/poseidon.webp', title: 'Poseidon' },
      zeus: { url: 'temples/zeus.webp', title: 'Zeus' },

      divine_units: { url: 'altars/divine_units.webp', title: 'Divine units' },
      prometheus: {
        url: 'altars/prometheus.webp',
        title: 'Dream of Prometheus',
      },
      hestia: { url: 'altars/hestia.webp', title: 'Hospitality of Hestia' },

      sanctuary_1: { url: 'sanctuaries/cerberus.webp', title: 'Cerberus' },
      sanctuary_2: { url: 'sanctuaries/hydra.webp', title: 'Lernaean Hydra' },
      sanctuary_3: { url: 'sanctuaries/tantalus.webp', title: 'Tantalus' },
      sanctuary_4: { url: 'sanctuaries/cyclop.webp', title: 'Uranian Cyclop' },
      sanctuary_5: { url: 'sanctuaries/typhon.webp', title: 'Typhona' },

      'basket-gold': { url: 'divine/basket-gold.webp', title: 'Golden basket' },
      'basket-iron': { url: 'divine/basket-iron.webp', title: 'Iron basket' },
      'basket-silver': {
        url: 'divine/basket-silver.webp',
        title: 'Silver basket',
      },
      'bonus-drachma': {
        url: 'divine/drachma.webp',
        title: 'Drachma',
      },
      'bonus-favor': {
        url: 'divine/favor.webp',
        title: 'Favor',
      },
      'bonus-food': {
        url: 'divine/food.webp',
        title: 'Food',
      },
      'bonus-gold': {
        url: 'divine/gold.webp',
        title: 'Gold',
      },
      'bonus-grapes': {
        url: 'divine/grapes.webp',
        title: 'Grapes',
      },
      'bonus-iron': {
        url: 'divine/iron.webp',
        title: 'Iron',
      },
      'bonus-marble': {
        url: 'divine/marble.webp',
        title: 'Marble',
      },
      'bonus-stone': {
        url: 'divine/stone.webp',
        title: 'Stone',
      },
      'bonus-wine': {
        url: 'divine/wine.webp',
        title: 'Wine',
      },
      'bonus-wood': {
        url: 'divine/wood.webp',
        title: 'Wood',
      },

      agora: { url: 'menu/agora.webp', title: 'Agora' },
      alliance: { url: 'menu/alliance.webp', title: 'Alliance' },
      'ancient-greece': { url: 'menu/ancient-greece.webp', title: 'General' },
      attacks: { url: 'menu/smenu-attacks.webp', title: 'Attacks' },
      'smenu-attacks': { url: 'menu/smenu-attacks.webp', title: 'Attacks' },
      'menu-attack': { url: 'menu/smenu-attacks.webp', title: 'Attacks' },
      chest: { url: 'menu/chest.webp', title: 'Chest' },
      chat: { url: 'menu/chat.webp', title: 'Chat' },
      city: { url: 'menu/city.webp', title: 'City' },
      'menu-city': { url: 'menu/city.webp', title: 'City' },
      'divine-power': {
        url: 'backgrounds/divine-power.webp',
        title: 'Divine Powers',
      },
      'feats-of-strength': {
        url: 'menu/feats-of-strength.webp',
        title: 'Feats of Strength',
      },
      leonidas: {
        url: 'menu/leonidas.webp',
        title: 'Leonidas, king of Sparta',
      },
      menu: { url: 'menu/menu.webp', title: 'Menu' },
      'menu-admin': {
        url: 'menu/menu-admin.webp',
        title: 'Administration panel',
      },
      'menu-alliance': { url: 'menu/alliance.webp', title: 'Alliance' },
      'menu-disconnect': {
        url: 'menu/menu-disconnect.webp',
        title: 'Disconnect',
      },
      'menu-options': { url: 'menu/menu-options.webp', title: 'Options' },
      'menu-seabattle': {
        url: 'menu/menu-seabattle.webp',
        title: 'Sea Battles',
      },
      'menu-support': { url: 'menu/menu-support.webp', title: 'Support' },
      'menu-temple': {
        url: 'menu/menu-temple.webp',
        title: '200 units of your third temple',
      },
      minus: { url: 'menu/minus.webp', title: 'Close' },
      'smenu-temple': { url: 'menu/menu-temple.webp', title: 'Mythology' },
      messages: { url: 'menu/messages.webp', title: 'Messages' },
      player: { url: 'menu/player.webp', title: 'Player info' },
      plus: { url: 'menu/plus.webp', title: 'Open' },
      quests: { url: 'menu/quests.webp', title: 'Quests' },
      rankings: { url: 'menu/rankings.webp', title: 'Rankings' },
      'smenu-diamond': { url: 'menu/smenu-diamond.webp', title: 'Diamond' },
      'smenu-sanctuary': {
        url: 'menu/smenu-sanctuary.webp',
        title: 'Sanctuaries',
      },
      'smenu-stats': { url: 'menu/smenu-stats.webp', title: 'Statistics' },
      'smenu-war': { url: 'menu/smenu-war.webp', title: 'Wars' },
      treasure: { url: 'menu/treasure.webp', title: 'Treasure' },
    };

    const icon = iconArray[iconName as keyof typeof iconArray];
    if (icon) {
      url = icon.url;
      title = icon.title;
    } else {
      url = 'buildings/well.webp';
      title = 'unknown - ' + iconName;
    }

    this.sub = this.translate.get(title).subscribe((res: string) => {
      this.element.nativeElement.innerHTML =
        '<img src="assets/' +
        url +
        '" title="' +
        res +
        '" alt="' +
        res +
        '" />';
    });
  }

  constructor(
    private readonly element: ElementRef,
    public translate: TranslateService
  ) {
    this.sub = new Subscription();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
