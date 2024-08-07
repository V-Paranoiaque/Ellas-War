FLAGS = -quiet -mt
all: images project

images:
	mkdir -p \
		src/assets/altars \
		src/assets/army \
		src/assets/backgrounds \
		src/assets/buildings \
		src/assets/divine \
		src/assets/menu \
		src/assets/resources \
		src/assets/sanctuaries \
		src/assets/sea-battles \
		src/assets/temples

	# Altars
	cwebp $(FLAGS) -resize 512 0 ./assets/altars/divine_units.jpg -o ./src/assets/altars/divine_units.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/altars/hestia.jpg -o ./src/assets/altars/hestia.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/altars/prometheus.jpg -o ./src/assets/altars/prometheus.webp

	# Army
	cwebp $(FLAGS) -resize 512 0 ./assets/army/amazon.jpg -o ./src/assets/army/amazon.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/army/automaton.jpg -o ./src/assets/army/automaton.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/army/centaur.jpg -o ./src/assets/army/centaur.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/army/creature.jpg -o ./src/assets/army/creature.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/army/cyclops.jpg -o ./src/assets/army/cyclops.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/army/elitehoplite.jpg -o ./src/assets/army/elitehoplite.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/army/gaia.jpg -o ./src/assets/army/gaia.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/army/griffin.jpg -o ./src/assets/army/griffin.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/army/harpy.jpg -o ./src/assets/army/harpy.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/army/hecatoncheir.jpg -o ./src/assets/army/hecatoncheir.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/army/hippeis.jpg -o ./src/assets/army/hippeis.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/army/hoplite.jpg -o ./src/assets/army/hoplite.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/army/lampad.jpg -o ./src/assets/army/lampad.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/army/lion.jpg -o ./src/assets/army/lion.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/army/longbow.jpg -o ./src/assets/army/longbow.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/army/manticore.jpg -o ./src/assets/army/manticore.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/army/mountedarchery.jpg -o ./src/assets/army/mountedarchery.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/army/mountedhoplite.jpg -o ./src/assets/army/mountedhoplite.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/army/myrmidon.jpg -o ./src/assets/army/myrmidon.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/army/peltast.jpg -o ./src/assets/army/peltast.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/army/satyr.jpg -o ./src/assets/army/satyr.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/army/shortbow.jpg -o ./src/assets/army/shortbow.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/army/silver_man.jpg -o ./src/assets/army/silver_man.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/army/slinger.jpg -o ./src/assets/army/slinger.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/army/soul.jpg -o ./src/assets/army/soul.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/army/spartan.jpg -o ./src/assets/army/spartan.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/army/spy.jpg -o ./src/assets/army/spy.webp

	# Backgrounds
	cwebp $(FLAGS) -resize 512 0 ./assets/backgrounds/divine-power.jpg -o ./src/assets/backgrounds/divine-power.webp
	cwebp $(FLAGS) ./assets/backgrounds/dark_blue_opal_texture_S2506739336_St25_G7.5.jpg -o ./src/assets/backgrounds/dark_blue_opal_texture_S2506739336_St25_G7.5.webp
	cwebp $(FLAGS) ./assets/backgrounds/sea-map.png -o ./src/assets/backgrounds/sea-map.webp

	# Buildings
	cwebp $(FLAGS) -resize 512 0 ./assets/buildings/cursedcave.jpg -o ./src/assets/buildings/cursedcave.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/buildings/defense_wall.png -o ./src/assets/buildings/defense_wall.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/buildings/farm.jpg -o ./src/assets/buildings/farm.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/buildings/goldmine.jpg -o ./src/assets/buildings/goldmine.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/buildings/growers.jpg -o ./src/assets/buildings/growers.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/buildings/habitation.jpg -o ./src/assets/buildings/habitation.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/buildings/hut.jpg -o ./src/assets/buildings/hut.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/buildings/ironmine.jpg -o ./src/assets/buildings/ironmine.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/buildings/militarycamp.jpg -o ./src/assets/buildings/militarycamp.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/buildings/mint.jpg -o ./src/assets/buildings/mint.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/buildings/mirrortower.jpg -o ./src/assets/buildings/mirrortower.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/buildings/observationtower.png -o ./src/assets/buildings/observationtower.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/buildings/palace.jpg -o ./src/assets/buildings/palace.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/buildings/quarry.jpg -o ./src/assets/buildings/quarry.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/buildings/sawmill.jpg -o ./src/assets/buildings/sawmill.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/buildings/towerofduty.png -o ./src/assets/buildings/towerofduty.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/buildings/watchtower.png -o ./src/assets/buildings/watchtower.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/buildings/well.jpg -o ./src/assets/buildings/well.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/buildings/winery.jpg -o ./src/assets/buildings/winery.webp

	# Divine bonuses
	cwebp $(FLAGS) -resize 512 0 ./assets/divine/basket-gold.jpg -o ./src/assets/divine/basket-gold.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/divine/basket-iron.jpg -o ./src/assets/divine/basket-iron.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/divine/basket-silver.jpg -o ./src/assets/divine/basket-silver.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/divine/drachma.jpg -o ./src/assets/divine/drachma.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/divine/favor.jpg -o ./src/assets/divine/favor.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/divine/food.jpg -o ./src/assets/divine/food.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/divine/gold.jpg -o ./src/assets/divine/gold.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/divine/grapes.jpg -o ./src/assets/divine/grapes.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/divine/iron.jpg -o ./src/assets/divine/iron.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/divine/marble.jpg -o ./src/assets/divine/marble.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/divine/stone.jpg -o ./src/assets/divine/stone.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/divine/wine.jpg -o ./src/assets/divine/wine.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/divine/wood.jpg -o ./src/assets/divine/wood.webp

	# Menu
	cwebp $(FLAGS) -resize 512 0 ./assets/menu/agora.jpg -o ./src/assets/menu/agora.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/menu/alliance.jpg -o ./src/assets/menu/alliance.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/menu/ancient-greece.jpg -o ./src/assets/menu/ancient-greece.webp
	cwebp $(FLAGS) ./assets/menu/chest.png -o ./src/assets/menu/chest.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/menu/chat.jpg -o ./src/assets/menu/chat.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/menu/city.jpg -o ./src/assets/menu/city.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/menu/feats-of-strength.jpg -o ./src/assets/menu/feats-of-strength.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/menu/leonidas.jpg -o ./src/assets/menu/leonidas.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/menu/menu.jpg -o ./src/assets/menu/menu.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/menu/menu-admin.jpg -o ./src/assets/menu/menu-admin.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/menu/alliance.jpg -o ./src/assets/menu/alliance.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/menu/menu-disconnect.jpg -o ./src/assets/menu/menu-disconnect.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/menu/menu-options.jpg -o ./src/assets/menu/menu-options.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/menu/menu-support.jpg -o ./src/assets/menu/menu-support.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/menu/menu-temple.jpg -o ./src/assets/menu/menu-temple.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/menu/minus.jpg -o ./src/assets/menu/minus.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/menu/menu-seabattle.jpg -o ./src/assets/menu/menu-seabattle.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/menu/menu-temple.jpg -o ./src/assets/menu/menu-temple.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/menu/messages.jpg -o ./src/assets/menu/messages.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/menu/player.jpg -o ./src/assets/menu/player.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/menu/plus.jpg -o ./src/assets/menu/plus.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/menu/quests.jpg -o ./src/assets/menu/quests.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/menu/rankings.jpg -o ./src/assets/menu/rankings.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/menu/smenu-attacks.jpg -o ./src/assets/menu/smenu-attacks.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/menu/smenu-diamond.jpg -o ./src/assets/menu/smenu-diamond.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/menu/smenu-sanctuary.jpg -o ./src/assets/menu/smenu-sanctuary.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/menu/smenu-stats.jpg -o ./src/assets/menu/smenu-stats.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/menu/smenu-war.jpg -o ./src/assets/menu/smenu-war.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/menu/treasure.jpg -o ./src/assets/menu/treasure.webp

	# Resources
	cwebp $(FLAGS) -resize 48 0 ./assets/resources/ambrosia.png -o ./src/assets/resources/ambrosia.webp
	cwebp $(FLAGS) -resize 48 0 ./assets/resources/drachma.png -o ./src/assets/resources/drachma.webp
	cwebp $(FLAGS) -resize 48 0 ./assets/resources/favor.jpg -o ./src/assets/resources/favor.webp
	cwebp $(FLAGS) -resize 48 0 ./assets/resources/food.png -o ./src/assets/resources/food.webp
	cwebp $(FLAGS) -resize 48 0 ./assets/resources/gold.png -o ./src/assets/resources/gold.webp
	cwebp $(FLAGS) -resize 48 0 ./assets/resources/grapes.png -o ./src/assets/resources/grapes.webp
	cwebp $(FLAGS) -resize 48 0 ./assets/resources/iron.png -o ./src/assets/resources/iron.webp
	cwebp $(FLAGS) -resize 48 0 ./assets/resources/marble.png -o ./src/assets/resources/marble.webp
	cwebp $(FLAGS) -resize 48 0 ./assets/resources/stone.png -o ./src/assets/resources/stone.webp
	cwebp $(FLAGS) -resize 48 0 ./assets/resources/water.png -o ./src/assets/resources/water.webp
	cwebp $(FLAGS) -resize 48 0 ./assets/resources/wine.png -o ./src/assets/resources/wine.webp
	cwebp $(FLAGS) -resize 48 0 ./assets/resources/wood.png -o ./src/assets/resources/wood.webp

	# Sanctuaries
	cwebp $(FLAGS) -resize 512 0 ./assets/sanctuaries/cerberus.jpg -o ./src/assets/sanctuaries/cerberus.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/sanctuaries/hydra.jpg -o ./src/assets/sanctuaries/hydra.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/sanctuaries/tantalus.jpg -o ./src/assets/sanctuaries/tantalus.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/sanctuaries/cyclop.jpg -o ./src/assets/sanctuaries/cyclop.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/sanctuaries/typhon.jpg -o ./src/assets/sanctuaries/typhon.webp

	# Sea Battles
	cwebp $(FLAGS) ./assets/sea-battles/ship-small.png -o ./src/assets/sea-battles/ship-small.webp
	cwebp $(FLAGS) ./assets/sea-battles/mosaic-1.png -o ./src/assets/sea-battles/mosaic-1.webp
	cwebp $(FLAGS) ./assets/sea-battles/mosaic-2.png -o ./src/assets/sea-battles/mosaic-2.webp
	cwebp $(FLAGS) ./assets/sea-battles/mosaic-3.png -o ./src/assets/sea-battles/mosaic-3.webp
	cwebp $(FLAGS) ./assets/sea-battles/mosaic-4.png -o ./src/assets/sea-battles/mosaic-4.webp
	cwebp $(FLAGS) ./assets/sea-battles/tower-1.png -o ./src/assets/sea-battles/tower-1.webp
	cwebp $(FLAGS) ./assets/sea-battles/tower-2.png -o ./src/assets/sea-battles/tower-2.webp
	cwebp $(FLAGS) ./assets/sea-battles/tower-3.png -o ./src/assets/sea-battles/tower-3.webp
	cwebp $(FLAGS) ./assets/sea-battles/tower-4.png -o ./src/assets/sea-battles/tower-4.webp

	# Temples
	cwebp $(FLAGS) -resize 512 0 ./assets/temples/apollo.jpg -o ./src/assets/temples/apollo.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/temples/ares.jpg -o ./src/assets/temples/ares.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/temples/athena.jpg -o ./src/assets/temples/athena.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/temples/artemis.jpg -o ./src/assets/temples/artemis.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/temples/demeter.jpg -o ./src/assets/temples/demeter.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/temples/dionysus.jpg -o ./src/assets/temples/dionysus.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/temples/hades.jpg -o ./src/assets/temples/hades.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/temples/hephaestus.jpg -o ./src/assets/temples/hephaestus.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/temples/hermes.jpg -o ./src/assets/temples/hermes.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/temples/olympus.jpg -o ./src/assets/temples/olympus.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/temples/poseidon.jpg -o ./src/assets/temples/poseidon.webp
	cwebp $(FLAGS) -resize 512 0 ./assets/temples/zeus.jpg -o ./src/assets/temples/zeus.webp

	# Extra design ewnextv2
	mkdir -p src/assets/styles/ewnextv2
	cwebp $(FLAGS) ./assets/styles/ewnextv2/mosaic.png -o ./src/assets/styles/ewnextv2/mosaic.webp

	# Extra design ewnextv3
	mkdir -p src/assets/styles/ewnextv3
	cwebp $(FLAGS) ./assets/styles/ewnextv3/background.jpg -o ./src/assets/styles/ewnextv3/background.webp
	cwebp $(FLAGS) ./assets/styles/ewnextv3/column-body.png -o ./src/assets/styles/ewnextv3/column-body.webp
	cwebp $(FLAGS) ./assets/styles/ewnextv3/column-bottom.png -o ./src/assets/styles/ewnextv3/column-bottom.webp
	cwebp $(FLAGS) ./assets/styles/ewnextv3/column-top.png -o ./src/assets/styles/ewnextv3/column-top.webp
	cwebp $(FLAGS) ./assets/styles/ewnextv3/marble-background.jpg -o ./src/assets/styles/ewnextv3/marble-background.webp
	cwebp $(FLAGS) ./assets/styles/ewnextv3/marble-white.jpg -o ./src/assets/styles/ewnextv3/marble-white.webp
	cwebp $(FLAGS) ./assets/styles/ewnextv3/mosaic.png -o ./src/assets/styles/ewnextv3/mosaic.webp
	cwebp $(FLAGS) ./assets/styles/ewnextv3/default-profile.png -o ./src/assets/styles/ewnextv3/default-profile.webp

	# Screenshots mobile en
	mkdir -p ./src/assets/i18n/en/screenshot/mobile/
	cwebp $(FLAGS) ./assets/i18n/en/screenshot/mobile/agora.png -o ./src/assets/i18n/en/screenshot/mobile/agora.webp
	cwebp $(FLAGS) ./assets/i18n/en/screenshot/mobile/army.png -o ./src/assets/i18n/en/screenshot/mobile/army.webp
	cwebp $(FLAGS) ./assets/i18n/en/screenshot/mobile/attack.png -o ./src/assets/i18n/en/screenshot/mobile/attack.webp
	cwebp $(FLAGS) ./assets/i18n/en/screenshot/mobile/buildings.png -o ./src/assets/i18n/en/screenshot/mobile/buildings.webp
	cwebp $(FLAGS) ./assets/i18n/en/screenshot/mobile/city.png -o ./src/assets/i18n/en/screenshot/mobile/city.webp
	cwebp $(FLAGS) ./assets/i18n/en/screenshot/mobile/defense.png -o ./src/assets/i18n/en/screenshot/mobile/defense.webp
	cwebp $(FLAGS) ./assets/i18n/en/screenshot/mobile/recruitment.png -o ./src/assets/i18n/en/screenshot/mobile/recruitment.webp
	cwebp $(FLAGS) ./assets/i18n/en/screenshot/mobile/temples.png -o ./src/assets/i18n/en/screenshot/mobile/temples.webp
	cwebp $(FLAGS) ./assets/i18n/en/screenshot/mobile/treasure.png -o ./src/assets/i18n/en/screenshot/mobile/treasure.webp

	# Screenshots mobile en
	mkdir -p ./src/assets/i18n/tlh/screenshot/mobile/
	cwebp $(FLAGS) ./assets/i18n/en/screenshot/mobile/agora.png -o ./src/assets/i18n/tlh/screenshot/mobile/agora.webp
	cwebp $(FLAGS) ./assets/i18n/en/screenshot/mobile/army.png -o ./src/assets/i18n/tlh/screenshot/mobile/army.webp
	cwebp $(FLAGS) ./assets/i18n/en/screenshot/mobile/attack.png -o ./src/assets/i18n/tlh/screenshot/mobile/attack.webp
	cwebp $(FLAGS) ./assets/i18n/en/screenshot/mobile/buildings.png -o ./src/assets/i18n/tlh/screenshot/mobile/buildings.webp
	cwebp $(FLAGS) ./assets/i18n/en/screenshot/mobile/city.png -o ./src/assets/i18n/tlh/screenshot/mobile/city.webp
	cwebp $(FLAGS) ./assets/i18n/en/screenshot/mobile/defense.png -o ./src/assets/i18n/tlh/screenshot/mobile/defense.webp
	cwebp $(FLAGS) ./assets/i18n/en/screenshot/mobile/recruitment.png -o ./src/assets/i18n/tlh/screenshot/mobile/recruitment.webp
	cwebp $(FLAGS) ./assets/i18n/en/screenshot/mobile/temples.png -o ./src/assets/i18n/tlh/screenshot/mobile/temples.webp
	cwebp $(FLAGS) ./assets/i18n/en/screenshot/mobile/treasure.png -o ./src/assets/i18n/tlh/screenshot/mobile/treasure.webp
	
	# Screenshots mobile fr
	mkdir -p ./src/assets/i18n/fr/screenshot/mobile/
	cwebp $(FLAGS) ./assets/i18n/fr/screenshot/mobile/agora.png -o ./src/assets/i18n/fr/screenshot/mobile/agora.webp
	cwebp $(FLAGS) ./assets/i18n/fr/screenshot/mobile/army.png -o ./src/assets/i18n/fr/screenshot/mobile/army.webp
	cwebp $(FLAGS) ./assets/i18n/fr/screenshot/mobile/attack.png -o ./src/assets/i18n/fr/screenshot/mobile/attack.webp
	cwebp $(FLAGS) ./assets/i18n/fr/screenshot/mobile/buildings.png -o ./src/assets/i18n/fr/screenshot/mobile/buildings.webp
	cwebp $(FLAGS) ./assets/i18n/fr/screenshot/mobile/city.png -o ./src/assets/i18n/fr/screenshot/mobile/city.webp
	cwebp $(FLAGS) ./assets/i18n/fr/screenshot/mobile/defense.png -o ./src/assets/i18n/fr/screenshot/mobile/defense.webp
	cwebp $(FLAGS) ./assets/i18n/fr/screenshot/mobile/recruitment.png -o ./src/assets/i18n/fr/screenshot/mobile/recruitment.webp
	cwebp $(FLAGS) ./assets/i18n/fr/screenshot/mobile/temples.png -o ./src/assets/i18n/fr/screenshot/mobile/temples.webp
	cwebp $(FLAGS) ./assets/i18n/fr/screenshot/mobile/treasure.png -o ./src/assets/i18n/fr/screenshot/mobile/treasure.webp

	# Screenshots web en
	mkdir -p ./src/assets/i18n/en/screenshot/web/
	cwebp $(FLAGS) ./assets/i18n/en/screenshot/web/agora.png -o ./src/assets/i18n/en/screenshot/web/agora.webp
	cwebp $(FLAGS) ./assets/i18n/en/screenshot/web/army.png -o ./src/assets/i18n/en/screenshot/web/army.webp
	cwebp $(FLAGS) ./assets/i18n/en/screenshot/web/attack.png -o ./src/assets/i18n/en/screenshot/web/attack.webp
	cwebp $(FLAGS) ./assets/i18n/en/screenshot/web/buildings.png -o ./src/assets/i18n/en/screenshot/web/buildings.webp
	cwebp $(FLAGS) ./assets/i18n/en/screenshot/web/city.png -o ./src/assets/i18n/en/screenshot/web/city.webp
	cwebp $(FLAGS) ./assets/i18n/en/screenshot/web/defense.png -o ./src/assets/i18n/en/screenshot/web/defense.webp
	cwebp $(FLAGS) ./assets/i18n/en/screenshot/web/recruitment.png -o ./src/assets/i18n/en/screenshot/web/recruitment.webp
	cwebp $(FLAGS) ./assets/i18n/en/screenshot/web/temples.png -o ./src/assets/i18n/en/screenshot/web/temples.webp
	cwebp $(FLAGS) ./assets/i18n/en/screenshot/web/treasure.png -o ./src/assets/i18n/en/screenshot/web/treasure.webp

	# Screenshots web fr
	mkdir -p ./src/assets/i18n/fr/screenshot/web/
	cwebp $(FLAGS) ./assets/i18n/fr/screenshot/web/agora.png -o ./src/assets/i18n/fr/screenshot/web/agora.webp
	cwebp $(FLAGS) ./assets/i18n/fr/screenshot/web/army.png -o ./src/assets/i18n/fr/screenshot/web/army.webp
	cwebp $(FLAGS) ./assets/i18n/fr/screenshot/web/attack.png -o ./src/assets/i18n/fr/screenshot/web/attack.webp
	cwebp $(FLAGS) ./assets/i18n/fr/screenshot/web/buildings.png -o ./src/assets/i18n/fr/screenshot/web/buildings.webp
	cwebp $(FLAGS) ./assets/i18n/fr/screenshot/web/city.png -o ./src/assets/i18n/fr/screenshot/web/city.webp
	cwebp $(FLAGS) ./assets/i18n/fr/screenshot/web/defense.png -o ./src/assets/i18n/fr/screenshot/web/defense.webp
	cwebp $(FLAGS) ./assets/i18n/fr/screenshot/web/recruitment.png -o ./src/assets/i18n/fr/screenshot/web/recruitment.webp
	cwebp $(FLAGS) ./assets/i18n/fr/screenshot/web/temples.png -o ./src/assets/i18n/fr/screenshot/web/temples.webp
	cwebp $(FLAGS) ./assets/i18n/fr/screenshot/web/treasure.png -o ./src/assets/i18n/fr/screenshot/web/treasure.webp

	# Screenshots web tlh
	mkdir -p ./src/assets/i18n/tlh/screenshot/web/
	cwebp $(FLAGS) ./assets/i18n/en/screenshot/web/agora.png -o ./src/assets/i18n/tlh/screenshot/web/agora.webp
	cwebp $(FLAGS) ./assets/i18n/en/screenshot/web/army.png -o ./src/assets/i18n/tlh/screenshot/web/army.webp
	cwebp $(FLAGS) ./assets/i18n/en/screenshot/web/attack.png -o ./src/assets/i18n/tlh/screenshot/web/attack.webp
	cwebp $(FLAGS) ./assets/i18n/en/screenshot/web/buildings.png -o ./src/assets/i18n/tlh/screenshot/web/buildings.webp
	cwebp $(FLAGS) ./assets/i18n/en/screenshot/web/city.png -o ./src/assets/i18n/tlh/screenshot/web/city.webp
	cwebp $(FLAGS) ./assets/i18n/en/screenshot/web/defense.png -o ./src/assets/i18n/tlh/screenshot/web/defense.webp
	cwebp $(FLAGS) ./assets/i18n/en/screenshot/web/recruitment.png -o ./src/assets/i18n/tlh/screenshot/web/recruitment.webp
	cwebp $(FLAGS) ./assets/i18n/en/screenshot/web/temples.png -o ./src/assets/i18n/tlh/screenshot/web/temples.webp
	cwebp $(FLAGS) ./assets/i18n/en/screenshot/web/treasure.png -o ./src/assets/i18n/tlh/screenshot/web/treasure.webp

project:
	npm run build
