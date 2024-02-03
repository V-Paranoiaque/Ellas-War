export class Message {
  public msg_id = 0;
  public title;
  public msg_read = 0;
  public msg: MessageContent[];
  public msg_type = 0;
  public msg_shared = 0;
  public url = '';
  public time = 0;
  public isChecked = false;
  public last_date = 0;
  public mb_list: {
    id: number;
    username: string;
  }[];

  constructor(title: object = {}) {
    this.title = new MessageTitle(title);
    this.mb_list = [];
    this.msg = [];
  }
}

export class MessageTitle {
  type = 0;

  winer = 0;
  opponent = 0;
  username = '';
  defender_name = '';
  attacking_name = '';
  sanctuaries_name = '';
  ask_id = 0;
  dst_id = 0;
  destroy = 0;
  ask_name = '';
  dst_name = '';
  attacker = '';
  defender = '';

  constructor(title: object) {
    for (const [k, v] of Object.entries(title)) {
      this[k as keyof typeof this] = v;
    }
  }
}

export class MessageContent {
  content_type = 0;
  username = '';
  content = {
    id: 0,
    time: 0,
    player_name: '',
    drachma: 0,
    qtt: 0,
    price: 0,
    buyer_id: 0,
    buyer: '',
    username: '',
    alliance: 0,
    alliance_name: '',
    rank_name: '',
    level: 0,
    field: 0,
    victory: 0,
    defeat: 0,
    xp: 0,
    attacker: 0,
    defender: 0,
    attackType: 0,
    defenseType: 0,
    attacking_name: '',
    defender_name: '',
    poseidon_wall: 0,
    defense_wall: 0,
    error: 0,
    unitiesNb: 0,
    defenseNb: 0,
    ress: '',
    reward: 0,
    name1: '',
    name2: '',
    nameWinner: '',
    nameLooser: '',
    vicWinner: 0,
    vicLooser: 0,
    benefits: 0,
    buildings: [],
    unities: [],
    sanctuaries_name: '',
    bonus_id: 0,
    ask_name: '',
    dst_name: '',
    xp_attack: 0,
    xp_defense: 0,
    winer: 0,
    lost_wall: 0,
    unitSend: [],
    lost_storeroom: {},
    lost_build: {
      farm: 0,
      growers: 0,
    },
    lost_unit: {},
    lost_wall_unit: [],
    lost_wall_poseidon: {},
    unitAttackLost: [],
    unitDefenseLost: [],
    saved_attack: {},
    lost_ress: {
      food: 0,
      grapes: 0,
    },
    ress_def: {},
    sanctuary2: {},
    sanctuary_lost: [],
    hades_saving: 0,
    saved_defense: 0,
    user: '',
  };
  constructor(content: object = {}) {
    for (const [k, v] of Object.entries(content)) {
      this[k as keyof typeof this] = v;
    }
  }
}
